const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
    {
        username: "tufail@gmail.com",
        password: "123",
        name: "Tufail Ahmed"
    },
    {
        username: "ashis@gmail.com",
        password: "123321",
        name: "Ashis Dutta"
    },
    {
        username: "dharma@gmail.com",
        password: "123321",
        name: "Dharma Baro"
    }
]

function userExists(username, password){
  //write logic to return true or false if this user exists in All_USERS array
  let userExists = false;  
  ALL_USERS.forEach(user => {
    
            if(user.username === username && user.password === password ){
                userExists = true;
            }
         
    });
    return userExists;
}




app.post("/signin", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        return res.status(403).json({
            msg:" User doesnt exist ",
        });
    }
    var token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token,
    });
    
});


app.get("/users", function(req, res){
    const token = req.headers.authorization;
    let username ;
    try{
        const decoded = jwt.verify(token, jwtPassword);
         username = decoded.username;
    }catch(err){
        return res.status(403).json({
            msg:"invalid token",
        })
    }

    res.json({
        users: ALL_USERS.filter((value)=>{
            if(!(value.username == username)){
                return false
            }else{
                return true
            }
        })
    })
})

 
app.listen(3000);