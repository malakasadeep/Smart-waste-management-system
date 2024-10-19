import React from "react";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import CreateNewBin from "./pages/binmanage/CreateNewBin";
import BinTrack from "./pages/binmanage/BinTrack";
import QrBinScanner from "./pages/binmanage/QrBinScanner";
import AdminDashboard from "./pages/AdminDashboard";
import BinDetailsPage from "./pages/binmanage/BinDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminSidebar />}></Route>
          <Route path="/add" element={<CreateNewBin />}></Route>
          <Route path="/track" element={<BinTrack />}></Route>
          <Route path="/scan" element={<QrBinScanner />}></Route>
          <Route path="/admin/*" element={<AdminDashboard />}></Route>
          <Route path="/bin-dea" element={<BinDetailsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
