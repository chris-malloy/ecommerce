const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config/config');
const connection = mysql.createConnection(config);

router.post('/register',(req,res,next)=>{
  res.json(req.body);
})

module.exports = router;
