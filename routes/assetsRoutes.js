const assetsRouter = require("express").Router();

const{ getAllAssets,getAssetsById,getAssetsByEmployeeId,newAssets,updateAssets,deleteAssets} = require ("../controllers/assetsController")


// rutas de los assets

assetsRouter.get("/", getAllAssets);
assetsRouter.get("/:assets_id",getAssetsById);
assetsRouter.get("/employeeid/:employee_id",getAssetsByEmployeeId);
assetsRouter.post("/new",newAssets);
assetsRouter.put("/update/:assets_id",updateAssets);
assetsRouter.delete("/delete/:assets_id",deleteAssets);



module.exports=assetsRouter;