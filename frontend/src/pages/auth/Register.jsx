import {
  useState,
  useEffect
} from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { toast } from "react-toastify";

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

    const [
  showPassword,
  setShowPassword
] = useState(false);

const [
  showConfirmPassword,
  setShowConfirmPassword
] = useState(false);

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

    const [isMobile, setIsMobile] =
  useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(
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
  toast.error(
    "Passwords do not match"
  );
  return;
}

      try {

        await API.post(
          "/auth/register",
          formData
        );

       toast.success(
  "Account Created Successfully"
);

        navigate("/");

      } catch (error) {

        toast.error(
  error.response?.data?.message ||
  "Registration Failed"
);
      }
    };

  return (
   <div
  style={{
    minHeight: "100vh",
    display: "flex",
flexWrap: "wrap",
    background:
      "linear-gradient(135deg,#2563EB,#4F46E5,#7C3AED)"
  }}
>
    <div
  style={{
    flex: 1,
   padding:
  isMobile
    ? "20px"
    : "80px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }}
>
  <h1
    style={{
      fontSize:
  isMobile
    ? "32px"
    : "64px",
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
        className="login-card"
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
          style={popupInput}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={popupInput}
        />

        {/* Password */}

        <div
  style={{
    position: "relative",
    marginBottom: "15px"
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
  value={formData.password}
  onChange={handleChange}
  required
  style={{
    ...popupInput,
    marginBottom: 0
  }}
/>

  <span
    onClick={() =>
  setShowPassword(
    !showPassword
  )
}
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform:
        "translateY(-50%)",
      cursor: "pointer",
      color: "#4F46E5"
    }}
  >
    {showPassword
      ? <FaEyeSlash />
      : <FaEye />}
  </span>
</div>

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
    style={popupInput}
  />

  <span
    onClick={() =>
      setShowConfirmPassword(
        !showConfirmPassword
      )
    }
    style={{
      position: "absolute",
      right: "15px",
      top: "35%",
      cursor: "pointer",
      color: "#4F46E5"
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
          style={popupInput}
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

const btnStyle = {
  width: "100%",
  padding: "14px",
  background:
    "linear-gradient(135deg,#2563EB,#4F46E5)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "16px",
  boxShadow:
    "0 10px 25px rgba(79,70,229,0.3)"
};

const featureStyle = {
  background:
    "rgba(255,255,255,0.12)",
  padding: "15px",
  borderRadius: "12px",
  fontWeight: "600"
};

const popupInput = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  border: "1px solid #CBD5E1",
  borderRadius: "12px",
  boxSizing: "border-box",
  background: "#F8FAFC",
  color: "#1E293B",
  fontSize: "15px",
  outline: "none"
};

export default Register;