import React from "react";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import AdminSidebar from "./components/AdminSidebar";

import CreateNewBin from "./pages/binmanage/CreateNewBin";
import BinTrack from "./pages/binmanage/BinTrack";
import QrBinScanner from "./pages/binmanage/QrBinScanner";

import AdminDashboard from "./pages/AdminDashboard";
import BinDetailsPage from "./pages/binmanage/BinDetailsPage";

import Home from "./pages/Home";

import AuthComponent from "./pages/auth/AuthComponent";
import UserProfile from "./pages/auth/Profile";
import BinScan from "./pages/binreport/BinScan";
import SheduleBug from "./pages/binreport/SheduleBug";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/add" element={<CreateNewBin />}></Route>
          <Route path="/track" element={<BinTrack />}></Route>
          <Route path="/scan" element={<QrBinScanner />}></Route>

          <Route path="/admin/*" element={<AdminDashboard />}></Route>
          <Route path="/bin-dea" element={<BinDetailsPage />}></Route>

          {/* <Route path="/sign-in" element={<Signin />}></Route>
          <Route path="/sign-up" element={<Signup />}></Route> */}

          <Route path="/auth" element={<AuthComponent />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>

          <Route path="/binbugs" element={<BinScan />}></Route>
          <Route path="/bin-bug" element={<SheduleBug />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
