const express = require("express")
const app = express();



function userMiddleware(req,res,next){
       const userid = req.headers.userid;
       const password = req.headers.password;
       const kidneyid = req.query.kidneyid;
        if(userid != "tufail" || password != "pass"){
        res.status(400).json({"msg":"something went down"})
         return;
    }else{
        next();
    }
}

function kidneyMiddleware(req, res, next){

    const userid = req.headers.userid;
    const password = req.headers.password;
    const kidneyid = req.query.kidneyid;
     if(kidneyid != 1 && kidneyid != 2){
      res.status(400).json({"msg":"something went down"})
        return
     }else{
        next();
     }
}




app.get('/health-checkup',userMiddleware, kidneyMiddleware, function(req, res){
    res.json({
        msg: "your health is is fine"
    })
})

app.get('/kidney-checkup',userMiddleware, kidneyMiddleware, function(req, res){
    res.json({
        msg: "Kidney is fine"
    })
})

app.get('/heart-checkup',userMiddleware, function(req, res){
    res.json({
        msg: "heart is fine"
    })
})



app.listen(3000,()=>(console.log("server is working fine ")))



