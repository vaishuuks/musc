const express=require("express");
const listenerReview=require("./reviewSchema");
const mongoose=require("mongoose");

const listeneraddReview = (req, res) => {
    console.log(req.body);
    //  console.log(req.file);
      let Reviews = new listenerReview({
        feedback: req.body.feedback,
      firstname: req.body.firstname,
        listenerid: req.body.listenerid,
        podcastid: req.body.podcastid,
        creatorid: req.body.creatorid,
        podcastname: req.body.podcastname,
      });
      Reviews
        .save()
        .then((result) => {
          res.json({
            status: 200,
            msg: "Thank you",
            data:result
          });
        })
        .catch((err) => {
          console.log(err)
          if (err.code == 11000) {
            res.json({
              status: 409,
              msg: "Already Given",
            });
          } else {
            res.json({
              status: 500,
              msg: "submit faild",
            });
          }
        });
    };

    const getreviewodpodcast = async (req, res) => {
        // console.log(req.body);
        //  console.log(req.file);
        var data = await  listenerReview.find({
          podcastid: req.body.id,
        })
        res.json({
          status: 200,
          data:data
        });
        };
  
        const getCreatorReview = async (req, res) => {
          console.log(req.body.id);
          //  console.log(req.file);
          var data = await  listenerReview.find({
            creatorid: req.body.id,
          })
          res.json({
            status: 200,
            data:data
          });
          };


    module.exports={listeneraddReview,getreviewodpodcast,getCreatorReview}