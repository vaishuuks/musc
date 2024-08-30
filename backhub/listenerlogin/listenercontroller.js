const { deleteCreatorById } = require('../creatorlogin/creatorcontroller')
const listenermodel = require('./listenermodel')
const listenerregister=require('./listenermodel')

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
const addlistenerreg=((req,res)=>
    
{
    const listenerregs= new listenerregister({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        dob:req.body.dob,
        gender:req.body.gender,
        street: req.body.street,
        mobile: req.body.mobile,
        email:req.body.email,
       password:req.body.password,
        country: req.body.country,
        image: req.file,
        city: req.body.city,
        pincode: req.body.pincode
        
    })
    //Save
    
    listenerregs.save()
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
    
//check email and password
const listenerlogin=((req,res)=>{
    let email=req.body.email
    let password=req.body.password
    
    listenerregister.findOne({email:email})
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


const viewlistener=(req,res)=>{
    listenerregister.find()
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
const viewlistenerdetail=((req,res)=>
{
   listenerregister.findById({_id:req.params.id}) 
   .then((result)=>{
    res.json({
       
        status:200,
        msg:"Data obtained successfully",
        result:result
    })
   })
   .catch((err)=>
{
    res.json({
        status:500,
         msg:"No Data obtained",
          err:err
    })
})
})

const listenerforgetpassword=((req,res)=>{
    listenerregister.findOneAndUpdate({email:req.body.email},{password:req.body.password})
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

//view listener by id
const viewListenerById=((req,res)=>{
  
    listenerregister.findById({_id:req.params.id}).exec()
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
  
  const listeneredit=((req,res)=>
    {
        listeneredit.findByIdAndUpdate({_id:req.params.id},{
            firstname:req.body.firstname,
        lastname:req.body.lastname,
        dob:req.body.dob,
        gender:req.body.gender,
        street: req.body.street,
        mobile: req.body.mobile,
        email:req.body.email,
       password:req.body.password,
        country: req.body.country,
        image: req.file,
        city: req.body.city,
        pincode: req.body.pincode
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
    
    const deletelistenerById = (req, res) => {
        listenerregister.findByIdAndDelete({ _id: req.params.id }).exec()
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

     




module.exports={addlistenerreg,upload,listenerlogin,viewlistenerdetail,listenerforgetpassword,viewlistener,viewListenerById,listeneredit,deletelistenerById}