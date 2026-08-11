import { Box } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileMenu from "./ProfileMenu";

function Profile() {
    return (
        <Box
            sx={{
                maxWidth: "700px",
                mx: "auto",
                mt: "100px",
                mb: 6,
                px: 2,
            }}
        >
            <ProfileHeader />

            <ProfileMenu />
        </Box>
    );
}

export default Profile;