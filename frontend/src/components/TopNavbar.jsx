import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import UserMenu from "./UserMenu";
import { FaBell, FaBars } from "react-icons/fa";

function TopNavbar({
  isMobile,
  setSidebarOpen
}) {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState([]);

  const [showNotifications,
    setShowNotifications] =
    useState(false);

    const [search, setSearch] =
  useState("");


  const getNotifications =
    async () => {
      try {
        const res =
          await API.get(
            "/notifications/latest"
          );

        setNotifications(
          res.data.notifications || []
        );
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
  getNotifications();
}, []);

const handleGlobalSearch = () => {
  const keyword = search.toLowerCase();

  if (keyword.includes("student")) {
    navigate("/student-list");
  }
  else if (keyword.includes("teacher")) {
    navigate("/teacher-list");
  }
  else if (keyword.includes("school")) {
    navigate("/school-list");
  }
  else if (keyword.includes("attendance")) {
    navigate("/attendance-list");
  }
  else if (keyword.includes("fee")) {
    navigate("/fee-list");
  }
  else if (keyword.includes("exam")) {
    navigate("/exam-list");
  }
  else if (keyword.includes("event")) {
    navigate("/event-list");
  }
  else if (keyword.includes("transport")) {
    navigate("/transport-list");
  }
  else if (keyword.includes("hostel")) {
    navigate("/hostel-list");
  }
  else if (keyword.includes("message")) {
    navigate("/message-list");
  }
  else if (keyword.includes("notification")) {
    navigate("/notification-list");
  }
  else if (keyword.includes("leave")) {
    navigate("/leave-list");
  }
  else {
    alert("No matching module found");
  }
};

  return (
    <div
  style={{
    background: "#fff",
    padding:
      window.innerWidth < 768
        ? "10px"
        : "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    marginBottom: "20px",
    flexWrap: "nowrap"
  }}
>
  <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    minWidth: 0
  }}
>
  {isMobile && (
    <FaBars
      size={22}
      style={{
        cursor: "pointer"
      }}
      onClick={() =>
        setSidebarOpen(true)
      }
    />
  )}

  <img
    src="/school3.png"
    alt="School Logo"
    style={{
      width: "55px",
      height: "55px",
      borderRadius: "12px",
      objectFit: "cover",
      border: "2px solid #e5e7eb",
      background: "#fff"
    }}
  />

  <div>
   {window.innerWidth >= 768 && (
  <h2
    style={{
      color: "#2563eb",
      margin: 0,
      fontSize: "24px",
      fontWeight: "700"
    }}
  >
    District School ERP
  </h2>
)}

    {!isMobile && (
      <small
        style={{
          color: "#6b7280",
          fontSize: "13px"
        }}
      >
        Empowering Education Through Technology 🎓
      </small>
    )}
  </div>
</div>

    <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "20px",
    position: "relative"
  }}
>

        <div
  style={{
    display: "flex",
    alignItems: "center"
  }}
>
  <input
  type="text"
  placeholder="Search Students, Teachers..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleGlobalSearch();
    }
  }}
  style={{
    width:
      window.innerWidth < 768
        ? "90px"
        : "280px",
    padding: "10px 15px",
    border: "1px solid #d1d5db",
    borderRight: "none",
    borderRadius: "12px 0 0 12px",
    outline: "none",
    fontSize:
      window.innerWidth < 768
        ? "11px"
        : "14px"
  }}
/>

<button
  onClick={handleGlobalSearch}
  style={{
    background: "#2563EB",
    color: "#fff",
    border: "1px solid #2563EB",
    padding: "10px 15px",
    borderRadius: "0 12px 12px 0",
    cursor: "pointer",
    marginLeft: "-1px"
  }}
>
  🔍
</button>
</div>

        {/* Bell */}
        <div
          style={{
            position: "relative",
            cursor: "pointer"
          }}
        >
          <FaBell
            style={{
              fontSize: "22px",
              cursor: "pointer",
              transition:
                "all 0.3s ease"
            }}
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "rotate(15deg) scale(1.15)";
              e.currentTarget.style.color =
                "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "rotate(0deg) scale(1)";
              e.currentTarget.style.color =
                "inherit";
            }}
          />

          <span
            style={{
              position:
                "absolute",
              top: "-8px",
              right: "-8px",
              background:
                "#ef4444",
              color: "#fff",
              borderRadius:
                "50%",
              width: "18px",
              height: "18px",
              fontSize: "11px",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center"
            }}
          >
            {notifications.length}
          </span>

          {showNotifications && (
            <div
              onMouseLeave={() =>
                setShowNotifications(
                  false
                )
              }
              style={{
                position:
                  "absolute",
                top: "40px",
                right: "0",
                width:
  window.innerWidth < 768
    ? "280px"
    : "320px",
                background:
                  "#fff",
                borderRadius:
                  "12px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.15)",
                zIndex: 999,
                overflow:
                  "hidden"
              }}
            >
              <div
                style={{
                  padding:
                    "15px",
                  fontWeight:
                    "bold",
                  borderBottom:
                    "1px solid #eee",
                  background:
                    "#f8fafc"
                }}
              >
                Notifications
              </div>

              {notifications.length >
              0 ? (
                notifications.map(
                  (item) => (
                    <div
                      key={
                        item._id
                      }
                      style={{
                        padding:
                          "12px 15px",
                        borderBottom:
                          "1px solid #f1f1f1",
                        cursor:
                          "pointer",
                        transition:
                          "all 0.3s ease"
                      }}
                      onMouseEnter={(
                        e
                      ) => {
                        e.currentTarget.style.background =
                          "#EFF6FF";
                        e.currentTarget.style.paddingLeft =
                          "20px";
                      }}
                      onMouseLeave={(
                        e
                      ) => {
                        e.currentTarget.style.background =
                          "#fff";
                        e.currentTarget.style.paddingLeft =
                          "15px";
                      }}
                    >
                      <strong>
                        {
                          item.title
                        }
                      </strong>

                      <p
                        style={{
                          margin:
                            "5px 0",
                          fontSize:
                            "13px",
                          color:
                            "#6b7280"
                        }}
                      >
                        {
                          item.message
                        }
                      </p>
                    </div>
                  )
                )
              ) : (
                <div
                  style={{
                    padding:
                      "15px"
                  }}
                >
                  No Notifications
                </div>
              )}

              <div
                style={{
                  padding:
                    "12px",
                  textAlign:
                    "center",
                  color:
                    "#2563eb",
                  cursor:
                    "pointer",
                  fontWeight:
                    "bold",
                  background:
                    "#fafafa"
                }}
                onClick={() =>
                  navigate(
                    "/notification-list"
                  )
                }
              >
                View All
                Notifications
              </div>
            </div>
          )}
        </div>

        <UserMenu />
      </div>
    </div>
  );
}

export default TopNavbar;