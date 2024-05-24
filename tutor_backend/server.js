const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from Express.js server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const db =mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tutor_db"
})

app.post('/registeruser', (req,res)=>{
  const sql = "INSERT INTO users (`user_username`,`user_fullname`,`user_password`,`user_email`,`user_phonenum`) VALUES (?,?,?,?,?)";
  const values=[
    req.body.user_username,
    req.body.user_fullname,
    req.body.user_password,
    req.body.user_email,
    req.body.user_phonenum,
  ]
  db.query(sql, values, (err,data)=>{
    if (err){
      return res.json("Error posting data");
    }
    return res.json(data);
  })
})

app.post('/loginuser', (req,res)=>{
  const sql = "SELECT * FROM users WHERE `user_username`= ? AND `user_password` = ?";
  db.query(sql, [req.body.user_username, req.body.user_password], (err,data)=>{
    if (err){
      return res.json("Error posting data");
    }
    if(data.length > 0){
      return res.json("Success");
    }
    else{
      return res.json("Failed");
    }
    
  })
})

app.post('/registereducator', (req, res) => {
  const sql = "INSERT INTO educators (educator_username, educator_fullname, educator_password, subjects_taught, educator_email, educator_phonenum) VALUES (?, ?, ?, ?, ?, ?)";
  
  const values = [
      req.body.educator_username,
      req.body.educator_fullname,
      req.body.educator_password,
      JSON.stringify(req.body.subjects_taught), // Convert array to JSON string
      req.body.educator_email,
      req.body.educator_phonenum
  ];

  db.query(sql, values, (err, data) => {
      if (err) {
          return res.json("Error posting data");
      }
      return res.json(data);
  });
});
  
app.post('/logineducator', (req,res)=>{
  const sql = "SELECT * FROM educators WHERE `educator_username`= ? AND `educator_password` = ?";
  db.query(sql, [req.body.educator_username, req.body.educator_password], (err,data)=>{
    if (err){
      return res.json("Error posting data");
    }
    if(data.length > 0){
      return res.json("Success");
    }
    else{
      return res.json("Failed");
    }
    
  })
})

app.listen(8081,()=>{
  console.log("listening");
})
