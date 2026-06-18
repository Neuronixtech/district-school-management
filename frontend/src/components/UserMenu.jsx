import {
  useState,
  useEffect,
  useRef
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaUserCircle
} from "react-icons/fa";

function UserMenu() {

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef(null);

  const user = JSON.parse(
    localStorage.getItem("user") ||
    sessionStorage.getItem("user")
  );

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          menuRef.current &&
          !menuRef.current.contains(
            event.target
          )
        ) {
          setOpen(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    sessionStorage.removeItem(
      "token"
    );

    sessionStorage.removeItem(
      "user"
    );

    navigate("/");
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: "relative"
      }}
    >

      <FaUserCircle
        size={40}
        color="#38bdf8"
        style={{
          cursor: "pointer",
          transition:
            "all 0.3s ease"
        }}
        onClick={() =>
          setOpen(!open)
        }
      />

      {open && (

        <div
          style={{
            position:
              "absolute",
            right: 0,
            top: "50px",
            width: "220px",
            background:
              "#fff",
            borderRadius:
              "12px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.15)",
            overflow:
              "hidden",
            zIndex: 999
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              padding: "15px",
              borderBottom:
                "1px solid #eee",
              background:
                "#f8fafc"
            }}
          >
            <div>
              <strong>
                {user?.name}
              </strong>

              <p
                style={{
                  margin: 0,
                  fontSize:
                    "12px",
                  color:
                    "#6b7280"
                }}
              >
                {user?.role}
              </p>
            </div>

            <button
              onClick={() =>
                setOpen(false)
              }
              style={{
                border: "none",
                background:
                  "transparent",
                cursor:
                  "pointer",
                fontSize:
                  "18px"
              }}
            >
              ✖
            </button>
          </div>

          <div
            style={menuItem}
            onClick={() => {
              setOpen(false);
              navigate(
                "/profile"
              );
            }}
          >
            My Profile
          </div>

          <div
            style={menuItem}
            onClick={() => {
              setOpen(false);
              navigate(
                "/settings"
              );
            }}
          >
            Settings
          </div>

          <div
            style={{
              ...menuItem,
              color: "red"
            }}
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
          >
            Logout
          </div>

        </div>

      )}

    </div>
  );
}

const menuItem = {
  padding: "12px 15px",
  cursor: "pointer",
  borderBottom:
    "1px solid #f3f4f6"
};

export default UserMenu;