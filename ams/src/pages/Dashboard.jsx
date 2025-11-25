import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const classes = JSON.parse(localStorage.getItem("classes")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};

    setStudentCount(students.length);
    setClassCount(classes.length);

    const stats = Object.keys(attendance).map((cls) => {
      const dates = Object.keys(attendance[cls] || {});
      let present = 0;
      let total = 0;

      dates.forEach((d) => {
        attendance[cls][d].forEach((r) => {
          total++;
          if (r.status === "Present") present++;
        });
      });

      return { className: cls, percent: total ? (present / total) * 100 : 0 };
    });

    setAttendanceData(stats);

    setTimeout(() => loadChart(stats), 200);
  }, []);

  const loadChart = (stats) => {
    new Chart(document.getElementById("attendanceChart"), {
      type: "bar",
      data: {
        labels: stats.map((s) => s.className),
        datasets: [
          {
            label: "Attendance %",
            data: stats.map((s) => s.percent.toFixed(0)),
            backgroundColor: ["#2E8B57"],
          },
        ],
      },
    });
  };

  return (
    <div>
      <h3 className="mb-4 text-primary">Dashboard</h3>

      <div className="row mb-4">
        <div className="col-md-4">
          <Card className="p-3 shadow-sm">
            <h5>Total Students</h5>
            <h2 className="text-success">{studentCount}</h2>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="p-3 shadow-sm">
            <h5>Total Classes</h5>
            <h2 className="text-info">{classCount}</h2>
          </Card>
        </div>
      </div>

      <Card className="p-4 shadow-sm">
        <h5>Attendance Overview</h5>
        <canvas id="attendanceChart" height="100"></canvas>
      </Card>
    </div>
  );
};

export default Dashboard;
