const express = require("express");
const cors = require("cors");
const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());


app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});


const collegeRoutes = require("./routes/colleges");
app.use("/api", collegeRoutes);


app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
