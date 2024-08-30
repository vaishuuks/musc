const creatorschema = require('./creatorschema')
const creatorregister=require('./creatorschema')
const subscriptionSchema=require('../subscription/subscriptionSchema')

const multer=require("multer")

const storage=multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage}).single('image')
console.log(upload);

const addcreatorreg=((req,res)=>

    {
        const creatorregs= new creatorregister({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            gender:req.body.gender,
            dob:req.body.dob,
            mobile: req.body.mobile,
            street: req.body.street,
            city: req.body.city,
            state:req.body.state,
            pincode: req.body.pincode,
            mobile: req.body.mobile,
            country: req.body.country,
            email:req.body.email,
            password:req.body.password,
            image: req.file,
            
        })
        creatorregs.save()
.then((result)=>
{
    console.log(result);

    res.json({
        status:200,
        msg:result
    })
})
.catch((err)=>
{
    console.log(err);

    res.json({
        status:500,
        msg:"useer not found"
    })
})
})

//view
const viewcreator=(req,res)=>{
    creatorregister.find()
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



const creatorlogin=((req,res)=>{
    let firstname=req.body.firstname
    let password=req.body.password
    
    creatorregister.findOne({firstname:firstname})
    .then((data)=>
    {
        if(password==data.password){
            res.json({
                status:200,
                msg:"Login Successfully",
                data:data
            })
        }
        else{
            res.json({
                status:500,
                msg:"Password incorrect"
            })
        }
    })
    .catch((err)=>{
        res.json({
            status:409,
            msg:"user not found"
        })
    })
})


const creatorforgetpassword=((req,res)=>{
    creatorregister.findOneAndUpdate({firstname:req.body.firstname},{password:req.body.password})
    .then((result)=>
    {
        if(result!=null)
            res.json({
        status:200,
    msg:"Updated Successfully"
})
else
    res.json({
        status:500,
        msg:"Password error"
    })
})
.catch((error)=>{

res.json({
    status:500,
    msg:"user not found"
})
})
})

const viewCreatorById=((req,res)=>{
  
    creatorregister.findById({_id:req.params.id}).exec()
    .then((result)=>{
  
      console.log(result);
      res.json({
          status:200,
          msg:"Data obtained successfully",
     result:result
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          err:err
      })
  })
  
  })
  
const editcreator=((req,res)=>
{
    creatorregister.findByIdAndUpdate({_id:req.params.id},{
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        gender:req.body.gender,
        dob:req.body.dob,
        mobile: req.body.mobile,
        street: req.body.street,
        city: req.body.city,
        state:req.body.state,
        pincode: req.body.pincode,
        mobile: req.body.mobile,
        country: req.body.country,
        email:req.body.email,
        password:req.body.password,
        image: req.file,
    })
    .then((result)=>{
        console.log(result)
        res.json({
            status:200,
            msg:result
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:404,
            msg:"Data not updated"
        })
    })
})


const deleteCreatorById = (req, res) => {
    creatorregister.findByIdAndDelete({ _id: req.params.id }).exec()
      .then(result => {
        // console.log(data);
        res.json({
          status: 200,
          msg: "Data removed successfully",
          result:result
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }

  const getsubscriberbycreatorid = (req, res) => {
    var data = [];
    var temp;
    subscriptionSchema.find({_id:req.params.id})
      .populate('listenerid')
      .populate('podcastid')
      .exec().then(result => {
        if (result != null) {
          for (var i in result) {
            temp = result[i].podcastid ?
              result[i].podcastid.creatorid.toString() : ''
            if (temp === req.body.id) {
              data.push(result[i]);
            }
          }
          res.json({
            status: 200,
            data: result
          })
        }
        else {
          res.json({
            status: 500,
            msg: "No subscriptions Found"
  
          })
        }
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "Data not Updated",
          Error: err
        })
      })
  }
  
  

module.exports={addcreatorreg,upload,viewcreator,creatorlogin,creatorforgetpassword,viewCreatorById,editcreator,deleteCreatorById,getsubscriberbycreatorid}