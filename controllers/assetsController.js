const assetsModel = require ("../models/assetsModel")
const employeesModel = require ("../models/employeesModel")

const handleHttpError = require ("../handleHttpError")

const getAllAssets = async (req, res) => {

  try {
    const assets = await assetsModel.getAllAssetsModel();
    res.json({ data: assets });
  } catch (error) {
    const CustomError = new handleHttpError("all assets not found",500);
    res.json({
      errorMessage: CustomError.message,
      code: CustomError.errorCode,
    });
  }
};

const getAssetsById= async  (req,res) => {
   try {
      const {assets_id} = req.params;
      const assets = await assetsModel.getAssetsByIdModel(assets_id);
      if (assets == 0) {return res.status(404).json({ message: "the assetsById doesnt exist" });
      }
  
      res.status(200).json({ data: assets });
    } catch (error) {
      const CustomError = new handleHttpError("an error happen , cant found assetsById.",500);
      res.json({
        errorMessage: CustomError.message,
        code: CustomError.errorCode,
      });
    }
};
const getAssetsByEmployeeId= async (req, res) => {
   try {
     const {employee_id} = req.params;
     const result = await assetsModel.getAssetsByEmployeeId(employee_id);
     if (result == 0) {return res.status(404).json({ message: "the employee doesnt exist" });
     }
 
     res.json({ data: result });
   } catch (error) {
     const CustomError = new handleHttpError("Assets by EmployeeId not found",500);
     res.json({
       errorMessage: CustomError.message,
       code: CustomError.errorCode,
     });
   }
 };
const newAssets= async(req,res) => {
   try {
      const values = {...req.body};
      const foundEmployee = await employeesModel.getEmployeeByIdModel(values.employee_id);
      res.status(201)
       if (!foundEmployee) {
         return res.status(404).json ({message: "the employee doesnt exist"});
       }
       const newAssets = await assetsModel.newAssetsModel(values);
       res.status(201).json ({data: newAssets})
   }catch (error) {
      const CustomError = new handleHttpError("an error happen , can't add new assets",500);
       res.json({
         errorMessage: CustomError.message,
         code: CustomError.errorCode,
       });
      
   }

};
const updateAssets= async (req,res) => {
   try {
      const {assets_id} = req.params;
      const foundAssets = await assetsModel.getAssetsByIdModel(assets_id);
      if (!foundAssets) {
         return res.status(404).json ({ message: "assets not found"});
      }

      const values= { ...req.body};
      const foundEmployee = await employeesModel.getEmployeeByIdModel( values.employee_id);
      if (!foundEmployee){
         return res.status(404).json ({ message:" the employee doesnt exist, cant upload"});
      }
      const updateAssets = await assetsModel.updateAssetsModel(foundAssets,values);
      res
      .status(200)
      .json ({message: "assets updated",updateAssets});
   }catch {
      const CustomError = new handleHttpError("an error happen , can't update assets",500);
       res.json({
         errorMessage: CustomError.message,
         code: CustomError.errorCode,
       });
      
   }
};
const deleteAssets=async (req,res) => {
   try {
      const {assets_id} = req.params
      await assetsModel.deleteAssetsModel(assets_id);
      res.status(200).json ({ message:`the assets ${assets_id} was deleted`});
   } catch{
      const CustomError = new handleHttpError("an error happen , can't delete assets",401);
       res.json({
         errorMessage: CustomError.message,
         code: CustomError.errorCode,
       });

   }

};

 module.exports = {
    getAllAssets : getAllAssets,
    getAssetsById : getAssetsById,
    getAssetsByEmployeeId : getAssetsByEmployeeId,
    newAssets : newAssets,
    updateAssets : updateAssets,
    deleteAssets : deleteAssets,
 }