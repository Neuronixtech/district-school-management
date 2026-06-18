import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function SchoolStatsChart({
  data = []
}) {
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
          marginTop: 0,
          marginBottom: "20px",
          color: "#111827",
          fontSize: "22px",
          fontWeight: "700"
        }}
      >
        📊 School Statistics Overview
      </h3>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SchoolStatsChart;