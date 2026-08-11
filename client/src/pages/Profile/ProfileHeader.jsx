import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function ProfileHeader() {
    const { user } = useSelector((state) => state.auth);

    return (
        <Box
            sx={{
                background: "#fff",
                borderRadius: "20px",
                border: "1px solid #ECECEC",
                boxShadow: "0 8px 25px rgba(0,0,0,.06)",
                py: 4,
                px: 3,
                textAlign: "center",
                mb: 3,
            }}
        >
            <Avatar
                sx={{
                    width: 75,
                    height: 75,
                    mx: "auto",
                    mb: 1.5,
                    fontSize: 30,
                    fontWeight: 700,
                    background:
                        "linear-gradient(135deg,#C6A769,#8B6A35)",
                    boxShadow:
                        "0 10px 25px rgba(198,167,105,.35)",
                }}
            >
                {user?.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Typography
                variant="h5"
                fontWeight={700}
                sx={{ mb: 0.5 }}
            >
                {user?.name}
            </Typography>

            <Typography
                sx={{
                    color: "#777",
                    fontSize: 15,
                }}
            >
                {user?.email}
            </Typography>

            <Box
                sx={{
                    mt: 2.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1.5,
                    flexWrap: "wrap",
                }}
            >
                <Box
                    sx={{
                        px: 2,
                        py: 0.7,
                        borderRadius: "999px",
                        bgcolor:
                            user?.role === "admin"
                                ? "#FFF4DD"
                                : "#EEF4FF",
                        color:
                            user?.role === "admin"
                                ? "#C6A769"
                                : "#1976D2",
                        fontWeight: 600,
                        fontSize: 12,
                    }}
                >
                    {user?.role === "admin"
                        ? "Administrator"
                        : "Customer"}
                </Box>

                <Typography
                    sx={{
                        color: "#777",
                        fontSize: 13,
                    }}
                >
                    Member Since{" "}
                    {new Date(user?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                            month: "long",
                            year: "numeric",
                        }
                    )}
                </Typography>
            </Box>
        </Box>
    );
}

export default ProfileHeader;