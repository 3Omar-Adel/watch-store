import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function ProductGallery({ images = [] }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [dragStart, setDragStart] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    if (!images.length) return null;

    const getImage = (image) => image?.url || image;

    const nextImage = () => {
        setSelectedImage((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setSelectedImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    // =========================
    // Touch / Mouse Swipe
    // =========================

    const handlePointerDown = (e) => {
        setDragStart(e.clientX);
        setIsDragging(true);
    };

    const handlePointerUp = (e) => {
        if (dragStart === null) return;

        const distance = e.clientX - dragStart;

        if (Math.abs(distance) > 50) {
            if (distance < 0) {
                nextImage();
            } else {
                prevImage();
            }
        }

        setDragStart(null);
        setIsDragging(false);
    };

    const handlePointerCancel = () => {
        setDragStart(null);
        setIsDragging(false);
    };

    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                // مهم للـ touch
                touchAction: "pan-y",
            }}
        >
            {/* =========================
                Thumbnails
            ========================= */}

            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },

                    flexDirection: "column",
                    gap: 1.2,

                    width: 72,
                    flexShrink: 0,

                    mr: 1.5,
                }}
            >
                {images.map((image, index) => (
                    <Box
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        sx={{
                            width: 64,
                            height: 64,

                            borderRadius: "12px",
                            overflow: "hidden",

                            cursor: "pointer",

                            backgroundColor: "#fafafa",

                            border:
                                selectedImage === index
                                    ? "2px solid #C6A769"
                                    : "1px solid #e8e8e8",

                            boxShadow:
                                selectedImage === index
                                    ? "0 5px 16px rgba(198,167,105,.18)"
                                    : "0 2px 8px rgba(0,0,0,.04)",

                            transition:
                                "transform .25s ease, box-shadow .25s ease, border .25s ease",

                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow:
                                    "0 6px 18px rgba(0,0,0,.09)",
                            },

                            "& img": {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            },
                        }}
                    >
                        <img
                            src={getImage(image)}
                            alt={`Product thumbnail ${index + 1}`}
                        />
                    </Box>
                ))}
            </Box>

            {/* =========================
                Main Gallery
            ========================= */}

            <Box
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                onPointerLeave={handlePointerCancel}
                sx={{
                    position: "relative",

                    width: {
                        xs: "100%",
                        sm: 430,
                        md: 390,
                    },

                    height: {
                        xs: 350,
                        sm: 430,
                        md: 440,
                    },

                    borderRadius: {
                        xs: "12px",
                        md: "16px",
                    },

                    overflow: "hidden",

                    background:
                        "linear-gradient(145deg, #ffffff, #fafafa)",

                    border: "1px solid #f0f0f0",

                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.07)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    userSelect: "none",

                    cursor: isDragging
                        ? "grabbing"
                        : "grab",

                    touchAction: "pan-y",

                    "& img": {
                        width: "100%",
                        height: "100%",

                        objectFit: "contain",

                        // تقليل المساحة البيضاء حوالين المنتج
                        transform: "scale(1.04)",

                        pointerEvents: "none",

                        animation:
                            "productImageIn .4s ease",

                        "@keyframes productImageIn": {
                            from: {
                                opacity: 0,
                                transform: "scale(.97)",
                            },
                            to: {
                                opacity: 1,
                                transform: "scale(1.04)",
                            },
                        },
                    },
                }}
            >
                <img
                    key={selectedImage}
                    src={getImage(images[selectedImage])}
                    alt="Product"
                    draggable={false}
                />

                {/* =========================
                    Left Arrow
                ========================= */}

                {images.length > 1 && (
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                        sx={{
                            position: "absolute",
                            left: 12,
                            top: "50%",
                            transform: "translateY(-50%)",

                            width: 38,
                            height: 38,

                            backgroundColor:
                                "rgba(255,255,255,.88)",

                            border:
                                "1px solid rgba(0,0,0,.06)",

                            boxShadow:
                                "0 4px 14px rgba(0,0,0,.08)",

                            opacity: {
                                xs: 1,
                                md: 0,
                            },

                            transition: "all .25s ease",

                            ".MuiBox-root:hover &": {
                                opacity: 1,
                            },

                            "&:hover": {
                                backgroundColor: "#fff",
                                transform:
                                    "translateY(-50%) scale(1.05)",
                            },

                            "& svg": {
                                fontSize: 22,
                                color: "#444",
                            },
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                )}

                {/* =========================
                    Right Arrow
                ========================= */}

                {images.length > 1 && (
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        sx={{
                            position: "absolute",
                            right: 12,
                            top: "50%",
                            transform: "translateY(-50%)",

                            width: 38,
                            height: 38,

                            backgroundColor:
                                "rgba(255,255,255,.88)",

                            border:
                                "1px solid rgba(0,0,0,.06)",

                            boxShadow:
                                "0 4px 14px rgba(0,0,0,.08)",

                            opacity: {
                                xs: 1,
                                md: 0,
                            },

                            transition: "all .25s ease",

                            ".MuiBox-root:hover &": {
                                opacity: 1,
                            },

                            "&:hover": {
                                backgroundColor: "#fff",
                                transform:
                                    "translateY(-50%) scale(1.05)",
                            },

                            "& svg": {
                                fontSize: 22,
                                color: "#444",
                            },
                        }}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                )}
            </Box>

            {/* =========================
                Mobile Dots
            ========================= */}

            {images.length > 1 && (
                <Box
                    sx={{
                        display: {
                            xs: "flex",
                            md: "none",
                        },

                        position: "absolute",

                        bottom: 12,
                        left: "50%",

                        transform:
                            "translateX(-50%)",

                        gap: 0.7,

                        alignItems: "center",

                        padding: "6px 10px",

                        borderRadius: "20px",

                        backgroundColor:
                            "rgba(255,255,255,.82)",

                        backdropFilter:
                            "blur(8px)",

                        boxShadow:
                            "0 4px 15px rgba(0,0,0,.08)",
                    }}
                >
                    {images.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() =>
                                setSelectedImage(index)
                            }
                            sx={{
                                width:
                                    selectedImage === index
                                        ? 20
                                        : 6,

                                height: 6,

                                borderRadius: 10,

                                cursor: "pointer",

                                backgroundColor:
                                    selectedImage === index
                                        ? "#C6A769"
                                        : "#d0d0d0",

                                transition:
                                    "all .3s ease",
                            }}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default ProductGallery;
