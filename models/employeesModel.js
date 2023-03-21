const conexion = require("../config/db.config");
const handleHttpError = require("../handleHttpError");


const getAllEmployeesModel = async  () => {
    try {
    const rows = await conexion
    .query (" SELECT * FROM employees")
    .spread ((rows) => rows);
    return rows ;
   } catch (error) {
    const CustomError = new handleHttpError ("Error" , 404);
    return ({
        errorMessage : CustomError.message,
        code: CustomError.errorCode,
    });
   }
};

const getEmployeeByIdModel = async (employee_id) => {
   try {
    const rows = await conexion 
    .query("SELECT * FROM employees where employee_id = ?",[employee_id])
    .spread ((rows) =>rows);
    return rows.length >0 ?rows [0] : null;
   } catch (error){
     const CustomError = new handleHttpError ("error , 404");
     return ({
        errorMessage : CustomError.mesage ,
        code: CustomError.errorCode,
     });
   }
};


const newEmployeeModel= async (values) => {
    try {
  const {first_name , last_name, cuit, team_id, join_date, rol} = values;
  const result = await conexion
  .query ("INSERT INTO employees (first_name, last_name, cuit, team_id, join_date, rol) values (?,?,?,?,?,?)",
  [first_name, last_name, cuit, team_id, join_date, rol])
  .spread((result) => result);

  return result;
    } catch (error) {
        const CustomError = new handleHttpError ("error", 404);
        return ({
            errorMessage : CustomError.message,
            code: CustomError.errorCode,
        });
    }
};

const updateEmployeeModel = async (employee_id,employees) => {
    try {
    const rows = await conexion
    .query("UPDATE employees SET ? WHERE employee_id =?",[employees,employee_id])
    .spread((rows) =>rows);
    
    return rows;
    } catch (error) {
        const CustomError = new handleHttpError ("error", 404);
        return ({
            errorMessage : CustomError.message,
            code: CustomError.errorCode,
        });
    }
};

const deleteEmployeeModel = async (employee_id) => {
    try {
    const rows = await conexion
    .query("DELETE FROM employees WHERE employee_id = ?" , [employee_id])
    .spread((rows) =>rows);
    return rows.length > 0 ? rows [0] : [];
    }catch {
        const CustomError = new handleHttpError ("error", 404);
        return ({
            errorMessage : CustomError.message,
            code: CustomError.errorCode,
        });
    }
};

module.exports = {
    getAllEmployeesModel,
    getEmployeeByIdModel,
    newEmployeeModel,
    updateEmployeeModel,
    deleteEmployeeModel
};