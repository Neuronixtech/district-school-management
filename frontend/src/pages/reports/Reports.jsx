import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

function Reports() {

  const [search,
  setSearch] = useState("");

  const [dashboard, setDashboard] =
    useState({});

  const [report, setReport] =
    useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchStudentReport();
  }, []);

  const fetchDashboard =
    async () => {
      try {

        const response =
          await API.get(
            "/reports/dashboard"
          );

        setDashboard(
          response.data.dashboard || {}
        );

      } catch (error) {

        console.log(error);
      }
    };

  const fetchStudentReport =
    async () => {
      try {

        const response =
          await API.get(
            "/reports/student-performance"
          );

        setReport(
          response.data.report || []
        );

      } catch (error) {

        console.log(error);
      }
    };

    const exportPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(
    "Student Performance Report",
    14,
    20
  );

  autoTable(doc, {
    head: [[
      "Student",
      "Subject",
      "Exam Type",
      "Total Marks",
      "Obtained",
      "Grade",
      "Remarks"
    ]],

    body: report.map(
      (item) => [
        item.studentId?.name || "N/A",
        item.subject,
        item.examType,
        item.totalMarks,
        item.obtainedMarks,
        item.grade,
        item.remarks || "-"
      ]
    )
  });

  doc.save(
    "Student_Report.pdf"
  );
};

const exportExcel = () => {

  const excelData =
    report.map(
      (item) => ({
        Student:
          item.studentId?.name,
        Subject:
          item.subject,
        Exam:
          item.examType,
        Total:
          item.totalMarks,
        Obtained:
          item.obtainedMarks,
        Grade:
          item.grade,
        Remarks:
          item.remarks
      })
    );

  const worksheet =
    XLSX.utils.json_to_sheet(
      excelData
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Student Report"
  );

  XLSX.writeFile(
    workbook,
    "Student_Report.xlsx"
  );
};

const printReport = () => {
  window.print();
};

const filteredReport =
  report.filter(
    (item) =>
      item.studentId?.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      item.subject
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      item.examType
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (
    <DashboardLayout>

      <div
        style={{
          padding: "20px"
        }}
      >

        <h1
          style={{
            marginBottom: "25px",
            color: "#1e293b"
          }}
        >
          Reports Dashboard
        </h1>

        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "10px"
  }}
>
 <input
  type="text"
  placeholder="🔍 Search Student..."
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
  style={{
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    width: "350px"
  }}
/>

  <div
    style={{
      display: "flex",
      gap: "10px"
    }}
  >
    <button
  style={actionBtn}
  onClick={exportPDF}
>
  📄 Export PDF
</button>

  <button
  style={actionBtn}
  onClick={exportExcel}
>
  📊 Export Excel
</button>

    <button
  style={actionBtn}
  onClick={printReport}
>
  🖨️ Print
</button>
  </div>
</div>

        {/* SUMMARY CARDS */}

       <div
  className="dashboard-cards"
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(4,1fr)",
    gap: "20px"
  }}
>

          <ReportCard
  icon="🎓"
  title="Students"
  value={dashboard.totalStudents || 0}
/>

<ReportCard
  icon="👨‍🏫"
  title="Teachers"
  value={dashboard.totalTeachers || 0}
/>

<ReportCard
  icon="📅"
  title="Attendance"
  value={dashboard.totalAttendance || 0}
/>

<ReportCard
  icon="💰"
  title="Fees Collected"
  value={`₹${dashboard.totalFees || 0}`}
/>

<ReportCard
  icon="📝"
  title="Exams"
  value={dashboard.totalExams || 0}
/>

        </div>

        {/* STUDENT PERFORMANCE */}

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)"
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              color: "#1e293b"
            }}
          >
            📊 Student Performance Analytics
          </h2>

          <div
            style={{
              overflowX: "auto"
            }}
          >

            <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "25px"
  }}
>
  <div style={summaryCard}>
    <h4>Average Score</h4>
    <h2>85%</h2>
  </div>

  <div style={summaryCard}>
    <h4>Highest Score</h4>
    <h2>95</h2>
  </div>

  <div style={summaryCard}>
    <h4>Pass Rate</h4>
    <h2>100%</h2>
  </div>
</div>

<p
  style={{
    marginBottom: "15px",
    color: "#64748b",
    fontWeight: "500"
  }}
>
  Total Records: {report.length}
</p>

<p
  style={{
    marginBottom: "15px",
    color: "#64748b",
    fontWeight: "600"
  }}
>
  Total Records:
  {filteredReport.length}
</p>

            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse"
              }}
            >

              <thead>

                <tr
                  style={{
                    background:
                      "#2563eb",
                    color: "#fff"
                  }}
                >
                  <th style={thStyle}>
                    Student
                  </th>

                  <th style={thStyle}>
                    Subject
                  </th>

                  <th style={thStyle}>
                    Exam Type
                  </th>

                  <th style={thStyle}>
                    Total Marks
                  </th>

                  <th style={thStyle}>
                    Obtained
                  </th>

                  <th style={thStyle}>
                    Grade
                  </th>

                  <th style={thStyle}>
                    Remarks
                  </th>
                </tr>

              </thead>

              <tbody>

               {filteredReport.length > 0 ? (

                  filteredReport.map(
                    (item) => (

                      <tr
                        key={item._id}
                        style={{
                          borderBottom:
                            "1px solid #e5e7eb"
                        }}
                      >
                        <td style={tdStyle}>
                          {item.studentId
                            ?.name || "N/A"}
                        </td>

                        <td style={tdStyle}>
                          {item.subject}
                        </td>

                        <td style={tdStyle}>
                         {item.examType
  ?.replaceAll("_", " ")
  ?.replace(/\b\w/g, c => c.toUpperCase())}
                        </td>

                        <td style={tdStyle}>
                          {item.totalMarks}
                        </td>

                        <td style={tdStyle}>
                          {item.obtainedMarks}
                        </td>

                        <td style={tdStyle}>
                         <span
  style={{
    background:
      item.grade === "A+"
        ? "#dcfce7"
        : item.grade === "A"
        ? "#dbeafe"
        : "#fef3c7",
    color:
      item.grade === "A+"
        ? "#166534"
        : item.grade === "A"
        ? "#1d4ed8"
        : "#b45309",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "600"
  }}
>
  {item.grade}
</span>
                        </td>

                        <td style={tdStyle}>
                          {item.remarks ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )

                ) : (

                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "20px"
                      }}
                    >
                      No Student Report Found
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

/* CARD */

function ReportCard({
  icon,
  title,
  value
}) {
  return (
    <div
    onMouseEnter={(e) =>
  e.currentTarget.style.transform =
    "translateY(-5px)"
}
onMouseLeave={(e) =>
  e.currentTarget.style.transform =
    "translateY(0px)"
}
      style={{
        background:
          "linear-gradient(135deg,#2563eb,#3b82f6)",
        color: "#fff",
        padding: "25px",
        borderRadius: "16px",
        boxShadow:
          "0 10px 25px rgba(37,99,235,0.25)",
        transition: "0.3s"
      }}
    >
      
      <div
        style={{
          fontSize: "28px",
          marginBottom: "10px"
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}


const thStyle = {
  padding: "12px",
  textAlign: "left"
};

const tdStyle = {
  padding: "12px"
};

const actionBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const summaryCard = {
  background: "#f8fafc",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb"
};

export default Reports;