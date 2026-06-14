import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

import {
  useNavigate
} from "react-router-dom";

function QuickActions() {

  const navigate =
    useNavigate();

    const actionBtnStyle = {
  borderRadius: "14px",
  py: 1.2,
  fontWeight: 800,
  fontsize: "20px",
  textTransform: "none",
  transition: "all 0.3s ease",

  "&:hover": {
    transform:
      "translateY(-4px) scale(1.03)",
    boxShadow:
      "0px 10px 25px rgba(0,0,0,0.25)"
  }
};

  return (
    <Card
      sx={{
        borderRadius: "18px",
        boxShadow: 4,
      }}
    >
      <CardContent>

        <Typography
  variant="h5"
  sx={{
    fontWeight: 800,
    color: "#1e293b",
    borderBottom:
      "3px solid #2563eb",
    display: "inline-block",
    pb: 1,
    mb: 2
  }}
>
  ⚡ Quick Actions
</Typography>

        <Stack spacing={2}>

         <Button
  variant="contained"
  sx={actionBtnStyle}
  onClick={() =>
    navigate("/students")
  }
>
  🎓 Add Student
</Button>

<Button
  variant="contained"
  color="success"
  sx={actionBtnStyle}
  onClick={() =>
    navigate("/teachers")
  }
>
  👨‍🏫 Add Teacher
</Button>

<Button
  variant="contained"
  color="warning"
  sx={actionBtnStyle}
  onClick={() =>
    navigate("/fees")
  }
>
  💰 Add Fee
</Button>

<Button
  variant="contained"
  color="secondary"
  sx={actionBtnStyle}
  onClick={() =>
    navigate("/exams")
  }
>
  📝 Create Exam
</Button>

        </Stack>

      </CardContent>
    </Card>
  );
}

export default QuickActions;