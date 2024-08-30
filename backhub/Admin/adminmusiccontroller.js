const addmusic= require("./adminmusicschema");
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

const adminaddmusic =  (req, res) => {

    let addamusic = new addmusic({
        musictitle: req.body.musictitle,
        directorname: req.body.directorname,
        filmoralbum: req.body.filmoralbum,
        coverimage: req.files[0],
        audio: req.files[1],
        });
    addamusic
        .save()
        .then((response) => {
            res.json({
                status: 200,
                msg: "Music uploaded Succesfully",
                data: response
            });
        })
        .catch((err) => {
            if (err.code == 11000) {
                res.json({
                    status: 409,
                    msg: "already uploaded",
                });
            }
            else {
                console.log(err);
                res.json({
                    status: 500,
                    msg: " upload failed",
                });
            }
        });
}

const viewAllMusic = (req, res) => {

    addmusic.find({}).exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                })
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained "
                })
            }
        }).catch(err => {
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err
            })
        })

}

const deleteasong = (req, res) => {
    
addmusic.findByIdAndDelete({ _id: req.params.id }).exec()
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
      
module.exports = {
    multipleUpload,adminaddmusic,viewAllMusic,deleteasong
}