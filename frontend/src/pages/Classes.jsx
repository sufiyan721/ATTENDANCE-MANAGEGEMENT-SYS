import { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";

const Classes = () => {
  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("classes")) || [];
    setClasses(saved);
  }, []);

  const handleAddClass = (e) => {
    e.preventDefault();

    if (!className.trim()) return alert("Enter class name!");

    const updated = [...classes, className];
    setClasses(updated);
    localStorage.setItem("classes", JSON.stringify(updated));
    setClassName("");
  };

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4 text-primary">Class Management</h3>

      <Form onSubmit={handleAddClass} className="d-flex gap-2 mb-4">
        <Form.Control
          type="text"
          placeholder="Enter class (e.g., FY BCA)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <Button type="submit" variant="success">
          Add Class
        </Button>
      </Form>

      <h5>Available Classes:</h5>
      <ul className="list-group">
        {classes.length === 0 ? (
          <p className="text-muted mt-2">No classes added yet.</p>
        ) : (
          classes.map((cls, i) => (
            <li className="list-group-item" key={i}>{cls}</li>
          ))
        )}
      </ul>
    </Card>
  );
};

export default Classes;
