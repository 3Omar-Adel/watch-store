const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const dotenv = require("dotenv")
const connectDB = require("./config/db")
dotenv.config();
const app = express();
app.use(express.json());
connectDB();

const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("watch store API")
})

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)


app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})

