import "./Porduct.css"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { fetchProducts } from "../../../features/products/productSlice";
import { deleteProductById, } from "../../../features/products/productSlice";

import ProductsToolbar from "./ProductsToolbar";
import ProductsTable from "./ProductsTable";
import ProductDialog from "./ProductDialog";
import DeleteDialog from "./DeleteDialog";

function ProductsPage() {

    const dispatch = useDispatch();

    const [search, setSearch] = useState("");

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);

    const [deleteDialog, setDeleteDialog] = useState(false);

    const { user } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAdd = () => {
        setSelectedProduct(null);
        setOpenDialog(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setOpenDialog(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setDeleteDialog(true);
    };

    const handleConfirmDelete = (product) => {
        dispatch(
            deleteProductById({
                id: product._id,
                token: user.token,
            })
        );
        setDeleteDialog(false);
    };

    return (
        <div className="Product">
            <ProductsToolbar
                search={search}
                setSearch={setSearch}
                onAdd={handleAdd}
            />

            <ProductsTable
                search={search}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ProductDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                product={selectedProduct}
            />

            <DeleteDialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
                product={selectedProduct}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default ProductsPage;