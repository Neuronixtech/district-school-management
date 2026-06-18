import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import DataTable from "../../components/DataTable";
import TableHeader from "../../components/TableHeader";
import { toast } from "react-toastify";
import exportToExcel from "../../utils/exportToExcel";
import exportToPDF from "../../utils/exportToPDF";

function StudentList() {

  const navigate =
    useNavigate();

  const [
    students,
    setStudents
  ] = useState([]);

  const [
    filteredStudents,
    setFilteredStudents
  ] = useState([]);

  const getStudents =
    async () => {

      try {

        const res =
          await API.get(
            "/students/all"
          );

        const data =
          res.data.students || [];

        setStudents(data);
        setFilteredStudents(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getStudents();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        students.filter(
          (student) =>
            student.name
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            student.email
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            student.studentId
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredStudents(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Student?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/students/delete/${id}`
        );

toast.success(
  "Student Deleted Successfully"
);

        getStudents();

      } catch (error) {
        console.log(error);
      }
    };

  const columns = [
    {
      key: "studentId",
      label: "Student ID"
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "class",
      label: "Class"
    },
    {
      key: "school",
      label: "School",
      render: (student) =>
        student.schoolId
          ?.schoolName ||
        "N/A"
    }
  ];

 return (
  <DashboardLayout>

    <TableHeader
      title="Students"
      count={filteredStudents.length}
      onSearch={handleSearch}
    />

    <div
      style={{
        background: "#fff",
        padding:
          window.innerWidth < 768
            ? "15px"
            : "25px",
        borderRadius: "18px"
      }}
    >

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "15px"
        }}
      >

        <button
          onClick={() =>
            exportToExcel(
              filteredStudents,
              "Students"
            )
          }
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          📊 Export Excel
        </button>

        <button
          onClick={() =>
            exportToPDF(
              ["Name", "Email"],
              filteredStudents.map(
                (student) => [
                  student.name,
                  student.email
                ]
              ),
              "Students"
            )
          }
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          📄 Export PDF
        </button>

      </div>

      <button
        onClick={() =>
          navigate("/students")
        }
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          width:
  window.innerWidth < 768
    ? "100%"
    : "auto",
padding: "12px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "15px"
        }}
      >
        + Add Student
      </button>

      <div
        style={{
          overflowX: "auto",
          width: "100%"
        }}
      >

        <DataTable
          columns={columns}
          data={filteredStudents}
          renderActions={(student) => (
            <>
              <button
                onClick={() =>
                  navigate(
                    `/student-view/${student._id}`
                  )
                }
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  marginRight: "8px",
                  cursor: "pointer"
                }}
              >
                View
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/students?id=${student._id}`
                  )
                }
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  marginRight: "8px",
                  cursor: "pointer"
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(
                    student._id
                  )
                }
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </>
          )}
        />

      </div>

    </div>

  </DashboardLayout>
);
}

export default StudentList;

