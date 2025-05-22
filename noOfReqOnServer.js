

const express = require("express");
const app = express();
let noOfRequests = 0; 
function calculateRequest(req, res, next) {
    noOfRequests++;
    console.log(noOfRequests);
    next();
}
app.use(calculateRequest)
app.use(express.json())
app.post("/health",  function(req, res){
     console.log(req.body);
     res.json({
        msg:"hi there"
     })
     
})

app.get("/health",function(req,res){
res.json({
        msg: "this is get request"
    })
})

app.listen(3000);