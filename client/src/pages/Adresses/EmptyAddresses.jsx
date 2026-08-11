import {
    Box,
    Typography,
} from "@mui/material";

import { FaMapMarkerAlt } from "react-icons/fa";

function EmptyAddresses() {

    return (
        <Box
            sx={{
                mt: 8,
                py: 10,
                borderRadius: "20px",
                textAlign: "center",
                background: "#fafafa",
                border: "1px dashed #d7d7d7",
            }}
        >
            <FaMapMarkerAlt
                size={55}
                color="#C6A769"
            />
            <Typography
                variant="h5"
                fontWeight={700}
                mt={3}
            >
                No Addresses Yet
            </Typography>
            <Typography
                mt={2}
                color="text.secondary"
            >
                Add your first shipping address.
            </Typography>
        </Box>
    );

}

export default EmptyAddresses;