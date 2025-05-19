
const express = require("express");
const app = express();
const fs = require("fs");
app.get('/files', function(req,res){

    fs.readdir('./files', function(err,files){
    if(err){
        return res.status(500).json({error: "File not found"});
    }
    res.status(200).json(files);

})
})

app.get('/files/:filename', function(req,res){
const filePath =  "./files/" + req.params.filename;
fs.readFile(filePath,'UTF-8',function(err,data){
    if(err){
       return res.status(404).send("file not found");     
    }
    res.status(200).send(data);
  }) 
})

app.listen(3000);