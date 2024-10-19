import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaChartBar,
  FaGlobe,
  FaPaintBrush,
  FaBox,
  FaShoppingCart,
  FaCalendarAlt,
  FaBook,
  FaHeart,
} from "react-icons/fa";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import "./style.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const AdminSidebar = ({ onCollapseChange }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    onCollapseChange(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  return (
    <div style={{ display: "flex" }}>
      <Box
        sx={{
          "& > :not(style)": {
            position: "fixed",
            top: "40px",
            left: isCollapsed ? "55px" : "220px", // Adjust based on sidebar state
            transition: "left 0.3s",
            zIndex: 1000,
          },
        }}
      >
        <Fab color="primary" aria-label="add" onClick={handleCollapse}>
          {!isCollapsed ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
        </Fab>
      </Box>

      <Sidebar
        collapsed={isCollapsed}
        breakPoint="md"
        style={{
          backgroundColor: "rgb(0, 0, 0)",
          height: "100%",
          overflow: "hidden",
          position: "fixed",
          border: "none",
          borderRadius: "0 20px 20px 0px",
          width: isCollapsed ? "70px" : "250px", // Adjust width based on sidebar state
          transition: "width 0.3s",
        }}
      >
        {/* Sidebar Header */}
        {!isCollapsed ? (
          <div className="sidebar-header mb-10 text-center">
            <h4
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "yellow",
                borderRadius: "10px",
                padding: "5px",
                width: "200px",
                margin: "20px",
                textAlign: "center",
              }}
            >
              Waste Mng
            </h4>
          </div>
        ) : (
          <div className="sidebar-header mb-10">
            <h4
              style={{
                color: "black",
                fontWeight: "bold",
                backgroundColor: "yellow",
                borderRadius: "10px",
                padding: "5px",
                margin: "20px",
                textAlign: "center",
              }}
            >
              WM
            </h4>
          </div>
        )}

        {/* Menu Items */}
        <Menu>
          <SubMenu
            label={isCollapsed ? "" : "Bin Management"}
            icon={<FaChartBar />}
            rootStyles={{
              color: "#fff",

              "&:hover": {
                color: "black",
              },
            }}
            className="sidebar-submenu"
          >
            <Link to="/">
              <MenuItem suffix={<span className="badge red"></span>}>
                Add New Bin
              </MenuItem>
            </Link>
            {/* <Link to="/add">
              <MenuItem suffix={<span className="badge red"></span>}>
                Trac
              </MenuItem>
            </Link> */}
          </SubMenu>

          <SubMenu
            label={isCollapsed ? "" : "Customer"}
            icon={<FaGlobe />}
            rootStyles={{
              color: "#fff",

              "&:hover": {
                color: "black",
              },
            }}
          >
            <MenuItem>Google Maps</MenuItem>
            <MenuItem>OpenStreetMap</MenuItem>
          </SubMenu>

          <SubMenu
            label={isCollapsed ? "" : "Suppliers"}
            icon={<FaPaintBrush />}
            rootStyles={{
              color: "#fff",

              "&:hover": {
                color: "black",
              },
            }}
          >
            <Link to="/addsupplier">
              {" "}
              <MenuItem>Add Supplier</MenuItem>
            </Link>
            <Link to="/supplier">
              {" "}
              <MenuItem>Supplier List</MenuItem>
            </Link>
          </SubMenu>

          <SubMenu
            label={isCollapsed ? "" : "Employees"}
            icon={<FaBox />}
            rootStyles={{
              color: "#fff",

              "&:hover": {
                color: "black",
              },
            }}
          >
            <MenuItem>Buttons</MenuItem>
            <MenuItem>Cards</MenuItem>
          </SubMenu>

          <SubMenu
            label={isCollapsed ? "" : "Inquiry"}
            icon={<FaShoppingCart />}
            rootStyles={{
              color: "#fff",

              "&:hover": {
                color: "black",
              },
            }}
          >
            <MenuItem>Products</MenuItem>
            <MenuItem>Orders</MenuItem>
          </SubMenu>

          <SubMenu
            label={isCollapsed ? "" : "Orders"}
            icon={<FaCalendarAlt />}
            rootStyles={{
              color: "#fff",

              "&:hover": {
                color: "black",
              },
            }}
          >
            <MenuItem>View Calendar</MenuItem>
          </SubMenu>

          <MenuItem
            icon={<FaBook />}
            rootStyles={{
              color: "#fff",

              "&:hover": {
                color: "black",
              },
            }}
          >
            {isCollapsed ? <FaBook /> : "Feedback"}
          </MenuItem>
          <MenuItem
            icon={<FaHeart />}
            rootStyles={{
              color: "#fff",

              "&:hover": {
                color: "black",
              },
            }}
          >
            {isCollapsed ? <FaHeart /> : "Service"}
          </MenuItem>
        </Menu>
        <div className="sidebar-footer bg-blue-900">
          {!isCollapsed ? (
            <div className="flex gap-3 text-center p-2.5">
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <p style={{ color: "#fff" }} className="pt-2">
                Admin
              </p>
            </div>
          ) : (
            <p style={{ color: "#fff", textAlign: "center", padding: "10px" }}>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </p>
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
