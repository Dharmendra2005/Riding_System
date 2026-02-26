import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import UserHomePage from "./pages/UserHomePage";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHomePage from "./pages/CaptainHomePage";
import Riding from "./pages/Riding";


const App = () => {
  return (
    <div>
      <Routes>
       <Route path="/" element={<Start/>}/>
       <Route path="/signup" element={<UserSignup/>}/>
       <Route path="/login" element={<UserLogin/>}/>
       <Route path="/riding" element={<Riding/>}/>
       <Route path="/captain-signup" element={<CaptainSignup/>}/>
       <Route path="/captain-login" element={<CaptainLogin/>}/>
       <Route path = "/user-home" element={<UserProtectWrapper> <UserHomePage/></UserProtectWrapper>}/>
       <Route path = "/user/logout" element={<UserProtectWrapper><UserLogout/></UserProtectWrapper>}/>
       <Route path = "/captain-home" element={<CaptainProtectWrapper><CaptainHomePage/></CaptainProtectWrapper>}/>
      </Routes>
    </div>
  );
};

export default App;