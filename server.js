const express = require("express");
var cors = require('cors')
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/alumnis", require("./routes/alumniRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})