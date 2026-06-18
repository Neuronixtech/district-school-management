import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";

function RecentActivities({
  activities = []
}) {

  return (
   <Card
  sx={{
    borderRadius: "20px",
    boxShadow:
      "0px 8px 25px rgba(0,0,0,0.08)",
    transition: "0.3s ease",

    "&:hover": {
      boxShadow:
        "0px 12px 30px rgba(0,0,0,0.12)"
    }
  }}
>
      <CardContent>

        <Typography
 variant={
  window.innerWidth < 768
    ? "h6"
    : "h5"
}
  sx={{
    fontWeight: 800,
    color: "#1e293b",
    borderBottom:
      "3px solid #2563eb",
    display: "inline-block",
    pb: 1,
    mb: 0.5
  }}
>
  📋 Recent Activities
</Typography>

        <List>

          {activities.length > 0 ? (

           activities.map(
  (activity, index) => (

    <div key={index}>

      <ListItem
        sx={{
          transition: "all 0.3s ease",
          cursor: "pointer",
          borderRadius: "12px",
          mb: 1,

          "&:hover": {
            backgroundColor: "#EFF6FF",
            transform:
              "translateX(8px)",
            boxShadow:
              "0 4px 12px rgba(37,99,235,0.15)"
          }
        }}
      >
       <ListItemText
  primary={
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "15px"
      }}
    >
      {activity}
    </Typography>
  }
/>
      </ListItem>

      {index !==
        activities.length - 1 && (
        <Divider />
      )}

    </div>

  )
)

          ) : (

            <ListItem>

             <ListItemText
  primary={
    <Typography
      sx={{
        color: "#6b7280",
        textAlign: "center"
      }}
    >
      No Recent Activities Found
    </Typography>
  }
/>

            </ListItem>

          )}

        </List>

      </CardContent>
    </Card>
  );
}

export default RecentActivities;