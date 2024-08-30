const express = require('express')
const bodyparser=require("body-parser")
const db=require("./database");

const app = express()
const cors=require('cors')

const route=express.Router();

app.use(bodyparser.urlencoded({ extended: true}))
app.use( bodyparser.json())
app.use(express.static(`${__dirname}/uploads`));

app.use(cors())

const router=require('./route');
app.use('/',router)

app.listen(4000,()=>{

    console.log("server running suuesfully at 4000");
})