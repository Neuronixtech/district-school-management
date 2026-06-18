import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "../components/TopNavbar";

function DashboardLayout({ children }) {
  
 const [mobile, setMobile] =
  useState(window.innerWidth < 768);

const [sidebarOpen,
  setSidebarOpen] =
  useState(false);

  useEffect(() => {

    const handleResize = () => {
      setMobile(
        window.innerWidth < 768
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

 return (
  <div
    style={{
      display: "flex",
flexDirection:
  mobile ? "column" : "row",
      minHeight: "100vh",
      background: "#f4f6f9"
    }}
  >
    <Sidebar
      isMobile={mobile}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />

    <div
      style={{
        flex: 1,
        overflow: "auto",
        background: "#f4f6f9"
      }}
    >
      <TopNavbar
        isMobile={mobile}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        style={{
          padding:
            mobile
              ? "15px"
              : "25px",
          color: "#111827"
        }}
      >
        {children}
        <div
  style={{
    textAlign: "center",
    padding: "20px",
    color: "#64748b",
    fontSize:
  window.innerWidth < 768
    ? "12px"
    : "15px",
    borderTop: "1px solid #e5e7eb",
    marginTop: "30px"
  }}
>
  © 2026 Neuronix Solutions | District School Management Platform
</div>
      </div>
    </div>
  </div>
);
}

export default DashboardLayout;