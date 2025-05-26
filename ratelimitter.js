const express = require('express');
const app = express();

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 5000)


app.use(function(req, res, next){
const user_id = req.headers["user-id"];

if (!user_id) {
  return res.status(400).send("Missing user-id header");
}
if(numberOfRequestsForUser[user_id]){

  numberOfRequestsForUser[user_id] = numberOfRequestsForUser[user_id] + 1;

  if(numberOfRequestsForUser[user_id] > 5){
    return res.status(404).send("Server block you")
  }else{
    next();
  }
}else{
  numberOfRequestsForUser[user_id] = 1;
  next();
 }

  console.log(numberOfRequestsForUser);

})
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

// module.exports = app;

app.listen(3000,()=>console.log("server started"));

