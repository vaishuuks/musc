const express=require("express");
const mongoose=require("mongoose");
const subscriptions=require("./subscriptionSchema")


   
    const addsubscriber=async(req,res)=>{
      let subscription;
      
        let data = await subscriptions.find({
          listenerid:req.body.listenerid,
          creatorid:req.body.creatorid,
           podcastid: req.body.podcastid,
           paymentstatus: req.body.paymentstatus,
           
         });
      
        //  console.log(data, 'ppp',req.body.podcastid, req.body.listenerid)
         if (!data.length > 0) {
          subscription = await new subscriptions({
            listenerid:req.body.listenerid,
            creatorid:req.body.creatorid,
             podcastid: req.body.podcastid,
             date: new Date(),
             paymentstatus: req.body.paymentstatus,
             isactive:true
           });
           subscription
         .save()
         .then((result) => {
           res.json({
             status: 200,
             msg: "Podcast subscribed Succesfully",
             data:result
           });
         })
         .catch((err) => {
           if (err.code == 11000) {
             res.json({
               status: 409,
               msg: "already subscribed",
             });
           }
            else {
             console.log(err);
             res.json({
               status: 500,
               msg: "error",
             });
           }
         });
         } else {
          res.json({
            status: 400,
            msg: "Already subscribed",
            data:[]
          });
         }
      }
      
      const getsubscriberByListenerId=(req,res)=>{
        subscriptions.find({
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


        const allsubcribers=(req,res)=>{
            subscriptions.find()
            .populate('listenerid')
            .populate('creatorid')
            .populate('podcastid')
            .exec()
            .then(result=>{
              if(result.length>0){
              res.json({
                  status:200,
                  msg:"Data obtained successfully",
                  data:result
              })
            }else{
              res.json({
                status:200,
                msg:"No Data obtained "
            })
            }
          }).catch(err=>{
              res.json({
                  status:500,
                  msg:"Data not Inserted",
                  Error:err
              })
          })
        }


        const viewSubscriptionByCreatorId=(req,res)=>{
          subscriptions.find({creatorid:req.params.id})
          .populate('podcastid')
          .populate('listenerid').exec()
          .then(result=>{
        
           //  console.log(data);
            res.json({
                status:200,
                msg:"Data obtained successfully",
                data:result
            })
          
        }).catch(err=>{
          console.log(err);
            res.json({
                status:500,
                msg:"No Data obtained",
                Error:err
            })
        })
        }
       
       
          
      module.exports={addsubscriber,getsubscriberByListenerId,allsubcribers,viewSubscriptionByCreatorId}