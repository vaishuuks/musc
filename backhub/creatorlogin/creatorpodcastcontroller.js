const creatorupload=require("./creatorpodcastschema")
// const creatorpodcastschema=require("./creatorpodcastschema")


const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multipleUpload = multer({ storage: storage }).array("files", 2);

console.log(multipleUpload);

const addcreatorupload=async(req,res)=>{

  let uploadsongs=new creatorupload({
    podcastname: req.body.podcastname,
    description: req.body.description,
    price: req.body.price,
    coverimage: req.files[0],
    audio: req.files[1],
    creatorid: req.body.creatorid,
  })
  uploadsongs.save()
  .then((result) => {
    console.log(result);
    res.json({
      
      status: 200,
      msg: result,
    })
  })
  .catch((err) => {
    console.log(err);
    res.json({
      status :400,
      msg:err
      })
    }
  )}

  const viewcreatorsong=(req,res)=>{
    creatorupload.find()
    .then((result)=>{
        console.log(result);
      res.json({
        status:200,
        msg:result,})  
    })
    .catch((err)=>{
        console.log(err)
        res.json({
            status:500,
            msg:"err"
        })
    })
}

const viewuploadsongById = ((req, res) => {
  creatorupload.findById({_id:req.body.id}) 
    .then((result) => {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data:result
        })
        })
         .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Error retrieving data"
      })
    })
})


const getAllPodcastByCreator = (req, res) => {
  creatorupload.find({ creatorid: req.params.id })
    .then((result) => {
      // console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

module.exports={addcreatorupload,multipleUpload,viewcreatorsong,viewuploadsongById,getAllPodcastByCreator}