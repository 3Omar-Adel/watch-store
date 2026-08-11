import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

import SalesHeader from "./SalesHeader";
import { Margin } from "@mui/icons-material";

function SalesChart() {
    const { orders } = useSelector((state) => state.order);

    const deliveredOrders = orders.filter(
        (order) => order.orderStatus === "Delivered"
    );

    // Local date key
    const getDateKey = (date) => {
        const d = new Date(date);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const last10Days = [];

    for (let i = 9; i >= 0; i--) {
        const date = new Date();

        date.setDate(date.getDate() - i);

        last10Days.push({
            key: getDateKey(date),

            label: date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
            }),

            total: 0,
        });
    }

    deliveredOrders.forEach((order) => {
        const orderDate = getDateKey(order.createdAt);

        const day = last10Days.find(
            (d) => d.key === orderDate
        );

        if (day) {
            day.total += Number(order.totalPrice) || 0;
        }
    });

    const categories = last10Days.map(
        (d) => d.label
    );

    const salesData = last10Days.map(
        (d) => d.total
    );

    const options = {
        chart: {
            toolbar: {
                show: false,
            },

            zoom: {
                enabled: false,
            },

            parentHeightOffset: 0,
        },

        stroke: {
            curve: "straight",
            width: 2,
        },

        markers: {
            size: 0,

            hover: {
                size: 5,
            },
        },

        fill: {
            type: "gradient",

            gradient: {
                shade: "dark",
                opacityFrom: 0.75,
                opacityTo: 0.05,
                stops: [0, 100],
            },
        },

        colors: [
            "var(--primary-dark)",
        ],

        grid: {
            strokeDashArray: 9,

            padding: {
                left: 20,
                right: 20,
                top: 5,
                bottom: 5,
            },

            borderColor:
                "rgba(255,255,255,.03)",
        },

        xaxis: {
            categories,

            tickPlacement: "on",

            labels: {
                rotate: 0,
                hideOverlappingLabels: false,
                trim: false,

                style: {
                    colors: "var(--color)",
                    fontSize: "12px",
                    fontWeight: 500,
                },
            },

            axisBorder: {
                show: false,
            },

            axisTicks: {
                show: false,
            },
        },

        yaxis: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },

        tooltip: {
            theme: "dark",

            x: {
                show: true,
            },

            y: {
                formatter: (value) =>
                    `${Number(value).toLocaleString()} EGP`,
            },
        },

        responsive: [
            {
                breakpoint: 600,

                options: {
                    chart: {
                        height: 220,
                    },

                    grid: {
                        padding: {
                            left: 8,
                            right: 8,
                            top: 5,
                            bottom: 5,
                        },
                    },

                    xaxis: {
                        tickPlacement: "on",

                        labels: {
                            rotate: -35,
                            hideOverlappingLabels: true,
                            trim: false,

                            style: {
                                fontSize: "9px",
                                fontWeight: 500,
                            },
                        },
                    },
                },
            },

            {
                breakpoint: 400,

                options: {
                    chart: {
                        height: 210,
                    },

                    grid: {
                        padding: {
                            left: 5,
                            right: 5,
                        },
                    },
                    xaxis: {
                        labels: {
                            rotate: -45,
                            hideOverlappingLabels: true,

                            style: {
                                fontSize: "8px",
                            },
                        },
                    },
                },
            },
        ],
    };

    const series = [
        {
            name: "Sales",
            data: salesData,
        },
    ];

    return (
        <div
            className="chartCard"
            style={{
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflow: "hidden",
                boxSizing: "border-box",
            }}
        >
            <SalesHeader />

            <div
                style={{
                    width: "100%",
                    minWidth: 0,
                }}
            >
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    height={250}
                    width="100%"
                />
            </div>
        </div>
    );
}

export default SalesChart;