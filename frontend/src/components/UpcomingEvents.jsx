function UpcomingEvents({
  events = []
}) {

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "18px",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.08)"
      }}
    >

      <h3
        style={{
          fontSize: "22px",
          fontWeight: "800",
          color: "#1e293b",
          borderBottom:
            "3px solid #2563eb",
          display: "inline-block",
          paddingBottom: "6px",
          marginBottom: "20px",
          marginTop: 0
        }}
      >
        📅 Upcoming Events
      </h3>

      {events.length > 0 ? (

        events.map(
          (event) => (

            <div
              key={event._id}
              style={{
                padding: "14px",
                marginBottom: "12px",
                background: "#f8fafc",
                borderRadius: "12px",
                borderLeft:
                  "4px solid #2563eb",
                transition:
                  "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(37,99,235,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "none";
              }}
            >

              <h4
                style={{
                  margin: 0,
                  color: "#111827",
                  fontWeight: "700"
                }}
              >
                {event.title}
              </h4>

              <p
                style={{
                  color: "#6b7280",
                  margin:
                    "8px 0",
                  fontSize: "14px"
                }}
              >
                {event.description}
              </p>

              <small
                style={{
                  color:
                    "#2563eb",
                  fontWeight:
                    "700"
                }}
              >
                ⏰ {new Date(
  event.startDate
).toLocaleDateString()}
              </small>

            </div>
          )
        )

      ) : (

        <div
          style={{
            textAlign:
              "center",
            padding: "20px",
            color: "#6b7280"
          }}
        >
          📅 No Upcoming Events
        </div>

      )}

    </div>
  );
}

export default UpcomingEvents;