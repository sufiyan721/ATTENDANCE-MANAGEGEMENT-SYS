import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ background: "#f8f9fa" }}>
        {children}
      </div>
    </div>
  );
}
