import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function AttendancePieChart() {

  const data = [
    {
      name: "Present",
      value: 75
    },
    {
      name: "Absent",
      value: 15
    },
    {
      name: "Late",
      value: 10
    }
  ];

  const COLORS = [
    "#22C55E",
    "#EF4444",
    "#F59E0B"
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "20px",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.08)",
        marginTop: "30px"
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          color: "#111827"
        }}
      >
        📈 Attendance Overview
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendancePieChart;