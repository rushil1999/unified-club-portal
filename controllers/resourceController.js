import Resource from "../models/resource";

export const getResource = async (req, res) => {
  const resourceId = req.params.id;
  try{
    const resource = await Resource.findById(resourceId).exec();
    if(resource){
      return res.status(200).json({
        success: true,
        data: resource,
      });
    }
    else{
      return res.status(401).json({
        errors: ['Entity Not Found']
      });
    }
  }
  catch(err){
    console.log('Catch',err.message);
    return res.status(500).json({
      errors: ['Internal Server Error']
    });
  }
}