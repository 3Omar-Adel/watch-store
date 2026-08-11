import DonutChartCard from "./DonutChartCard";
import { Box } from "@mui/material";
import CustomerStatsCard from "./CustomerStatsCard";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../../features/user/userSlice";
function DashboardCharts() {
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const { user } = useSelector(
        (state) => state.auth
    );

    const { users } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        if (user?.token) {
            dispatch(fetchUsers(user.token));
        }
    }, [dispatch, user]);

    const salesData = useMemo(() => {

        const colors = [
            "#C6A769",
            "#2D9CDB",
            "#27AE60",
            "#EB5757",
        ];
        const delivered = orders.filter(
            (order) => order.orderStatus === "Delivered"
        );
        const map = {};
        delivered.forEach((order) => {
            order.orderItems.forEach((item) => {
                if (!map[item.category]) {
                    map[item.category] = 0;
                }
                map[item.category] += item.quantity;
            });
        });
        return Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([name, value], index) => ({
                name,
                value,
                color: colors[index],
            }));
    }, [orders]);

    const statusData = useMemo(() => {
        const map = {
            Delivered: 0,
            Processing: 0,
            Shipped: 0,
            Cancelled: 0,
        };
        orders.forEach((order) => {
            if (map[order.orderStatus] !== undefined) {
                map[order.orderStatus]++;
            }
        });
        return [
            {
                name: "Delivered",
                value: map.Delivered,
                color: "#27AE60",
            },
            {
                name: "Processing",
                value: map.Processing,
                color: "#F2C94C",
            },
            {
                name: "Shipped",
                value: map.Shipped,
                color: "#2D9CDB",
            },
            {
                name: "Cancelled",
                value: map.Cancelled,
                color: "#EB5757",
            },
        ];
    }, [orders]);

    const totalSales = salesData.reduce(
        (acc, item) => acc + item.value,
        0
    );
    const totalOrders = statusData.reduce(
        (acc, item) => acc + item.value,
        0
    );
    const newCustomers =
    users?.filter((user) => {
        if (!user.createdAt) return false;

        const created = new Date(user.createdAt);
        const now = new Date();

        return (
            created.getUTCMonth() === now.getUTCMonth() &&
            created.getUTCFullYear() === now.getUTCFullYear()
        );
    }).length || 0;

    const previousMonthCustomers =
    users?.filter((user) => {
        if (!user.createdAt) return false;

        const created = new Date(user.createdAt);
        const now = new Date();

        let month = now.getUTCMonth() - 1;
        let year = now.getUTCFullYear();

        if (month < 0) {
            month = 11;
            year--;
        }

        return (
            created.getUTCMonth() === month &&
            created.getUTCFullYear() === year
        );
    }).length || 0;


    const growth =
    previousMonthCustomers === 0
        ? newCustomers === 0 ? 0 : 100
        : Math.round(
            ((newCustomers - previousMonthCustomers) /
                previousMonthCustomers) *
            100
        );
    console.log({
        total: users.length,
        newCustomers,
        previousMonthCustomers,
        growth,
    });


return (
    <Box
        sx={{
            display: "flex",
            flexDirection: {
                xs: "column",
                lg: "row",
            },
            gap: 3,
            mt: 4,
        }}
    >
        <DonutChartCard
            title="Sales by Category"
            total={totalSales}
            data={salesData}
        />
        <DonutChartCard
            title="Order Status"
            total={totalOrders}
            data={statusData}
        />

        <Box
            sx={{
                width: {
                    xs: "100%",
                    lg: "320px",
                },
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
            }}
        >
            <CustomerStatsCard
                title="Total Customers"
                value={users.length}
                growth={growth}
                type="total"
            />

            <CustomerStatsCard
                title="New Customers"
                value={newCustomers}
                growth={growth}
                type="new"
            />
        </Box>
    </Box>

)
}

export default DashboardCharts;