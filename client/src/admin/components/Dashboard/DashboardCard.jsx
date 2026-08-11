import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import AnimatedNumber from "../../../components/common/AnimatedNumber";
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
function DashboardCard() {

    const { orders } = useSelector((state) => state.order);
    const [range, setRange] = useState("all");

    const cards = useMemo(() => {

        const now = new Date();

        const deliveredOrders = orders.filter((order) => {

            if (order.orderStatus !== "Delivered")
                return false;

            const orderDate = new Date(order.createdAt);

            switch (range) {

                case "today": {
                    const start = new Date();
                    start.setHours(0, 0, 0, 0);

                    return orderDate >= start;
                }

                case "last7": {
                    const start = new Date();
                    start.setDate(now.getDate() - 6);
                    start.setHours(0, 0, 0, 0);

                    return orderDate >= start;
                }

                case "last30":
                    return (
                        orderDate >=
                        new Date(
                            now.getTime() -
                            30 * 24 * 60 * 60 * 1000
                        )
                    );

                case "thisMonth":
                    return (
                        orderDate.getMonth() ===
                        now.getMonth() &&
                        orderDate.getFullYear() ===
                        now.getFullYear()
                    );

                case "lastMonth": {
                    const lastMonth = new Date(
                        now.getFullYear(),
                        now.getMonth() - 1,
                        1
                    );

                    return (
                        orderDate.getMonth() === lastMonth.getMonth() &&
                        orderDate.getFullYear() === lastMonth.getFullYear()
                    );
                }

                default:
                    return true;
            }

        });

        const totalSales = deliveredOrders.reduce(
            (acc, order) => acc + order.totalPrice,
            0
        );

        const totalProfit = totalSales * 0.25;
        const totalOrders = deliveredOrders.length;
        const totalItems = deliveredOrders.reduce(
            (acc, order) =>
                acc +
                order.orderItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                ),
            0
        );

        const thisMonthOrders = orders.filter((order) => {
            const date = new Date(order.createdAt);

            return (
                order.orderStatus === "Delivered" &&
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
            );
        });

        const lastMonthOrders = orders.filter((order) => {
            const date = new Date(order.createdAt);

            return (
                order.orderStatus === "Delivered" &&
                date.getMonth() === now.getMonth() - 1 &&
                date.getFullYear() === now.getFullYear()
            );
        });

        const thisMonthSales = thisMonthOrders.reduce(
            (sum, order) => sum + order.totalPrice,
            0
        );

        const lastMonthSales = lastMonthOrders.reduce(
            (sum, order) => sum + order.totalPrice,
            0
        );

        const thisMonthProfit = thisMonthSales * 0.25;
        const lastMonthProfit = lastMonthSales * 0.25;

        const thisMonthItems = thisMonthOrders.reduce(
            (sum, order) =>
                sum +
                order.orderItems.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                ),
            0
        );

        const lastMonthItems = lastMonthOrders.reduce(
            (sum, order) =>
                sum +
                order.orderItems.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                ),
            0);

        const getPercent = (current, previous) => {
            if (previous === 0) {
                return current > 0 ? 100 : 0;
            }

            return Number(
                (((current - previous) / previous) * 100).toFixed(1)
            );
        };
        return [
            {
                id: "sales",
                title: "Total Sales",
                number: totalSales,
                unit: "EGP",
                percent: getPercent(thisMonthSales, lastMonthSales),
            },
            {
                id: "profit",
                title: "Profit",
                number: totalProfit,
                unit: "EGP",
                percent: getPercent(thisMonthProfit, lastMonthProfit),
            },
            {
                id: "orders",
                title: "Delivered ",
                number: totalOrders,
                unit: "",
                percent: getPercent(
                    thisMonthOrders.length,
                    lastMonthOrders.length
                ),
            },
            {
                id: "items",
                title: "Items Sold",
                number: totalItems,
                unit: "",
                percent: getPercent(
                    thisMonthItems,
                    lastMonthItems
                ),
            },
        ];

    }, [orders, range]);

    return (
        <section className="card">

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                        fontSize: {
                            xs: "18px",
                            sm: "24px",
                        },
                    }}
                >
                    Dashboard Overview
                </Typography>

                <FormControl
                    size="small"
                    sx={{
                        minWidth: {
                            xs: 140,
                            sm: 170,
                        },
                    }}
                >
                    <Select
                        value={range}
                        onChange={(e) =>
                            setRange(e.target.value)
                        }
                    >
                        <MenuItem value="all">
                            All
                        </MenuItem>

                        <MenuItem value="today">
                            Today
                        </MenuItem>

                        <MenuItem value="last7">
                            Last 7 Days
                        </MenuItem>

                        <MenuItem value="last30">
                            Last 30 Days
                        </MenuItem>

                        <MenuItem value="thisMonth">
                            This Month
                        </MenuItem>

                        <MenuItem value="lastMonth">
                            Last Month
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <div className="cardItem">

                {cards.map((card) => (

                    <article
                        className="cardInfo"
                        key={card.id}
                    >

                        <h4>{card.title}</h4>
                        <span className="valueCard">
                            <AnimatedNumber
                                value={card.number}
                            />
                            {card.unit && (
                                <span className="unit">
                                    {card.unit}
                                </span>
                            )}
                        </span>
                        <small
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                color:
                                    card.percent >= 0
                                        ? "#22C55E"
                                        : "#EF4444",
                                fontWeight: 700,
                                marginTop: 8,
                            }}
                        >
                            {card.percent >= 0 ? "▲" : "▼"}
                            {Math.abs(card.percent)}%
                            <span
                                style={{
                                    fontSize: "10px",
                                    color: "#888",
                                    fontWeight: 400,
                                }}
                            >
                                vs last month
                            </span>
                        </small>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default DashboardCard;