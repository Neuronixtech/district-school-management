import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function Register() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "student"
    });

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
  setShowConfirmPassword] =
  useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        formData.password !==
        confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      try {

        await API.post(
          "/auth/register",
          formData
        );

        alert(
          "Account Created Successfully"
        );

        navigate("/");

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
          "Registration Failed"
        );
      }
    };

  return (
   <div
  style={{
    minHeight: "100vh",
    display: "flex",
    background:
      "linear-gradient(135deg,#2563EB,#4F46E5,#7C3AED)"
  }}
>
    <div
  style={{
    flex: 1,
    padding: "80px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }}
>
  <h1
    style={{
      fontSize: "64px",
      fontWeight: "800",
      marginBottom: "15px"
    }}
  >
    NEURONIX
  </h1>

  <h2
    style={{
      fontSize: "34px",
      marginBottom: "20px"
    }}
  >
    Join Our School ERP Platform
  </h2>

  <p
    style={{
      maxWidth: "650px",
      lineHeight: "1.8",
      fontSize: "17px"
    }}
  >
    Create your account and access
    student management, attendance,
    academic reports, notifications
    and many more ERP services.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(2,1fr)",
      gap: "15px",
      marginTop: "40px",
      maxWidth: "600px"
    }}
  >
    <div style={featureStyle}>
      🎓 Student Management
    </div>

    <div style={featureStyle}>
      👨‍🏫 Teacher Management
    </div>

    <div style={featureStyle}>
      📅 Attendance
    </div>

    <div style={featureStyle}>
      📊 Reports
    </div>

    <div style={featureStyle}>
      💰 Fees
    </div>

    <div style={featureStyle}>
      🔔 Notifications
    </div>
  </div>
</div>

<div
  style={{
    width: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  }}
></div>

      <form
        onSubmit={handleSubmit}
       style={{
  width: "100%",
  maxWidth: "420px",
  background:
    "rgba(255,255,255,0.15)",
  backdropFilter:
    "blur(20px)",
  border:
    "1px solid rgba(255,255,255,0.2)",
  borderRadius: "25px",
  padding: "40px",
  color: "#fff",
  boxShadow:
    "0 25px 50px rgba(0,0,0,0.25)"
}}
      >

        <h1
          style={{
            textAlign:
              "center",
            marginBottom:
              "20px"
          }}
        >
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Password */}

        <div
          style={{
            position:
              "relative",
            marginBottom:
              "15px"
          }}
        >
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            onChange={
              handleChange
            }
            required
            style={{
              ...inputStyle,
              marginBottom: 0
            }}
          />

          <span
           onMouseDown={() =>
      setShowPassword(true)
    }
    onMouseUp={() =>
      setShowPassword(false)
    }
    onMouseLeave={() =>
      setShowPassword(false)
    }
            style={{
              position:
                "absolute",
              right: "15px",
              top: "50%",
              transform:
                "translateY(-50%)",
              cursor:
                "pointer"
            }}
          >
            {showPassword
              ? <FaEyeSlash />
              : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}

       <div
  style={{
    position: "relative",
    marginBottom: "15px"
  }}
>
  <input
    type={
      showConfirmPassword
        ? "text"
        : "password"
    }
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) =>
      setConfirmPassword(
        e.target.value
      )
    }
    required
    style={{
      ...inputStyle,
      marginBottom: 0
    }}
  />

  <span
    onMouseDown={() =>
      setShowConfirmPassword(
        true
      )
    }
    onMouseUp={() =>
      setShowConfirmPassword(
        false
      )
    }
    onMouseLeave={() =>
      setShowConfirmPassword(
        false
      )
    }
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform:
        "translateY(-50%)",
      cursor: "pointer"
    }}
  >
    {showConfirmPassword
 ? <FaEyeSlash />
 : <FaEye />}
  </span>
</div>

        <select
          name="role"
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="student">
            👨‍🎓 Student
          </option>

          <option value="teacher">
            👨‍🏫 Teacher
          </option>

          <option value="parent">
            👨‍👩‍👧 Parent
          </option>

        </select>

        <button
          type="submit"
          style={btnStyle}
        >
          Create Account
        </button>

        <p
          style={{
            textAlign:
              "center",
            marginTop:
              "15px"
          }}
        >
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border:
    "1px solid #ddd",
  borderRadius: "10px",
  boxSizing:
    "border-box"
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background:
    "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600"
};

const featureStyle = {
  background:
    "rgba(255,255,255,0.12)",
  padding: "15px",
  borderRadius: "12px",
  fontWeight: "600"
};

export default Register;