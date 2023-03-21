const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const assetsRouter = require ("./routes/assetsRoutes");
const employeesRouter = require ("./routes/employeesRoutes");


const app = express();
const port = process.env.API_PORT || 3000;


app.use(morgan("dev"));
app.use(express.json({limit:"50mb"}));

// end point inicial 
app.use("/api/assets", assetsRouter); 
app.use("/api/employees", employeesRouter); 

app.listen(port, ()=>{
    console.log(`SERVER CORRIENDO EN PUERTO ${port}`)
})

