import { useEffect, useState } from "react";
import { Card, Form, Table, Badge } from "react-bootstrap";

const Reports = () => {
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setClasses(JSON.parse(localStorage.getItem("classes")) || []);
    const att = JSON.parse(localStorage.getItem("attendance")) || {};
    setAttendance(att);
  }, []);

  const handleClassSelect = (cls) => {
    setSelectedClass(cls);

    if (attendance[cls]) {
      setDates(Object.keys(attendance[cls]));
    } else {
      setDates([]);
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4 text-primary">Attendance Reports</h3>

      <div className="d-flex gap-3 mb-4">
        <Form.Select
          value={selectedClass}
          onChange={(e) => handleClassSelect(e.target.value)}
        >
          <option value="">-- Select Class --</option>
          {classes.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </Form.Select>

        <Form.Select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={!dates.length}
        >
          <option value="">-- Select Date --</option>
          {dates.map((d, i) => (
            <option key={i}>{d}</option>
          ))}
        </Form.Select>
      </div>

      {selectedDate && (
        <Table bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Roll</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance[selectedClass][selectedDate].map((rec, i) => (
              <tr key={i}>
                <td>{rec.roll}</td>
                <td>{rec.name}</td>
                <td>
                  <Badge bg={rec.status === "Present" ? "success" : "danger"}>
                    {rec.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default Reports;
