import { Pagination as MuiPagination } from "@mui/material";

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    return (
        <MuiPagination
            count={Math.max(totalPages, 1)}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="standard"
            shape="rounded"
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5,
                mb: {
                    xs: 14,
                    sm: 8,
                    md: 6,
                },

                "& .MuiPaginationItem-root": {
                    fontWeight: 600,
                    borderRadius: "10px",
                    color: "#333",
                },

                "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#C6A769",
                    color: "#fff",

                    "&:hover": {
                        backgroundColor: "#ad8f50",
                    },
                },

                "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#f1eadb",
                },
            }}
        />
    );
}

export default Pagination;