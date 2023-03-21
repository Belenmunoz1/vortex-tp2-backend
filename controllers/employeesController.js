const handleHttpError = require("../handleHttpError");
const employeesModel = require("../models/employeesModel");

const getAllEmployees = async (req, res) => {
   try {
     const employees = await employeesModel.getAllEmployeesModel();
     res.json({ data: employees });
   } catch (error) {
     const CustomError = new handleHttpError("employees not found", 500);
     res.json({
       errorMessage: CustomError.message,
       code: CustomError.errorCode,
     });
   }
 };

const getEmployeeById=async  (req,res) => {
   try {
      const  {employee_id}  = req.params;
      const employee = await employeesModel.getEmployeeByIdModel(employee_id);
      if (!employee) {return res.status(404).json({ message: " employee not found" });
   }
      res.status(200).json({ data: employee });
    } catch (error) {
       const CustomError = new handleHttpError("an error happen ,cant found employeeById- try later.",500);
      res.json({
        errorMessage: CustomError.message,
        code: CustomError.errorCode,
      });
    }
    
};
const newEmployee= async(req,res) => {
   try {
      const values = {...req.body};
      const newemployee = await employeesModel.newEmployeeModel(values);
      res.status(201)
      res.json({message: "new employee added :)", data :newemployee});
   }catch (error) {
      const CustomError = new handleHttpError("an error happen , can't add new employee",500);
       res.json({
         errorMessage: CustomError.message,
         code: CustomError.errorCode,
       });
      
   }

};

const updateEmployee= async (req,res) => {
   try {
      const {employee_id} = req.params;
      const foundEmployee = await employeesModel.getEmployeeByIdModel(employee_id);
      console.log(foundEmployee);
      if (foundEmployee==0) {
         return res.status(404).json ({ message: "employee doesnt exists , cant unpload "});
      }

      const values= { ...req.body};
      const updateEmployee = await employeesModel.updateEmployeeModel(values, foundEmployee);
      console.log(updateEmployee);
      res.status (200).json ({message: " employee updated",updateEmployee});
   }catch {
      const CustomError = new handleHttpError("an error happen , can't update employee",500);
       res.json({
         errorMessage: CustomError.message,
         code: CustomError.errorCode,
       });
      
   }
};
const deleteEmployee= async (req,res) => {
   try {
      const {employee_id} = req.params
      await employeesModel.deleteEmployeeModel(employee_id);
      res.status(200).json ({ message:`the employee was deleted`});
   } catch{
      const CustomError = new handleHttpError("an error happen , can't delete employee",401);
       res.json({
         errorMessage: CustomError.message,
         code: CustomError.errorCode,
       });

   }

};

 module.exports = {
    getAllEmployees,
    getEmployeeById,
    newEmployee,
    updateEmployee,
    deleteEmployee,
 };