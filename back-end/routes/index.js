var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var connection = mysql.createConnection(config);
connection.connect();
var bcrypt = require('bcrypt-nodejs');
var randToken = require('rand-token');

// post route for user login 
router.post('/login', (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const checkLoginQuery = `SELECT * FROM users WHERE email = ?`;
    connection.query(checkLoginQuery, [email], (error, results) => {
        if (error) {
            throw error; // dev only
        }
        // check for email
        if (results.length === 0) {
            res.json({
                msg: "user does not exist",
            })
        } else {
            // email valid, check for password
            const checkHash = bcrypt.compareSync(password, results[0].password)
            if (checkHash) {

            } else {

            }
        }
    })
})

// post route for user registration
router.post('/register', (req, res, next) => {
    const userData = req.body;
    console.log(userData)
    const checkEmail = new Promise((resolve, reject) => {
        const checkEmailQuery = `SELECT * FROM users WHERE email = ?;`;
        connection.query(checkEmailQuery, [userData.email], (error, results) => {
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
            const insertIntoCust = `INSERT INTO customers
	(customerName, contactLastName, contactFirstName, addressLine1, addressLine2, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit)
		VALUES
	(?,?,?,?,?,?,?,?,?,?,?)`;
            const queryValues = [
                    userData.userName,
                    userData.lastName,
                    userData.firstName,
                    userData.addressLine1,
                    userData.addressLine2,
                    userData.city,
                    userData.state,
                    userData.postalCode,
                    userData.country,
                    1337,
                    100000
                ]
                // insert customer query
            connection.query(insertIntoCust, queryValues, (error, results) => {
                if (error) {
                    throw error;
                }
                // get the customer ID that was JUST inserted (results)
                const newID = results.insertId;
                // user token for db
                const token = randToken.uid(60);
                const hash = bcrypt.hashSync(userData.password);
                const insertUsers = `INSERT INTO USERS
		(cid,type,password,token,email)
			VALUES
		(?,?,?,?,?);`;
                // insert users query
                connection.query(insertUsers, [newID, 'customer', hash, token, userData.email], (error, results) => {
                    if (error) {
                        throw error; //Dev only
                    } else {
                        res.json({
                            token: token,
                            firstName: userData.firstName,
                            msg: "registerSuccess",
                        })
                    }
                })
            });
        }
    ).catch(
        (error) => {
            console.log(error);
            res.json(error);
        }
    )
})

module.exports = router;

// TODO
// Add other data points to insertIntoCust query,