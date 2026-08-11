import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useMediaQuery } from "@mui/material";

function AdminLayout() {
    const sidebarWidth = 220;

    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:900px)");
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "var(--bg)",
                transition: ".3s",
                overflow: "hidden",

            }}
        >
            <Sidebar
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: isMobile ? 0 : 220,
                    minWidth: 0,
                }}
            >
                <Topbar
                    setMobileOpen={setMobileOpen}
                />

                <main
                    style={{
                        flex: 1,
                        minWidth: 0,
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "20px",
                        marginTop: "60px",
                        overflowY: "auto",

                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;