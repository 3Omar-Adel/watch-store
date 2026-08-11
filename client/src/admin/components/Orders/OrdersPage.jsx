import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchAllOrders, updateOrderStatus } from "../../../features/order/orderSlice";

import OrdersToolbar from "./OrdersToolbar";
import OrdersTable from "./OrdersTable";
import UpdateStatusDialog from "./Dialogs/UpdateStatusDialog";
import ViewOrderDialog from "./Dialogs/ViewOrderDialog";

function OrdersPage() {

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openView, setOpenView] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);

    const dispatch = useDispatch();

    const [search, setSearch] = useState("");

    const handleView = (order) => {
        setSelectedOrder(order);
        setOpenView(true);
    };

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setOpenStatus(true);
    };

    const handleSaveStatus = async (orderStatus) => {
        await dispatch(
            updateOrderStatus({
                id: selectedOrder._id,
                orderStatus,
            })
        );
        dispatch(fetchAllOrders());
        setOpenStatus(false);
    };

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    return (
        <div className="Orders">

            <OrdersToolbar
                search={search}
                setSearch={setSearch}
            />
            <OrdersTable
                search={search}
                onView={handleView}
                onEdit={handleEdit}
            />
            <ViewOrderDialog
                open={openView}
                onClose={() => setOpenView(false)}
                order={selectedOrder}
            />

            <UpdateStatusDialog
                open={openStatus}
                onClose={() => setOpenStatus(false)}
                order={selectedOrder}
                onSave={handleSaveStatus}
            />

        </div>
    );
}

export default OrdersPage;