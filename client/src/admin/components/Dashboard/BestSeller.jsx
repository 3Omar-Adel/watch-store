import {
    Box,
    Avatar,
    Typography,
    Divider,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useMemo } from "react";

function BestSeller() {
    const { orders } = useSelector((state) => state.order);

    const bestSeller = useMemo(() => {
        const delivered = orders.filter(
            (order) => order.orderStatus === "Delivered"
        );

        const productsMap = {};

        delivered.forEach((order) => {
            order.orderItems.forEach((item) => {
                if (!productsMap[item.product]) {
                    productsMap[item.product] = {
                        name: item.name,
                        image: item.image,
                        sold: 0,
                    };
                }

                productsMap[item.product].sold += item.quantity;
            });
        });

        return Object.values(productsMap)
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 5);
    }, [orders]);

    return (
        <Box
            sx={{
                bgcolor: "var(--bg-color)",
                borderRadius: "20px",
                p: { xs: 1, sm: 2 },
                flex: 1,
                minHeight: 0,
                minWidth: 0,
                width: "100%",
                maxWidth: "100%",
                marginTop: "30px",
                overflow: "hidden",
                boxSizing: "border-box",
            }}
        >
            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Best Sellers
            </Typography>

            {bestSeller.map((item, index) => (
                <Box key={item.name || index}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 0.8, sm: 1 },
                            py: 1.5,
                            px: { xs: 0.5, sm: 1 },
                            transition: ".25s",
                            borderRadius: "12px",
                            width: "100%",
                            maxWidth: "100%",
                            minWidth: 0,
                            boxSizing: "border-box",

                            "&:hover": {
                                bgcolor: "action.hover",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                width: { xs: 24, sm: 28 },
                                minWidth: { xs: 24, sm: 28 },
                                fontWeight: 700,
                                color: "var(--primary-dark)",
                                fontSize: { xs: "13px", sm: "15px" },
                            }}
                        >
                            #{index + 1}
                        </Typography>

                        <Avatar
                            src={item.image}
                            variant="rounded"
                            sx={{
                                width: { xs: 38, sm: 42 },
                                height: { xs: 38, sm: 42 },
                                minWidth: { xs: 38, sm: 42 },
                                borderRadius: "12px",
                            }}
                        />

                        <Box
                            sx={{
                                flex: 1,
                                minWidth: 0,
                                overflow: "hidden",
                            }}
                        >
                            <Typography
                                fontWeight={700}
                                fontSize={{ xs: "13px", sm: "14px" }}
                                noWrap
                                sx={{
                                    maxWidth: {
                                        xs: "130px",
                                    },
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                textAlign: "right",
                                minWidth: { xs: 45, sm: 50 },
                                ml: 0.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "var(--text-secondary)",
                                    fontSize: {
                                        xs: "12px",
                                        sm: "14px",
                                    },
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {item.sold} Sold
                            </Typography>
                        </Box>
                    </Box>

                    {index !== bestSeller.length - 1 && <Divider />}
                </Box>
            ))}
        </Box>
    );
}

export default BestSeller;