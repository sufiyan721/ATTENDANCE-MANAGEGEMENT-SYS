import { useState, useEffect } from "react";
import { Card, Button, Form, Table } from "react-bootstrap";

const  Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    setClasses(JSON.parse(localStorage.getItem("classes")) || []);
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  const filteredStudents = students.filter(s => s.className === selectedClass);

  const handleToggle = (roll) => {
    setAttendance({
      ...attendance,
      [roll]: attendance[roll] === "Present" ? "Absent" : "Present",
    });
  };

  const handleSave = () => {
    if (!selectedClass) return alert("Select class");
    if (!date) return alert("Select date");

    const existing = JSON.parse(localStorage.getItem("attendance")) || {};

    const classData = existing[selectedClass] || {};

    classData[date] = filteredStudents.map((s) => ({
      name: s.name,
      roll: s.roll,
      status: attendance[s.roll] || "Absent",
    }));

    existing[selectedClass] = classData;

    localStorage.setItem("attendance", JSON.stringify(existing));
    alert("Attendance Saved!");
  };

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4 text-primary">Take Attendance</h3>

      <div className="d-flex gap-3 mb-4">
        <Form.Select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Select Class --</option>
          {classes.map((cls, i) => (
            <option key={i}>{cls}</option>
          ))}
        </Form.Select>

        <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      {filteredStudents.length > 0 && (
        <Table bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Roll</th>
              <th>Student Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, i) => (
              <tr key={i}>
                <td>{s.roll}</td>
                <td>{s.name}</td>
                <td>
                  <Button
                    variant={
                      attendance[s.roll] === "Present" ? "success" : "secondary"
                    }
                    onClick={() => handleToggle(s.roll)}
                  >
                    {attendance[s.roll] || "Absent"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {filteredStudents.length > 0 && (
        <Button onClick={handleSave} variant="success">
          Save Attendance
        </Button>
      )}
    </Card>
  );
};

export default Attendance;
