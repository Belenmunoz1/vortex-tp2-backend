const employeesRouter = require("express").Router();

const{getAllEmployees,getEmployeeById,newEmployee,updateEmployee,deleteEmployee} = require("../controllers/employeesController");

//declaracion de las rutas de employees
employeesRouter.get("/", getAllEmployees);
employeesRouter.get("/:employee_id", getEmployeeById);
employeesRouter.post("/new", newEmployee);
employeesRouter.put("/update/:employee_id", updateEmployee);
employeesRouter.delete("/delete/:employee_id", deleteEmployee);




module.exports=employeesRouter;