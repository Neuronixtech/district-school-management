import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

    const [showPassword,
  setShowPassword] =
  useState(false);

const [rememberMe,
  setRememberMe] =
  useState(false);

  const [
  showForgotPassword,
  setShowForgotPassword
] = useState(false);

const [showRegister,
  setShowRegister] =
  useState(false);

  const [registerPassword,
  setRegisterPassword] =
  useState("");

const [registerConfirmPassword,
  setRegisterConfirmPassword] =
  useState("");

  const [registerData,
  setRegisterData] =
  useState({
    name: "",
    email: "",
    role: "student"
  });

const [showRegisterPassword,
  setShowRegisterPassword] =
  useState(false);

const [showRegisterConfirmPassword,
  setShowRegisterConfirmPassword] =
  useState(false);

const [
  resetData,
  setResetData
] = useState({
  email: "",
  newPassword: "",
  confirmPassword: ""
});

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res =
        await API.post(
          "/auth/login",
          {
            email,
            password
          }
        );

     if (rememberMe) {

  localStorage.setItem(
    "token",
    res.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(
      res.data.user
    )
  );

} else {

  sessionStorage.setItem(
    "token",
    res.data.token
  );

  sessionStorage.setItem(
    "user",
    JSON.stringify(
      res.data.user
    )
  );
}

      navigate(
        "/dashboard"
      );

    } catch (error) {

      toast.error(
  error.response?.data?.message ||
  "Login Failed"
);
    }
  };

  const handleResetPassword =
  async () => {

    if (
      resetData.newPassword !==
      resetData.confirmPassword
    ) {

      toast.success(
        "Passwords do not match"
      );

      return;
    }

    try {

      await API.put(
        "/auth/reset-password",
        {
          email:
            resetData.email,
          newPassword:
            resetData.newPassword
        }
      );

      toast.success(
        "Password Reset Successfully"
      );

      setShowForgotPassword(
        false
      );

      setResetData({
        email: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to Reset Password"
      );
    }
  };

  const handleRegister =
  async () => {

    if (
      registerPassword !==
      registerConfirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    try {

      await API.post(
        "/auth/register",
        {
          name:
            registerData.name,
          email:
            registerData.email,
          password:
            registerPassword,
          role:
            registerData.role
        }
      );

      toast.success(
        "Account Created Successfully"
      );

      setShowRegister(false);

    } catch (error) {

      toast.error(
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
        "linear-gradient(135deg,#2563EB,#4F46E5,#7C3AED)",
      position: "relative",
      overflow: "hidden"
    }}
  >

    {/* Background Circles */}

    <div
      style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        background:
          "rgba(255,255,255,0.12)",
        borderRadius: "50%",
        top: "-100px",
        left: "-100px"
      }}
    />

    <div
      style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background:
          "rgba(255,255,255,0.08)",
        borderRadius: "50%",
        bottom: "-100px",
        right: "-50px"
      }}
    />

    {/* LEFT */}

    <div
      style={{
        flex: 1,
        padding: "80px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 2
      }}
    >

      <h1
  style={{
    fontSize: "64px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "15px"
  }}
>
  NEURONIX
</h1>

      <h2
  style={{
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "15px"
  }}
>
  Transforming Education Through Digital Excellence
</h2>

<p
  style={{
    maxWidth: "650px",
    lineHeight: "1.9",
    color: "#E5E7EB",
    fontSize: "17px"
  }}
>
  A comprehensive School ERP platform designed to
  streamline academic operations, automate administration,
  enhance communication, and provide real-time insights
  for District Administrators, Schools, Teachers,
  Students and Parents.
</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,1fr)",
          gap: "15px",
          marginTop: "40px",
          maxWidth: "600px",
          fontSize: "17px",
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
          💰 Payroll
        </div>

        <div style={featureStyle}>
          🚌 Transport
        </div>

        <div style={featureStyle}>
          🏠 Hostel
        </div>

      </div>

      <div
        style={{
          marginTop: "40px",
          background:
            "rgba(255,255,255,0.12)",
          backdropFilter:
            "blur(20px)",
          border:
            "1px solid rgba(255,255,255,0.2)",
          borderRadius: "20px",
          padding: "25px",
          width: "500px",
          fontSize: "18px",
        }}
      >

        <h3>
          📊 Dashboard
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2,1fr)",
            gap: "15px",
            marginTop: "15px",
            fontSize: "17px",
          }}
        >

          <div>
            👨‍🎓 2500 Students
          </div>

          <div>
            👨‍🏫 180 Teachers
          </div>

          <div>
            🏫 12 Schools
          </div>

          <div>
            📈 Real-Time Analytics
          </div>

        </div>

      </div>

      {showRegister && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{
  width: "480px",
 background:
  "rgba(255,255,255,0.15)",
backdropFilter:
  "blur(20px)",
border:
  "1px solid rgba(255,255,255,0.2)",
  padding: "35px",
  borderRadius: "24px",
  position: "relative",
  boxShadow:
    "0 25px 60px rgba(0,0,0,0.25)",
  animation:
    "fadeIn 0.3s ease"
}}
    >
      <button
        onClick={() =>
          setShowRegister(false)
        }
      style={{
  position: "absolute",
  top: "15px",
  right: "20px",
  border: "none",
  background:
  "rgba(255,255,255,0.2)",
color:"#fff",
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "14px"
}}

      >
       ✖
      </button>

      <div
  style={{
    textAlign: "center",
    marginBottom: "25px"
  }}
>
  <div
  style={{
    width: "90px",
    height: "90px",
    margin: "0 auto",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#2563EB,#7C3AED)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "45px",
    boxShadow:
      "0 10px 30px rgba(37,99,235,0.4)"
  }}
>
  🎓
</div>

  <h2
    style={{
      margin: "10px 0 5px",
      color: "#fff"
    }}
  >
    Create Account
  </h2>

  <p
    style={{
      color: "#E5E7EB",
      margin: 0
    }}
  >
    Join Neuronix School ERP
  </p>
</div>

     <input
  placeholder="Full Name"
  value={registerData.name}
  onChange={(e) =>
    setRegisterData({
      ...registerData,
      name: e.target.value
    })
  }
  style={popupInput}
/>

      <input
  placeholder="Email"
  value={registerData.email}
  onChange={(e) =>
    setRegisterData({
      ...registerData,
      email: e.target.value
    })
  }
  style={popupInput}
/>

      <div
  style={{
    position: "relative",
    marginBottom: "15px"
  }}
>
  <input
    type={
      showRegisterPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={registerPassword}
    onChange={(e) =>
      setRegisterPassword(
        e.target.value
      )
    }
    style={popupInput}
    
  />

  <span
    onMouseDown={() =>
      setShowRegisterPassword(
        true
      )
    }
    onMouseUp={() =>
      setShowRegisterPassword(
        false
      )
    }
    onMouseLeave={() =>
      setShowRegisterPassword(
        false
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
    {showRegisterPassword
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
      showRegisterConfirmPassword
        ? "text"
        : "password"
    }
    placeholder="Confirm Password"
    value={
      registerConfirmPassword
    }
    onChange={(e) =>
      setRegisterConfirmPassword(
        e.target.value
      )
    }
    style={popupInput}
  />

  <span
    onMouseDown={() =>
      setShowRegisterConfirmPassword(
        true
      )
    }
    onMouseUp={() =>
      setShowRegisterConfirmPassword(
        false
      )
    }
    onMouseLeave={() =>
      setShowRegisterConfirmPassword(
        false
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
    {showRegisterConfirmPassword
      ? <FaEyeSlash />
      : <FaEye />}
  </span>
</div>

      <select
        style={popupInput}
  value={registerData.role}
  onChange={(e) =>
    setRegisterData({
      ...registerData,
      role: e.target.value
    })
  }
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

       onMouseEnter={(e)=>{
  e.target.style.transform =
    "translateY(-3px)";
}}

onMouseLeave={(e)=>{
  e.target.style.transform =
    "translateY(0)";
}}
onClick={handleRegister}
         style={{
    width: "100%",
    padding: "15px",
    background:
      "linear-gradient(135deg,#2563EB,#7C3AED)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
    boxShadow:
      "0 10px 25px rgba(124,58,237,0.4)",
      transition:
      "all 0.3s ease"
  }}
>
  Create Account
</button>
    </div>
  </div>
)}

    </div>

    {/* RIGHT LOGIN */}

   <div
  style={{
    width: "450px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: "160px"
  }}
>

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.15)",
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

       <div
  style={{
    textAlign: "center",
    marginBottom: "25px"
  }}
>
  <div
    style={{
      width: "90px",
      height: "90px",
      margin: "0 auto",
      borderRadius: "50%",
      background:
        "linear-gradient(135deg,#2563EB,#7C3AED)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "45px",
      boxShadow:
        "0 10px 30px rgba(37,99,235,0.4)"
    }}
  >
    🎓
  </div>

  <h2
    style={{
      margin: "15px 0 8px",
      color: "#fff",
      fontSize: "32px",
      fontWeight: "700"
    }}
  >
    Welcome Back
  </h2>

  <p
    style={{
      color: "#E5E7EB",
      margin: 0,
      fontSize: "15px"
    }}
  >
    Login to continue
  </p>
</div>

        <form
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            style={popupInput}
          />

         <div
  style={{
    position: "relative",
    marginBottom: "18px"
  }}
>

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(
        e.target.value
      )
    }
    required
    style={{
      width: "100%",
      padding: "14px",
      paddingRight: "50px",
      borderRadius: "10px",
      border: "none",
      outline: "none",
      boxSizing: "border-box"
    }}
  />

  <div
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
      position: "absolute",
      right: "15px",
      top: "50%",
      transform:
        "translateY(-50%)",
      cursor: "pointer",
      color: "#374151"
    }}
  >
    {showPassword
      ? <FaEyeSlash />
      : <FaEye />}
  </div>

</div>

<div
  style={{
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "20px",
    fontSize: "16px"
  }}
>

  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#fff"
    }}
  >
    <input
      type="checkbox"
      checked={rememberMe}
      onChange={() =>
        setRememberMe(
          !rememberMe
        )
      }
    />

    Remember Me
  </label>

  <span
    style={{
      color: "#fff",
      cursor: "pointer",
      textDecoration:
        "underline"
    }}
    onClick={() =>
      navigate(
        "/forgot-password"
      )
    }
  >
    Forgot Password?
  </span>

</div>

         <button
  type="submit"
  style={{
    width: "100%",
    padding: "14px",
    background:
      "linear-gradient(135deg,#2563EB,#7C3AED)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
    boxShadow:
      "0 10px 25px rgba(124,58,237,0.4)",
    transition:
      "all 0.3s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-3px)";
    e.currentTarget.style.boxShadow =
      "0 15px 30px rgba(124,58,237,0.5)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 10px 25px rgba(124,58,237,0.4)";
  }}
>
  Login
</button>

          <p
  style={{
    textAlign: "center",
    marginTop: "15px"
  }}
>
  Don't have an account?{" "}
  <span
    style={{
      color: "white",
      cursor: "pointer",
      fontWeight: "12000",
       textDecoration:
        "underline"
    }}
   onClick={() =>
  setShowRegister(true)
}
  >
    Create Account
  </span>
</p>

        </form>

      </div>

    </div>
  
  </div>
);
}

const glassInput = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  border:
    "1px solid rgba(255,255,255,0.3)",
  borderRadius: "12px",
  background:
    "rgba(255,255,255,0.15)",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box"
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
  border: "1px solid #D1D5DB",
  borderRadius: "12px",
  boxSizing: "border-box",
  background: "#FFFFFF",
  color: "#1E293B",
  fontSize: "15px",
  outline: "none"
};

export default Login;