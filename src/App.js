import { useState,useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./User";
import AddUser from "./AddUser";
import { Routes, Route, useNavigate } from "react-router-dom";
import EditMember from "./EditUser";


function App() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    fetch("https://63a3d79c471b38b206173b15.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
      });
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => navigate("/")}>
              User
            </Button>&nbsp;&nbsp;
            <Button color="inherit" onClick={()=>navigate("/adduser")} >
               Add new user
            </Button>&nbsp;&nbsp;
            
            <Button
              color="inherit"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              {mode === "light" ? "dark" : "light"} mode
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="user/edit/:userid" element={<EditMember/>} />
          <Route path="/adduser" element={<AddUser  detail={detail} setDetail={setDetail}/>} />
        
        </Routes>


      </ThemeProvider>
    </div>
  )
}
export default App;