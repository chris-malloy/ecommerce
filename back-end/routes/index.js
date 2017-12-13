const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config/config');
const connection = mysql.createConnection(config);
connection.connect();

// post route for user registration
router.post('/register', (req, res, next) => {
    const userData = req.body;
    const checkEmail = new Promise((resolve, reject) => {
        console.log(checkEmail)
        const checkEmailQuery = `SELECT * FROM users WHERE email = ?;`;
        console.log(checkEmailQuery)
        connetion.query(checkEmailQuery, [userData.email], (error, results) => {
            console.log('query ran');
            if (error) {
                throw error;
            } else if (results.length > 0) {
                reject({
                    msg: "userExists",
                })
            } else {
                // then will run
                resolve();
            }
        });
    })
    checkEmail.then(
        () => {
            console.log("User is not in the db.")
            res.json({
                msg: "user does not exist",
            })
        }
    ).catch(
        (error) => {
            res.json(error);
        }
    )
})

module.exports = router;