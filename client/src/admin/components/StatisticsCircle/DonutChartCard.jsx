import {
    Box,
    Typography,
    Stack,
} from "@mui/material";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";

function DonutChartCard({
    title,
    total,
    data,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                p: 2,
                backgroundColor: "var(--bg-color)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                boxShadow: "var(--shadow)",
                transition: "var(--transition)",
            }}
        >

            {/* Donut */}

            <Box
                sx={{
                    width: {
                        xs: 190,
                        sm: 150,
                        md: 165,
                        lg: 180,
                    },
                    height: {
                        xs: 190,
                        sm: 150,
                        md: 165,
                        lg: 180,
                    },
                    position: "relative",
                }}
            >

                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius="58%"
                            outerRadius="82%"
                            stroke="none"
                        >
                            {data.map((item, index) => (
                                <Cell
                                    key={index}
                                    fill={item.color}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                            color: "var(--text)",
                        }}
                    >
                        {total}
                    </Typography>

                    <Typography
                        sx={{
                            color: "var(--text-secondary)",
                            fontSize: 14,
                        }}
                    >
                        Total
                    </Typography>
                </Box>
            </Box>

            {/* Info */}

            <Stack
                sx={{
                    justifyContent: "space-between",
                    height: 180,
                    gap: 1,
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        color: "var(--text)",
                        mb: 1,

                    }}
                >
                    {title}
                </Typography>

                {data.map((item) => (
                    <Stack
                        key={item.name}
                        direction="row"

                        sx={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        {/* Left Side */}
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    bgcolor: item.color,
                                    flexShrink: 0,
                                    mt: 20,
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "var(--text-secondary)",
                                    fontWeight: 500,
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Stack>

                        {/* Right Side */}
                        <Typography
                            sx={{
                                color: "var(--text)",
                                fontWeight: 700,
                                marginLeft: "30px"
                            }}
                        >
                            {item.value}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
}

export default DonutChartCard;