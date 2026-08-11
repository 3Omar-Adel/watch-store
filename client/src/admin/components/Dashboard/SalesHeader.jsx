import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import { useSelector } from "react-redux";

function SalesHeader() {

    const { orders } = useSelector(
        (state) => state.order
    );


    const salesData = useMemo(() => {

        const now = new Date();
        // Current 10 Days
        const currentStart = new Date(now);
        currentStart.setDate(
            currentStart.getDate() - 9
        );
        currentStart.setHours(0, 0, 0, 0);
        // Previous 10 Days
        const previousEnd = new Date(currentStart);
        // previousEnd = بداية الـ current period
        const previousStart = new Date(currentStart);
        previousStart.setDate(
            previousStart.getDate() - 10
        );
        const deliveredOrders = orders.filter(
            (order) =>
                order.orderStatus === "Delivered"
        );
        // Calculate Sales
        let currentSales = 0;
        let previousSales = 0;

        deliveredOrders.forEach((order) => {
            const orderDate = new Date(
                order.createdAt
            );
            const total =
                Number(order.totalPrice) || 0;
            // Current 10 Days
            if (
                orderDate >= currentStart &&
                orderDate <= now
            ) {
                currentSales += total;
            }
            // Previous 10 Days
            if (
                orderDate >= previousStart &&
                orderDate < previousEnd
            ) {
                previousSales += total;
            }
        });
        let percentage = 0;
        if (previousSales > 0) {
            percentage =
                ((currentSales - previousSales) /
                    previousSales) *
                100;
        }


        percentage = Number(
            percentage.toFixed(1)
        );


        return {
            currentSales,
            previousSales,
            percentage,
        };
        console.log({
            currentStart,
            previousStart,
            previousEnd,
            currentSales,
            previousSales,
            percentage,
        });
    }, [orders]);


    const isUp =
        salesData.percentage >= 0;


    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 2,
                width: "100%",
                minWidth: 0,

                // Mobile
                "@media (max-width: 600px)": {
                    alignItems: "flex-start",
                    gap: 1.5,
                },
            }}
        >
            {/*  */}
            <Box
                sx={{
                    minWidth: 0,
                    flex: 1,
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        fontSize: {
                            xs: 16,
                            sm: 20,
                        },
                        whiteSpace: "nowrap",
                    }}
                >
                    Sales Overview
                </Typography>

                <Typography
                    sx={{
                        color: "text.secondary",
                        fontSize: {
                            xs: 11,
                            sm: 13,
                        },
                        mt: 0.3,
                    }}
                >
                    Last 10 Days
                </Typography>
            </Box>
            {/*  */}
            <Box
                sx={{
                    textAlign: "right",
                    minWidth: 0,
                    flexShrink: 0,
                    maxWidth: {
                        xs: "55%",
                        sm: "none",
                    },
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: 17,
                            sm: 24,
                        },
                        fontWeight: 700,
                        lineHeight: 1.1,
                        whiteSpace: "nowrap",
                    }}
                >
                    {salesData.currentSales.toLocaleString()} EGP
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: {
                            xs: 0.3,
                            sm: 0.5,
                        },
                        mt: 0.5,
                        minWidth: 0,
                    }}
                >
                    {isUp ? (
                        <TrendingUpIcon
                            sx={{
                                color: "#22C55E",
                                fontSize: {
                                    xs: 15,
                                    sm: 18,
                                },
                                flexShrink: 0,
                            }}
                        />
                    ) : (
                        <TrendingDownIcon
                            sx={{
                                color: "#EF4444",
                                fontSize: {
                                    xs: 15,
                                    sm: 18,
                                },
                                flexShrink: 0,
                            }}
                        />
                    )}

                    <Typography
                        sx={{
                            color: isUp
                                ? "#22C55E"
                                : "#EF4444",
                            fontWeight: 600,
                            fontSize: {
                                xs: 11,
                                sm: 13,
                            },
                            whiteSpace: "nowrap",
                        }}
                    >
                        {isUp ? "+" : ""}
                        {salesData.percentage}%
                    </Typography>

                    <Typography
                        sx={{
                            color: "#888",
                            fontSize: {
                                xs: 9,
                                sm: 11,
                            },
                            whiteSpace: "nowrap",
                        }}
                    >
                        vs previous 10 days
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default SalesHeader;