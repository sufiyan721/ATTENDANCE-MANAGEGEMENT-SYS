import { useState, useEffect } from "react";
import { Card, Button, Form, Table } from "react-bootstrap";

const Students = () => {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    className: "",
    gender: "",
    contact: "",
  });

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setClasses(JSON.parse(localStorage.getItem("classes")) || []);
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (!form.name || !form.roll || !form.className)
      return alert("Fill required fields!");

    const updated = [...students, form];
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));

    setForm({ name: "", roll: "", className: "", gender: "", contact: "" });
  };

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4 text-success">Student Management</h3>

      <Form onSubmit={handleAddStudent} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Student Name *</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Roll No *</Form.Label>
          <Form.Control
            name="roll"
            value={form.roll}
            onChange={handleChange}
            placeholder="Enter roll number"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Select Class *</Form.Label>
          <Form.Select name="className" value={form.className} onChange={handleChange}>
            <option value="">-- Select Class --</option>
            {classes.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Gender</Form.Label>
          <Form.Select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">-- Select Gender --</option>
            <option>Male</option>
            <option>Female</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </Form.Group>

        <Button type="submit" variant="primary">Add Student</Button>
      </Form>

      <h5>Student Records:</h5>

      {students.length === 0 ? (
        <p className="text-muted mt-2">No students added yet.</p>
      ) : (
        <Table bordered hover className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.className}</td>
                <td>{s.gender}</td>
                <td>{s.contact}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default Students;
