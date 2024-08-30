const express=require("express")
const wishlist=require('./wishlistSchema')


const addToWishlist = async (req, res)=>{
    var data = await wishlist.find({
      listenerid: req.body.listenerid,
      podcastid: req.body.podcastid,
    })
    // console.log(data)
    if (!data.length > 0) {
      let wishlistschema = await new wishlist({
        listenerid: req.body.listenerid,
        podcastid: req.body.podcastid,
      });
      wishlistschema.save()
        .then((result) => {
          res.json({
            status: 200,
            msg: "saved to wishlist",
            data:result
          });
        })
        .catch((err) => {
            res.json({
              status: 500,
              msg: "error",
            });
        });
    } else {
      res.json({
        status: 400,
        msg: "Already in wishlist",
      });
    }
    
  }

  const getWishlist=(req, res)=>{
  
    wishlist.find({
      listenerid: req.params.id
    })
    .populate('podcastid')
    .exec()
    .then(result=>{
    if(result!=null) {
      res.json({
        status:200,
        data:result})
    }
    else {
      res.json({
        status:500,
        msg:"No products Found"
      })
    }    
  })}

 
  module.exports={addToWishlist,getWishlist}