import { useEffect, useMemo, useState } from "react";

import {
    Box,
    Button,
    Popover,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Divider,
    Stack,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DoneIcon from "@mui/icons-material/Done";


function Filter({
    products = [],
    onApply,
    initialFilters,
}) {

    const categories = useMemo(() => {
        return [
            ...new Set(
                products
                    .map((product) => product.category)
                    .filter(Boolean)
            ),
        ].sort();
    }, [products]);

    const brands = useMemo(() => {
        return [
            ...new Set(
                products
                    .map((product) => product.brand)
                    .filter(Boolean)
            ),
        ].sort();
    }, [products]);


    const genders = useMemo(() => {
        return [
            ...new Set(
                products
                    .map((product) => product.gender)
                    .filter(Boolean)
            ),
        ].sort();
    }, [products]);



    const maxProductPrice = useMemo(() => {

        if (!products.length) {
            return 10000;
        }

        const prices = products
            .map((product) => Number(product.price))
            .filter((price) => !Number.isNaN(price));

        return prices.length
            ? Math.max(...prices)
            : 10000;

    }, [products]);


    const [anchorEl, setAnchorEl] = useState(null);

    const [category, setCategory] = useState(
        initialFilters?.category || ""
    );

    const [brand, setBrand] = useState(
        initialFilters?.brand || ""
    );

    const [gender, setGender] = useState(
        initialFilters?.gender || ""
    );

    const [price, setPrice] = useState(
        initialFilters?.price || [0, maxProductPrice]
    );


    useEffect(() => {

        if (!initialFilters?.price) {
            setPrice([0, maxProductPrice]);
        }

    }, [maxProductPrice, initialFilters?.price]);



    const open = Boolean(anchorEl);


    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleReset = () => {

        const resetFilters = {
            category: "",
            brand: "",
            gender: "",
            price: [0, maxProductPrice],
        };

        setCategory("");
        setBrand("");
        setGender("");
        setPrice([0, maxProductPrice]);

        if (onApply) {
            onApply(resetFilters);
        }

        handleClose();
    };

    const handleApply = () => {

        const filters = {
            category,
            brand,
            gender,
            price,
        };

        if (onApply) {
            onApply(filters);
        }

        handleClose();
    };


    return (
        <>

            <Button
                variant="outlined"
                onClick={handleOpen}
                startIcon={<FilterListIcon />}
                sx={{
                    height: {
                        xs: 38,
                        sm: 42,
                        md: 48,
                    },

                    minWidth: {
                        xs: 120,
                        sm: 135,
                        md: 155,
                    },

                    px: {
                        xs: 1.5,
                        sm: 2,
                        md: 2.5,
                    },

                    borderRadius: "999px",

                    borderColor: "#3b3b3a",

                    color: "#20201f",

                    fontSize: {
                        xs: 12,
                        sm: 13,
                        md: 14,
                    },

                    fontWeight: 600,

                    textTransform: "none",

                    whiteSpace: "nowrap",

                    "& .MuiSvgIcon-root": {
                        fontSize: {
                            xs: 18,
                            md: 20,
                        },
                    },

                    "& .MuiButton-startIcon": {
                        marginRight: {
                            xs: "5px",
                            md: "7px",
                        },
                    },

                    "&:hover": {
                        background: "#C6A769",
                        color: "#fff",
                        borderColor: "#C6A769",
                    },
                }}
            >
                Filters
            </Button>


            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            borderRadius: "18px",
                            overflow: "hidden",
                            boxShadow:
                                "0 15px 45px rgba(0,0,0,0.15)",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs: "calc(100vw - 30px)",
                            sm: 340,
                        },
                        maxWidth: "calc(100vw - 30px)",
                        p: {
                            xs: 2,
                            sm: 3,
                        },
                    }}
                >


                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 18,
                                    sm: 20,
                                },

                                fontWeight: 700,

                                color: "#20201f",
                            }}
                        >
                            Filters
                        </Typography>

                        <Button
                            onClick={handleReset}
                            startIcon={<RestartAltIcon />}
                            sx={{
                                minWidth: "auto",

                                color: "#777",

                                fontSize: 12,

                                textTransform: "none",

                                "&:hover": {
                                    color: "#C6A769",
                                    background: "transparent",
                                },
                            }}
                        >
                            Reset
                        </Button>
                    </Stack>


                    <Divider sx={{ mb: 2.5 }} />

                    <FormControl
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                    >
                        <InputLabel>
                            Category
                        </InputLabel>

                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            sx={{
                                borderRadius: "10px",

                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                    borderColor: "#C6A769",
                                },
                            }}
                        >
                            <MenuItem value="">
                                All Categories
                            </MenuItem>

                            {categories.map((item) => (
                                <MenuItem
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                    >
                        <InputLabel>
                            Brand
                        </InputLabel>

                        <Select
                            value={brand}
                            label="Brand"
                            onChange={(e) =>
                                setBrand(e.target.value)
                            }
                            sx={{
                                borderRadius: "10px",

                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                    borderColor: "#C6A769",
                                },
                            }}
                        >
                            <MenuItem value="">
                                All Brands
                            </MenuItem>

                            {brands.map((item) => (
                                <MenuItem
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    {genders.length > 0 && (
                        <FormControl
                            fullWidth
                            size="small"
                            sx={{ mb: 2 }}
                        >
                            <InputLabel>
                                Gender
                            </InputLabel>

                            <Select
                                value={gender}
                                label="Gender"
                                onChange={(e) =>
                                    setGender(e.target.value)
                                }
                                sx={{
                                    borderRadius: "10px",

                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#C6A769",
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    All Genders
                                </MenuItem>

                                {genders.map((item) => (
                                    <MenuItem
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <Box sx={{ px: 1, mt: 2 }}>

                        <Stack
                            direction="row"
                            sx={{
                                justifyContent:"space-between",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                }}
                            >
                                Price
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: "#777",
                                }}
                            >
                                {price[0].toLocaleString()} -{" "}
                                {price[1].toLocaleString()}
                            </Typography>
                        </Stack>


                        <Slider
                            value={price}
                            onChange={(e, newValue) =>
                                setPrice(newValue)
                            }
                            valueLabelDisplay="auto"
                            min={0}
                            max={maxProductPrice}
                            step={100}
                            sx={{
                                color: "#C6A769",

                                "& .MuiSlider-thumb": {
                                    width: 18,
                                    height: 18,
                                },
                            }}
                        />

                    </Box>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        mt={2}
                    >
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleClose}
                            sx={{
                                height: 42,
                                borderRadius: "10px",
                                borderColor: "#ddd",
                                color: "#555",
                                textTransform: "none",
                                "&:hover": {
                                    borderColor: "#aaa",
                                    background: "#f7f7f7",
                                },
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleApply}
                            startIcon={<DoneIcon />}
                            sx={{
                                height: 42,
                                borderRadius: "10px",
                                background: "#C6A769",
                                color: "#fff",
                                textTransform: "none",
                                boxShadow: "none",
                                "&:hover": {
                                    background: "#ad8f50",

                                    boxShadow: "none",
                                },
                            }}
                        >
                            Apply
                        </Button>
                    </Stack>

                </Box>
            </Popover>
        </>
    );
}

export default Filter;