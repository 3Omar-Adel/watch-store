import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Button,
    MenuItem,
    FormControlLabel,
    Switch,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    addProduct,
    fetchProducts,
    updateProductById,
} from "../../../features/products/productSlice";

function ProductDialog({
    open,
    onClose,
    product,
}) {

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        category: "",
        gender: "",
        price: "",
        discount: "",
        stock: "",
        description: "",
        featured: false,
    });

    const MAX_IMAGES = 5;
    const createEmptySlot = () => ({
        url: "",
        preview: "",
        file: null,
        isNew: false,
    });
    const emptySlots = () =>
        Array.from({ length: 5 }, createEmptySlot);

    const [imageSlots, setImageSlots] = useState(emptySlots());
    const [deletedImages, setDeletedImages] = useState([]);
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {

        if (product) {

            setFormData({
                name: product.name || "",
                brand: product.brand || "",
                category: product.category || "",
                gender: product.gender || "",
                price: product.price || "",
                discount: product.discount || "",
                stock: product.stock || "",
                description: product.description || "",
                featured: product.featured || false,
            });
            const slots = emptySlots();

            product.images?.forEach((img, index) => {
                if (index < 5) {
                    slots[index] = {
                        url: img.url || img,
                        preview: "",
                        file: null,
                        isNew: false,
                    };
                }
            });
            setImageSlots(slots);
            setDeletedImages([]);

        } else {

            setFormData({
                name: "",
                brand: "",
                category: "",
                gender: "",
                price: "",
                discount: "",
                stock: "",
                description: "",
                featured: false,
            });
            setImageSlots(emptySlots());
            setDeletedImages([]);
        }

    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (index, file) => {
        if (!file) return;

        const preview = URL.createObjectURL(file);
        setImageSlots((prev) => {
            const updated = [...prev];

            updated[index] = {
                file,
                preview,
                url: "",
                isNew: true,
            };
            return updated;
        });
    };

    const removeImage = (index) => {
        setImageSlots((prev) => {
            const updated = [...prev];

            if (updated[index]?.url && !updated[index].isNew) {
                setDeletedImages((old) => [
                    ...old,
                    updated[index].url,
                ]);
            }
            updated[index] = createEmptySlot();
            return updated;
        });
    };
    // 
    const handleSubmit = async () => {

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const form = new FormData();

            form.append("name", formData.name);
            form.append("brand", formData.brand);
            form.append("category", formData.category);
            form.append("gender", formData.gender);
            form.append("price", formData.price);
            form.append("discount", formData.discount);
            form.append("stock", formData.stock);
            form.append("description", formData.description);
            form.append("featured", formData.featured);

            imageSlots.forEach((slot) => {
                if (slot?.isNew && slot.file) {
                    form.append("images", slot.file);
                }
            });

            deletedImages.forEach((img) => {
                form.append("deletedImages", img);
            });

            if (product) {
                await dispatch(
                    updateProductById({
                        id: product._id,
                        productData: form,
                        token: user.token,
                    })
                );
            } else {
                await dispatch(
                    addProduct({
                        productData: form,
                        token: user.token,
                    })
                );
            }

            await dispatch(fetchProducts());

            resetDialog();
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    }
    // 
    const resetDialog = () => {
        setDeletedImages([]);

        if (product) {
            const slots = emptySlots();

            product.images?.forEach((img, index) => {
                if (index < 5) {
                    slots[index] = {
                        url: img.url || img,
                        preview: "",
                        file: null,
                        isNew: false,
                    };
                }
            });

            setImageSlots(slots);

            setFormData({
                name: product.name || "",
                brand: product.brand || "",
                category: product.category || "",
                gender: product.gender || "",
                price: product.price || "",
                discount: product.discount || "",
                stock: product.stock || "",
                description: product.description || "",
                featured: product.featured || false,
            });
        } else {
            setImageSlots(emptySlots());

            setFormData({
                name: "",
                brand: "",
                category: "",
                gender: "",
                price: "",
                discount: "",
                stock: "",
                description: "",
                featured: false,
            });
        }
    };
    // 

    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose();
                resetDialog();
            }}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>
                {product
                    ? "Edit Product"
                    : "Add Product"}
            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            sx={{
                                minWidth: "110px",
                            }}
                            select
                            fullWidth
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <MenuItem value="men">men</MenuItem>
                            <MenuItem value="women">women</MenuItem>
                            <MenuItem value="unisex">unisex</MenuItem>
                            <MenuItem value="Luxury"> Luxury </MenuItem>
                            <MenuItem value="Smart"> Smart Watches</MenuItem>
                            <MenuItem value="Sports"> Sports Watches</MenuItem>
                            <MenuItem value="Digital"> Digital Watches</MenuItem>
                            <MenuItem value="Classic"> Classic Watches</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            sx={{
                                minWidth: "100px",
                            }}
                            select
                            fullWidth
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <MenuItem value="men">men</MenuItem>
                            <MenuItem value="women">women</MenuItem>
                            <MenuItem value="unisex">unisex</MenuItem>

                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Discount"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, }}>
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.featured}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            featured:
                                                e.target.checked,
                                        }))
                                    }
                                />
                            }
                            label="Featured Product"
                        />
                    </Grid>
                    {/* Image */}
                    <Grid size={{ xs: 12, }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            {imageSlots.map((slot, index) => (

                                <Box
                                    key={index}
                                    sx={{
                                        width: 110,
                                        height: 110,
                                        borderRadius: 2,
                                        border: "2px dashed #ccc",
                                        overflow: "hidden",
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        bgcolor: "#fafafa",
                                    }}
                                >

                                    {slot?.url || slot?.preview ? (

                                        <>
                                            <img
                                                src={slot?.preview || slot?.url}
                                                alt=""
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />

                                            <IconButton
                                                size="small"
                                                onClick={() => removeImage(index)}
                                                sx={{
                                                    position: "absolute",
                                                    top: 6,
                                                    right: 8,
                                                    bgcolor: "rgba(0,0,0,.6)",
                                                    color: "#fff",
                                                    width: 24,
                                                    height: 24,

                                                    "&:hover": {
                                                        bgcolor: "error.main",
                                                    },
                                                }}
                                            >
                                                <CloseIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </>

                                    ) : (

                                        <Button
                                            component="label"
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                minWidth: 0,
                                                fontSize: 30,
                                                backgroundColor: "#e7e5e5",
                                            }}
                                        >
                                            +
                                            <input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleImageChange(
                                                        index,
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                        </Button>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    {/* ######## Image */}
                </Grid>
            </DialogContent>

            <DialogActions>

                <Button
                    onClick={() => {
                        resetDialog();
                        onClose();
                    }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? product
                            ? "Updating..."
                            : "Adding..."
                        : product
                            ? "Update Product"
                            : "Add Product"}
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ProductDialog;