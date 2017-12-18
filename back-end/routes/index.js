var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var stripe = require('stripe')(config.stripeKey);
var connection = mysql.createConnection(config.db);
connection.connect();
var bcrypt = require('bcrypt-nodejs');
var randToken = require('rand-token');

// dev login
router.post('/fakelogin', (req, res, next) => {
    const getFirstUser = `SELECT * from users limit 1;`;
    connection.query(getFirstUser, (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
        res.json({
            msg: "loginSuccess",
            token: results[0].token,
            userName: results[0].email
        });
    })
});

// post route for user login 
router.post('/login', (req, res, next) => {
    // console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const checkLoginQuery = `SELECT * FROM users 
		INNER JOIN customers ON users.cid = customers.customerNumber
		WHERE users.email = ?`;
    connection.query(checkLoginQuery, [email], (error, results) => {
        // console.log(results)
        if (error) {
            throw error; // dev only
        }
        // check for email
        if (results.length === 0) {
            res.json({
                msg: "Email not found.",
            })
        } else {
            // email valid, check for password
            const checkHash = bcrypt.compareSync(password, results[0].password)
            // console.log(checkHash, password)
            const name = results[0].customerName;
            if (checkHash) {
                const newToken = randToken.uid(60);
                // query to add later for token experiation comparison
                // , token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR;
                const updateToken = `UPDATE users SET token = ?
					WHERE email = ?;`;
                connection.query(updateToken, [newToken, email], (error, results) => {
                    // console.log(results);
                    if (error) {
                        throw error; // dev only
                    } else {
                        res.json({
                            msg: "loginSuccess",
                            token: newToken,
                            userName: name,
                        })
                    }
                })
            } else {
                // incorrect password
                res.json({
                    msg: "wrongPassword",
                })
            }
        }
    })
})

// post route for user registration
router.post('/register', (req, res, next) => {
    const userData = req.body;
    // console.log(userData)
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
            // console.log("User is not in the db.")
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
                // console.log(userData.password);
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
                            userName: userData.userName,
                            msg: "registerSuccess",
                        })
                    }
                })
            });
        }
    ).catch(
        (error) => {
            // console.log(error);
            res.json(error);
        }
    )
})

router.get('/productLines/get', (req, res, next) => {
    const selectQuery = `SELECT * FROM productlines;`;
    connection.query(selectQuery, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    })
});

router.get('/productLines/:productLine/get', (req, res, next) => {
    const pl = req.params.productLine
    var plQuery = `SELECT * FROM productlines
        INNER JOIN products ON productlines.productLine = products.productLine
		WHERE productlines.productline = ?;`;
    connection.query(plQuery, [pl], (error, results) => {
        if (error) {
            throw error
        } else {
            res.json(results);
        }
    })
})

router.post('/getCart',(req,res,next)=>{
    const userToken = req.body.token;
    const getUidQuery = `SELECT id from users WHERE token = ?;`;
    connection.query(getUidQuery, [userToken], (error, results) => {
        if (error) {
            throw error; //dev only
        } else if (results.length === 0) {
            // user not logged in
            res.json({
                msg: "badToken",
            })
        } else {
            const uid = results[0].id;
            const getCartTotals = `SELECT SUM(buyPrice) AS totalPrice, count(buyPrice) AS totalItems 
                    FROM cart
                    INNER JOIN products ON products.productCode = cart.productCode
                    WHERE cart.uid = ?;`;
            connection.query(getCartTotals, [uid], (error, cartResults) => {
                if (error) {
                    throw error; //dev only
                } else {
                    // res.json(cartResults);
                    const getCartProducts = `SELECT * FROM cart
                        INNER JOIN products on products.productCode = cart.productCode
                        WHERE uid = ?;`;
                    connection.query(getCartProducts,[uid],(error,cartContents)=>{
                        if(error){
                            throw error; //dev only
                        } else {
                            var finalCart = cartResults[0];
                            finalCart.products = cartContents;  
                            // console.log(finalCart)
                            res.json(finalCart);
                        }
                    })
                }
            })
        }
    })
})

router.post('/updateCart', (req, res, next)=>{
    // console.log("update cart hit")
    const productCode = req.body.productCode;
    const userToken = req.body.userToken;
    const getUidQuery = `SELECT id from users WHERE token = ?;`;
    connection.query(getUidQuery,[userToken],(error,results)=>{
        if(error){
            throw error; //dev only
        } else if(results.length === 0){
            // user not logged in
            res.json({
                msg: "badToken",
            })
        } else {
            // user logged in
            // get the user's id for the last query
            const uid = results[0].id;
            const addToCartQuery = `INSERT into cart (uid, productCode)
                VALUES (?,?);`;
            connection.query(addToCartQuery,[uid,productCode],(error,results)=>{
                if(error){
                    throw error;
                } else {
                    // insert worked
                    const getCartTotals = `SELECT SUM(buyPrice) AS totalPrice, count(buyPrice) AS totalItems FROM cart
                        INNER JOIN products ON products.productCode = cart.productCode
                        WHERE cart.uid = ?;`;
                    connection.query(getCartTotals,[uid],(error,cartResults)=>{
                        if(error){
                            throw error; //dev only
                        } else {
                            var finalCart = cartResults[0];
                            finalCart.products = []
                            res.json(finalCart);
                        }
                    })
                }
            });
        }
    })
})

router.post('/stripe', (req, res, next) => {
    console.log("stripe route")
    const userToken = req.body.userToken;
    console.log(userToken)
    const stripeToken = req.body.stripeToken;
    const amount = req.body.amount;
    stripe.charges.create({
        amount: amount,
        currency: 'usd',
        source: stripeToken,
        description: "Charges for classicmodels"
    },
        (error, charge) => {
            if (error) {
                res.json({
                    msg: error
                })
            } else {
                const getUserQuery = `SELECT MAX(users.id) as id, MAX(users.cId) as cId,MAX(cart.productCode) as productCode,MAX(products.buyPrice) as buyPrice, COUNT(cart.productCode) as quantity FROM users 
                    INNER JOIN cart ON users.id = cart.uid
                    INNER JOIN products ON cart.productCode = products.productCode
                    WHERE token = ?
                    GROUP BY products.productCode;`;
                // console.log(userToken)
                // console.log(getUserQuery);
                connection.query(getUserQuery, [userToken], (error2, results2) => {
                    // console.log("==========================")
                    // console.log(results2)
                    // console.log("==========================")
                    const customerId = results2[0].cid;
                    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                    // console.log(customerId)
                    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                    const insertIntoOrders = `INSERT INTO orders
                        (orderNumber,orderDate,requiredDate,shippedDate,comments,status,customerNumber)
                        VALUES
                        (?,NOW(),NOW(),NOW(),'Website Order','Paid','524');`;
                    connection.query(insertIntoOrders, [customerId], (error3, results3) => {
                        // console.log(results3)
                        const newOrderNumber = results3.insertId;
                        var orderDetailPromises = [];
                        results2.map((cartRow) => {
                            var insertOrderDetail = `INSERT INTO orderdetails
								(orderNumber,productCode,quantityOrdered,priceEach,orderLineNumber)
								VALUES
								(?,?,?,?,1)`
                            const aPromise = new Promise((resolve, reject) => {
                                connection.query(insertOrderDetail, [newOrderNumber, cartRow.productCode, cartRow.quantity, cartRow.buyPrice], (error4, results4) => {
                                    // another row finished.
                                    if (error4) {
                                        reject(error4)
                                    } else {
                                        resolve(results4)
                                    }
                                })
                            })
                            orderDetailPromises.push(aPromise);
                        })
                        Promise.all(orderDetailPromises).then((finalValues) => {
                            // console.log("All promises finished")
                            // console.log(finalValues)
                            const deleteQuery = `
								DELETE FROM cart WHERE uid = ${results2[0].id}
							`
                            connection.query(deleteQuery, (error5, results5) => {
                                res.json({
                                    msg: 'paymentSuccess'
                                })
                            })
                        });

                    })
                });

            }
        });
})

module.exports = router;

// TODO
// Add other data points to insertIntoCust query