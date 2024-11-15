const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

const {error, log} = require('console');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/images', express.static(path.join(__dirname, 'public/images'))); // Serve images directly

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// const db =  mysql.createConnection({ 
//     host:'127.0.0.1',
//     user :'admin',
//     password:'Rose@1234567',
//     database:'u124217916_product'
// })
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.message);
        return;
    }
    console.log('Database Successfully Connected...');
});

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Save images in the public/images directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save the original filename
    }
});

const upload = multer({storage: storage});

// User registration endpoint
app.post('/api/add', (req, res) => {
    const {user_id, password, location, gmail, ph_no} = req.body;
    const sql = 'INSERT INTO captains_users (user_id, password, location, gmail, ph_no) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [user_id, password, location, gmail, ph_no], (err, result) => {
        if (err) {
            return res.status(500).json({error: "errorrrrrrr"});
        }
        res.status(201).json({message: 'User Registered', id: result.insertId});
    });
});

// Vegetables upload endpoint
app.post('/api/vegetables', upload.single('image_url'), (req, res) => {
    const {shopid, name, unit, price, qty} = req.body;
    console.log(req.file); // Log uploaded file
    const image_url = req.file ? `/images/${req.file.filename}` : null; // Store the path

    const sql = 'INSERT INTO s2s_vegetables (shopid,name, image_url, unit, price, qty) VALUES (?, ?, ?, ?, ?,?)';
    db.query(sql, [shopid, name, image_url, unit, price, qty], (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        res.status(201).json({message: 'Vegetable Added', id: result.insertId});
    });
});

// Get all vegetables
app.get('/api/vegetables', (req, res) => {
    const sql = 'SELECT * FROM s2s_vegetables';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        return res.json(result);
    });
});
// Update fruit
app.put('/api/updateFruit/:id', (req, res) => {
    const {id} = req.params;
    const {name, image_url, unit, price, qty, shopid} = req.body;

    const sql = 'UPDATE s2s_fruits SET name = ?, image_url = ?, unit = ?, price = ?, qty = ?, shopid = ? WHERE id = ?';
    db.query(sql, [name, image_url, unit, price, qty, shopid, id], (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        return res.json({message: 'Fruit updated successfully!'});
    });
});

// Update vegetable
app.put('/api/updateVegetable/:id', (req, res) => {
    const {id} = req.params;
    const {name, image_url, unit, price, qty, shopid} = req.body;

    const sql = 'UPDATE s2s_vegetables SET name = ?, image_url = ?, unit = ?, price = ?, qty = ?, shopid = ? WHERE id = ?';
    db.query(sql, [name, image_url, unit, price, qty, shopid, id], (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        return res.json({message: 'Vegetable updated successfully!'});
    });
});


// Delete a fruit
app.delete('/api/deleteFruits/:id', (req, res) => {
    const productId = req.params.id;

    // SQL query to delete the product from the fruits table
    const sql = 'DELETE FROM s2s_fruits WHERE id = ?';

    db.query(sql, [productId], (error, results) => {
        if (error) {
            console.error('Error deleting fruit:', error);
            return res.status(500).json({message: 'Error deleting fruit'});
        }

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            return res.status(404).json({message: 'Fruit not found'});
        }

        res.status(200).json({message: 'Fruit deleted successfully'});
    });
});

// Delete a vegetable
app.delete('/api/deleteVegetables/:id', (req, res) => {
    const productId = req.params.id;

    // SQL query to delete the product from the vegetables table
    const sql = 'DELETE FROM s2s_vegetables WHERE id = ?';

    db.query(sql, [productId], (error, results) => {
        if (error) {
            console.error('Error deleting vegetable:', error);
            return res.status(500).json({message: 'Error deleting vegetable'});
        }

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            return res.status(404).json({message: 'Vegetable not found'});
        }

        res.status(200).json({message: 'Vegetable deleted successfully'});
    });
});


// Delete a fruit
app.delete('/api/deleteFruit/:id', (req, res) => {
    const productId = req.params.id;

    // SQL query to delete the product from the fruits table
    const sql = 'DELETE FROM s2s_fruits WHERE id = ?';

    db.query(sql, [productId], (error, results) => {
        if (error) {
            console.error('Error deleting fruit:', error);
            return res.status(500).json({message: 'Error deleting fruit'});
        }

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            return res.status(404).json({message: 'Fruit not found'});
        }

        res.status(200).json({message: 'Fruit deleted successfully'});
    });
});

// Delete a vegetable
app.delete('/api/deleteVegetable/:id', (req, res) => {
    const productId = req.params.id;

    // SQL query to delete the product from the vegetables table
    const sql = 'DELETE FROM s2s_vegetables WHERE id = ?';

    db.query(sql, [productId], (error, results) => {
        if (error) {
            console.error('Error deleting vegetable:', error);
            return res.status(500).json({message: 'Error deleting vegetable'});
        }

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            return res.status(404).json({message: 'Vegetable not found'});
        }

        res.status(200).json({message: 'Vegetable deleted successfully'});
    });
});


// Get vegetables by shopid using route parameter
app.get('/api/vegetables/:shopid', (req, res) => {
    const {shopid} = req.params; // Get shopid from the route parameter

    const sql = 'SELECT * FROM s2s_vegetables WHERE shopid = ?';
    db.query(sql, [shopid], (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'No vegetables found for this shop'});
        }
        return res.json(result);
    });
});

app.post('/api/fruits', upload.single('image_url'), (req, res) => {
    const {shopid, name, unit, price, qty} = req.body;
    console.log(req.file); // Log uploaded file
    const image_url = req.file ? `/images/${req.file.filename}` : null; // Store the path

    const sql = 'INSERT INTO s2s_fruits (shopid,name, image_url, unit, price, qty) VALUES (?, ?, ?, ?, ?,?)';
    db.query(sql, [shopid, name, image_url, unit, price, qty], (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        res.status(201).json({message: 'Fruits Added', id: result.insertId});
    });
});

// Get all fruits
app.get('/api/fruits', (req, res) => {
    const sql = 'SELECT * FROM s2s_fruits';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        return res.json(result);
    });
});

app.get('/api/products', (req, res) => {
    const {shopid} = req.query;

    // Check if shopid is provided
    if (!shopid) {
        return res.status(400).json({error: "Shop ID is required"});
    }

    // SQL queries for fruits and vegetables filtered by shopid
    const fruitsSql = 'SELECT * FROM s2s_fruits WHERE shopid = ?';
    const vegetablesSql = 'SELECT * FROM s2s_vegetables WHERE shopid = ?';
    const params = [shopid];

    // Execute both queries in parallel
    db.query(fruitsSql, params, (fruitsErr, fruitsResult) => {
        if (fruitsErr) {
            console.error('Error fetching fruits:', fruitsErr); // Log the error
            return res.status(500).json({error: 'Failed to fetch fruits', details: fruitsErr});
        }

        db.query(vegetablesSql, params, (vegetablesErr, vegetablesResult) => {
            if (vegetablesErr) {
                console.error('Error fetching vegetables:', vegetablesErr); // Log the error
                return res.status(500).json({error: 'Failed to fetch vegetables', details: vegetablesErr});
            }

            // Combine fruits and vegetables results, marking their types
            const combinedResult = [
                ...fruitsResult.map(item => ({...item, type: 'fruit'})),
                ...vegetablesResult.map(item => ({...item, type: 'vegetable'}))
            ];

            return res.json(combinedResult);
        });
    });
});

// // Get all fruits and vegetables, or filter by pincode
// app.get('/api/products', (req, res) => {
//     const { pincode } = req.query;

//     // SQL queries for fruits and vegetables with optional pincode filtering
//     const fruitsSql = pincode 
//         ? 'SELECT * FROM s2s_fruits WHERE pincode = ?' 
//         : 'SELECT * FROM s2s_fruits';
//     const vegetablesSql = pincode 
//         ? 'SELECT * FROM s2s_vegetables WHERE pincode = ?' 
//         : 'SELECT * FROM s2s_vegetables';

//     const params = pincode ? [pincode] : [];

//     // Execute both queries in parallel
//     db.query(fruitsSql, params, (fruitsErr, fruitsResult) => {
//         if (fruitsErr) {
//             return res.status(500).json({ error: fruitsErr });
//         }

//         db.query(vegetablesSql, params, (vegetablesErr, vegetablesResult) => {
//             if (vegetablesErr) {
//                 return res.status(500).json({ error: vegetablesErr });
//             }

//             // Combine fruits and vegetables results
//             const combinedResult = [
//                 ...fruitsResult.map(item => ({ ...item, type: 'fruit' })),
//                 ...vegetablesResult.map(item => ({ ...item, type: 'vegetable' }))
//             ];

//             return res.json(combinedResult);
//         });
//     });
// });


app.get('/api/fruits/:shopid', (req, res) => {
    const {shopid} = req.params; // Get shopid from the route parameter

    const sql = 'SELECT * FROM s2s_fruits WHERE shopid = ?';
    db.query(sql, [shopid], (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'No Fruitds found for this shop'});
        }
        return res.json(result);
    });
});

app.get('/api/bonus', (req, res) => {
    const sql = 'SELECT * FROM bonus';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({error: err})
        }
        return res.json(result)
    })
})


app.get('/api/orderDetails/:userid', (req, res) => {
    const {userid} = req.params;

    const sql = 'SELECT * FROM myOrder WHERE id = ?'; // Make sure this column exists
    db.query(sql, [userid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({error: 'Database error'});
        }

        if (result.length === 0) {
            return res.status(404).json([]); // Return an empty array if no orders found
        }

        return res.json(result); // Return the array of results
    });
});


//login page
app.post('/api/userLogin', (req, res) => {
    const {userid, password, usertype} = req.body;
    if (!userid || !password || !usertype) {
        return res.status(400).json({error: 'All fields are required'});
    }
    const sql = 'INSERT INTO login(userid, password, usertype) VALUES (?, ?, ?)';
    db.query(sql, [userid, password, usertype], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({message: 'User successfully registered'});
    });
});

//i want refferal id userid and refid
app.post('/api/refferalId', (req, res) => {
    const {userid, refid1} = req.body;
    if (!userid || !refid1) {
        return res.status(400).json({error: 'All fields are required'})
    }
    const sql = 'INSERT INTO refferal(userid,refid1) VALUES (?,?)';
    db.query(sql, [userid, refid1], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({message: 'user  successfully registered'})
    })
})

app.get('/api/referrals', (req, res) => {
    const sql = 'SELECT * FROM refferal';

    // Query the database to retrieve all data
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }

        // If no data is found, respond with a message
        if (result.length === 0) {
            return res.status(404).json({message: 'No referrals found'});
        }

        // Return the retrieved data
        res.status(200).json(result);
    });
});


//shop page
app.post('/api/shops', (req, res) => {
    const {shopid, shopname, shopaddress, shoppin, shopcontactnum, deliverytimefrom, deliverytimeto, userid} = req.body;
    const sql = 'INSERT INTO shops(shopid,shopname,shopaddress,shoppin,shopcontactnum,deliverytimefrom,deliverytimeto,userid) VALUES (?,?,?,?,?,?,?,?)';
    db.query(sql, [shopid, shopname, shopaddress, shoppin, shopcontactnum, deliverytimefrom, deliverytimeto, userid], (err, result) => {
        if (err) {
            console.log('shop data not stored:', err);
            return res.status(500).json({error: err.message})
        }
        res.status(201).json({message: 'shop details inserted succesfully'})
    })

})


app.post('/api/bonus', (req, res) => {
    const {userid, purchaseAmount} = req.body; // Assume purchaseAmount is provided by the frontend.

    const bonuses = {
        referrerBonus: 0.03, // 3%
        referrerOfReferrerBonus: 0.02, // 2%
        referrerOfReferrerOfReferrerBonus: 0.01 // 1%
    };

    // const userSql = 'SELECT refid1, refid2, refid3 FROM customers WHERE userid = ?';
    const bonusSql = 'insert into  bonusentry values   = ?,?,?,?,?';

    // Fetch referrers for the user
    db.query(userSql, [userid], (err, rows) => {
        if (err) {
            console.log('Error fetching referrer details:', err);
            return res.status(500).json({error: 'An error occurred while fetching referrer details.'});
        }

        if (rows.length > 0) {
            const {refid1, refid2, refid3} = rows[0];

            // Calculate bonuses based on the purchase amount
            const referrerBonusAmount = purchaseAmount * bonuses.referrerBonus;
            const referrerOfReferrerBonusAmount = purchaseAmount * bonuses.referrerOfReferrerBonus;
            const referrerOfReferrerOfReferrerBonusAmount = purchaseAmount * bonuses.referrerOfReferrerOfReferrerBonus;

            // Update bonus for refid1 (referrer)
            db.query(bonusSql, [referrerBonusAmount, refid1], (err) => {
                if (err) console.log('Error updating referrer bonus:', err);
            });

            // Update bonus for refid2 (referrer of referrer)
            if (refid2) {
                db.query(bonusSql, [referrerOfReferrerBonusAmount, refid2], (err) => {
                    if (err) console.log('Error updating referrer of referrer bonus:', err);
                });
            }

            // Update bonus for refid3 (referrer of referrer of referrer)
            if (refid3) {
                db.query(bonusSql, [referrerOfReferrerOfReferrerBonusAmount, refid3], (err) => {
                    if (err) console.log('Error updating referrer of referrer of referrer bonus:', err);
                });
            }

            // Return a success message
            res.status(200).json({
                message: 'Bonuses updated successfully',
                bonuses: {
                    referrerBonus: referrerBonusAmount,
                    referrerOfReferrerBonus: referrerOfReferrerBonusAmount,
                    referrerOfReferrerOfReferrerBonus: referrerOfReferrerOfReferrerBonusAmount
                }
            });
        } else {
            res.status(404).json({error: 'User not found.'});
        }
    });
});

app.post('/api/customer', (req, res) => {
    const {userid, email, phno, useraddress, upiNumber, userpincode, refid1} = req.body;

    // First, check if there is a shop with the given userpincode
    const checkShopSql = 'SELECT shopid FROM shops WHERE shoppin = ? LIMIT 1';
    db.query(checkShopSql, [userpincode], (err, rows) => {
        if (err) {
            console.log('Error checking shop:', err);
            return res.status(500).json({error: 'Database error while checking shop.'});
        }

        if (rows.length === 0) {
            // No shop found with the given userpincode
            return res.status(400).json({error: 'No shop found with the provided pincode.'});
        }

        // If a shop is found, insert customer details into the customers table with refid2 and refid3
        const sqlInsert = 'INSERT INTO customers(userid, email, phno, useraddress, upiNumber, userpincode, refid1, refid2, refid3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sqlInsert, [userid, email, phno, useraddress, upiNumber, userpincode, refid1, null, null], (err, result) => {
            if (err) {
                console.log('Database error:', err);
                return res.status(500).json({error: err.message});
            }

            const userDetails = {
                refferrerId: '',
                refferrerOfRefferrerid: '',
                referrerOfReferrerOfReferrerid: ''
            };

            if (refid1) {
                // Get referrer of the referrer
                const getReferrerSql = 'SELECT refid1 FROM customers WHERE userid = ?';
                db.query(getReferrerSql, [refid1], (err, rows) => {
                    if (err) {
                        console.log('Error fetching referrer of referrer:', err);
                        return;
                    }

                    if (rows.length > 0) {
                        const referrerOfReferrerId = rows[0].refid1;
                        // Assign to refid2
                        db.query('UPDATE customers SET refid2 = ? WHERE userid = ?', [referrerOfReferrerId, userid]);

                        // Get referrer of the referrer of the referrer
                        const getReferrerOfReferrerSql = 'SELECT refid1 FROM customers WHERE userid = ?';
                        db.query(getReferrerOfReferrerSql, [referrerOfReferrerId], (err, rows) => {
                            if (err) {
                                console.log('Error fetching referrer of referrer of referrer:', err);
                                return;
                            }

                            if (rows.length > 0) {
                                const referrerOfReferrerOfReferrerId = rows[0].refid1;
                                // Assign to refid3
                                db.query('UPDATE customers SET refid3 = ? WHERE userid = ?', [referrerOfReferrerOfReferrerId, userid]);

                                userDetails.refferrerId = refid1;
                                userDetails.refferrerOfRefferrerid = referrerOfReferrerId;
                                userDetails.referrerOfReferrerOfReferrerid = referrerOfReferrerOfReferrerId;
                            }
                        });
                    }
                });
            }

            // Return response without bonus
            setTimeout(() => {
                res.status(201).json({
                    message: 'Customer details inserted successfully',
                    userDetails: userDetails
                });
            }, 1000); // Delay to ensure all DB updates complete
        });
    });
});


app.post('/api/bonusAdd', (req, res) => {
    const {transid, userid, refid1, bonus1, refid2, bonus2, refid3, bonus3, date} = req.body;

    const bonusSql = 'insert into bonusentry(transid,userid,refid1,bonus1,refid2,bonus2,refid3,bonus3,date) VALUES(?,?,?,?,?,?,?,?,?)'
    db.query(bonusSql, [transid, userid, refid1, bonus1, refid2, bonus2, refid3, bonus3, date], (err, result) => {
        if (err) {
            console.log('Database error:', err);
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({message: 'Customer details inserted successfully'});
    })
})

app.get('/api/getUserBonuses/:userid', (req, res) => {
    const {userid} = req.params;
    console.log("Received request for user:", userid); // Log for debugging

    const bonusQuery = `
        SELECT transid, refid1, bonus1, refid2, bonus2, refid3, bonus3, date
        FROM bonusentry
        WHERE refid1 = ? OR refid2 = ? OR refid3 = ?`;

    db.query(bonusQuery, [userid, userid, userid], (err, results) => {
        if (err) {
            console.log('Database error while fetching bonuses:', err);
            return res.status(500).json({error: err.message});
        }

        if (results.length === 0) {
            return res.status(404).json({message: 'No bonuses found for this user.'});
        }

        const bonuses = [];

        results.forEach(result => {
            // Each bonus now includes the userid
            if (result.refid1 === userid) {
                bonuses.push({
                    id: result.refid1,
                    bonus: result.bonus1,
                    transid: result.transid,
                    userid,
                    date: result.date
                });
            }
            if (result.refid2 === userid) {
                bonuses.push({
                    id: result.refid2,
                    bonus: result.bonus2,
                    transid: result.transid,
                    userid,
                    date: result.date
                });
            }
            if (result.refid3 === userid) {
                bonuses.push({
                    id: result.refid3,
                    bonus: result.bonus3,
                    transid: result.transid,
                    userid,
                    date: result.date
                });
            }
        });

        // Send the response with the userid and bonuses
        res.status(200).json({userid, bonuses});
    });
});

app.get('/api/bonusData/:userid', (req, res) => {
    const {userid} = req.params; // Extract userid from the URL
    const query = 'SELECT * FROM bonusentry WHERE userid = ?'; // SQL query using userid
    db.query(query, [userid], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'No data found for the given userid'});
        }
        return res.json(result);
    });
});


app.post('/api/loginPage', (req, res) => {
    const {userid, password} = req.body;

    console.log('Attempting to login with User ID:', userid, 'and Password:', password); // Debugging line

    const userSql = `
        SELECT c.userpincode, l.usertype
        FROM login l
                 LEFT JOIN customers c ON l.userid = c.userid
        WHERE l.userid = ?
          AND l.password = ?
    `;

    db.query(userSql, [userid, password], (err, userData) => {
        if (err) {
            console.error('Error in user SQL query:', err);
            return res.status(500).json({error: 'Database error during user lookup'});
        }

        console.log('User data retrieved:', userData); // Debugging line

        if (userData.length > 0) {
            const userpincode = userData[0].userpincode;
            const usertype = userData[0].usertype;

            if (usertype === "customer") {
                const shopSql = `SELECT *
                                 FROM shops
                                 WHERE shoppin = ?`;

                db.query(shopSql, [userpincode], (err, shopData) => {
                    if (err) {
                        console.error('Error in shop SQL query:', err);
                        return res.status(500).json({error: 'Database error during shop lookup'});
                    }

                    if (shopData.length > 0) {
                        return res.json({message: "Login successful", usertype: usertype});
                    } else {
                        return res.json({message: "We Are Yet to service your place"});
                    }
                });

            } else if (usertype === "admin") {
                return res.json({message: "Admin login successful", usertype: usertype});

            } else if (usertype === "showOwner") {
                return res.json({message: "ShowOwner login successful", usertype: usertype});

            } else if (usertype === "superUser") {
                return res.json({message: "SuperUser login successful", usertype: usertype});

            } else {
                return res.status(400).json({message: "Login failed: Invalid user type"});
            }

        } else {
            return res.status(400).json({message: "Login failed: Invalid userid or password"});
        }
    });
});


app.post('/api/password', (req, res) => {
    const {email} = req.body;
    const sql = 'INSERT INTO password(email) VALUES (?)';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.log('password data not stored:', err);
            return res.status(500).json({error: err.message})
        }
        res.status(201).json({message: 'password details inserted succesfully'})
    })

})


app.post('/api/orderDetails', (req, res) => {
    const orders = req.body;

    // Validate input
    if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({message: 'Invalid input: Orders should be a non-empty array.'});
    }

    const query = 'INSERT INTO myorder (id, image_url, name, price, unit, quantity, date,transcationId) VALUES ?';
    const values = orders.map(order => [
        order.id,
        order.image_url,
        order.name,
        order.price,
        order.unit,
        order.quantity,
        order.date,
        order.transcationId
    ]);

    console.log(query);

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log the error details
            return res.status(500).json({message: 'Internal Server Error', error: err.message});
        }
        res.status(201).json({message: 'Orders added!', orderIds: result.insertId});
    });
});


// Get customer details by userid
app.get('/api/customer/:userid', (req, res) => {
    const {userid} = req.params; // Extract userid from request parameters

    const sql = 'SELECT * FROM customers WHERE userid = ?';
    db.query(sql, [userid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({error: 'Database error'});
        }

        if (result.length === 0) {
            return res.status(404).json({message: 'Customer not found'});
        }

        // Return the first matching customer record
        return res.json(result[0]);
    });
});

// Update customer details by userid
app.put('/api/customer/:userid', (req, res) => {
    const {userid} = req.params; // Extract userid from request parameters
    const {email, Phno, useraddress, upiNumber, userpincode} = req.body; // Extract details from request body

    const sql = 'UPDATE customers SET email = ?, Phno = ?, useraddress = ?,upiNumber = ?, userpincode = ? WHERE userid = ?';
    db.query(sql, [email, Phno, useraddress, upiNumber, userpincode, userid], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({error: 'Database error'});
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Customer not found'});
        }

        return res.status(200).json({message: 'Customer details updated successfully'});
    });
});


//bonus data full 
app.get('/api/bonusData', (req, res) => {
    const query = 'select * from bonusentry'
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        return res.json(result);
    });
})

//customerList Table
app.get('/api/customersData', (req, res) => {
    const query = 'select * from customers'
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({error: err})
        }
        return res.json(result)
    })
})

app.get('/api/shopsDetails/:userid', (req, res) => {
    const {userid} = req.params; // Get shopid from the route parameter

    const sql = 'SELECT * FROM  shops WHERE userid = ?';
    db.query(sql, [userid], (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'No shop found for this userid'});
        }
        return res.json(result);
    });
});

app.get('/api/ShopListdata', (req, res) => {
    const query = 'select * from shops'
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({error: err})
        }
        return res.json(result)
    })
})


// In your Delete Shopid
app.delete('/api/deleteShop/:shopid', (req, res) => {
    const shopid = req.params.shopid;  // Get shopid from URL params
    const query = 'DELETE FROM shops WHERE shopid = ?';

    db.query(query, [shopid], (err, result) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        if (result.affectedRows > 0) {
            return res.json({message: 'Shop deleted successfully'});
        } else {
            return res.status(404).json({message: 'Shop not found'});
        }
    });
});


app.put('/api/updateShop/:id', (req, res) => {
    const shopId = req.params.id;
    const {shopname, shopaddress, shoppin, shopcontactnum, deliverytimefrom, deliverytimeto, userid} = req.body;

    const sql = 'UPDATE shops SET shopname = ?, shopaddress = ?, shoppin = ?, shopcontactnum = ?, deliverytimefrom = ?, deliverytimeto = ?, userid = ? WHERE shopid = ?';
    db.query(sql, [shopname, shopaddress, shoppin, shopcontactnum, deliverytimefrom, deliverytimeto, userid, shopId], (err, result) => {
        if (err) {
            console.log('Error updating shop data:', err);
            return res.status(500).json({error: err.message});
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'Shop not found'});
        }

        res.status(200).json({message: 'Shop updated successfully'});
    });
});


// Endpoint to update shop details
app.put('/api/updateprofile/:id', (req, res) => {
    const shopId = req.params.id;
    const {shopname, shopaddress, shoppin, shopcontactnum, deliverytimefrom, deliverytimeto, userid} = req.body;

    // Define the SQL update query
    const sql = `
        UPDATE shops
        SET shopname         = ?,
            shopaddress      = ?,
            shoppin          = ?,
            shopcontactnum   = ?,
            deliverytimefrom = ?,
            deliverytimeto   = ?,
            userid           = ?
        WHERE shopid = ?`;

    // Execute the query with the provided values
    db.query(sql, [shopname, shopaddress, shoppin, shopcontactnum, deliverytimefrom, deliverytimeto, userid, shopId], (err, result) => {
        if (err) {
            console.error('Error updating shop data:', err);
            return res.status(500).json({error: 'Failed to update shop data'});
        }

        // Check if the shop ID exists in the database
        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'Shop not found'});
        }

        // Success response
        res.status(200).json({message: 'Shop updated successfully'});
    });
});


// app.put('/api/updateShop/:id', (req, res) => {
//     const shopId = req.params.id;
//     const { shopname, shopaddress, shoppin, shopcontactnum, deliverytimefrom, deliverytimeto ,userid} = req.body;

//     const sql = 'UPDATE shops SET shopname = ?, shopaddress = ?, shoppin = ?, shopcontactnum = ?, deliverytimefrom = ?, deliverytimeto = ?, userid = ? WHERE shopid = ?';
//     db.query(sql, [shopname, shopaddress, shoppin, shopcontactnum, deliverytimefrom, deliverytimeto, shopId,userid], (err, result) => {
//         if (err) {
//             console.log('Error updating shop data:', err);
//             return res.status(500).json({ error: err.message });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Shop not found' });
//         }

//         res.status(200).json({ message: 'Shop updated successfully' });
//     });
// });


// Route to add bank details

app.post('/api/bankDetails', (req, res) => {
    const {userid, accountNumber, bankName, ifsc, nameOfBank, bankaddress} = req.body;

    const sql = 'INSERT INTO BankDetails (userid, accountNumber, bankName, ifsc, nameOfBank, bankaddress) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [userid, accountNumber, bankName, ifsc, nameOfBank, bankaddress];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({message: 'Error inserting data'});
        }
        res.status(201).json({message: 'Bank details inserted', id: result.insertId});
    });
});

// Route to get bank details for a specific user
app.get('/api/bankDetails/:userid', (req, res) => {
    const {userid} = req.params;

    const sql = 'SELECT * FROM BankDetails WHERE userid = ?';
    db.query(sql, [userid], (err, results) => {
        if (err) {
            console.error('Error fetching bank details:', err);
            return res.status(500).json({message: 'Error fetching bank details'});
        }
        res.status(200).json(results);
    });
});


// Route to update bank details
app.put('/api/bankDetails/:id', (req, res) => {
    const {id} = req.params;
    const {userid, accountNumber, bankName, ifsc, nameOfBank, bankaddress} = req.body;

    const sql = 'UPDATE BankDetails SET userid = ?, accountNumber = ?, bankName = ?, ifsc = ? ,bankaddress = ?,nameOfBank=?, WHERE id = ?';
    const values = [userid, accountNumber, bankName, ifsc, nameOfBank, bankaddress, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({message: 'Error updating data'});
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Bank detail not found'});
        }
        res.status(200).json({message: 'Bank details updated'});
    });
});
// Insert order and order items, now including the pincode
app.post('/api/orderitem', (req, res) => {
    const {id, pincode, cmd, otpnumber, price, date, orderstatus, transactionId, orderItem} = req.body;

    // Log the incoming request body for debugging
    console.log("Received request body:", req.body);

    // Insert into Orders table (now with pincode)
    const orderQuery = `INSERT INTO Orders (id, pincode, cmd, otpnumber, price, date, orderstatus, transactionId)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(orderQuery, [id, pincode, cmd, otpnumber, price, date, orderstatus, transactionId], (err, orderResult) => {
        if (err) {
            console.error("Error inserting into Orders table:", err);
            return res.status(500).json({error: 'Failed to insert order data'});
        }

        // Check if the orderItem array is correctly passed
        if (!Array.isArray(orderItem) || orderItem.length === 0) {
            return res.status(400).json({error: 'Invalid orderItem array'});
        }

        // Prepare multiple row data for OrderItems
        const orderItemsData = orderItem.map(item => [transactionId, item.itemname, item.itemprice, item.itemunit, id]);

        // Log the data that will be inserted into OrderItems for debugging
        console.log("Inserting the following orderItems data:", orderItemsData);

        // Bulk insert into OrderItems table
        const orderItemsQuery = `INSERT INTO OrderItems (transactionId, itemname, itemprice, itemunit, userid)
                                 VALUES ?`;

        db.query(orderItemsQuery, [orderItemsData], (err, itemsResult) => {
            if (err) {
                console.error("Error inserting order items:", err);
                return res.status(500).json({error: 'Failed to insert order items'});
            }
            res.status(200).json({message: 'Order and items inserted successfully'});
        });
    });
});

// Get all orders for a specific user
app.get('/api/orderitem/:userId', (req, res) => {
    const {userId} = req.params;
    console.log(`Received request for userId: ${userId}`);

    // Query to get all orders for the user
    const orderQuery = `
        SELECT o.id,
               o.pincode,
               o.cmd,
               o.otpnumber,
               o.price,
               o.date,
               o.orderstatus,
               o.transactionId
        FROM Orders o
                 JOIN OrderItems oi ON o.transactionId = oi.transactionId
        WHERE oi.userid = ?`;

    db.query(orderQuery, [userId], (err, orderResult) => {
        if (err) {
            console.error("Error fetching order data:", err);
            return res.status(500).json({error: 'Failed to retrieve order data'});
        }

        if (orderResult.length === 0) {
            console.log(`No orders found for userId: ${userId}`);
            return res.status(404).json({message: 'Order not found'});
        }

        // Now, fetch items for each order
        const ordersWithItems = [];
        let completedRequests = 0;

        orderResult.forEach((order, index) => {
            // Query to get associated items for each order
            const orderItemsQuery = `
                SELECT itemname, itemprice, itemunit
                FROM OrderItems
                WHERE userid = ?
                  AND transactionId = ?`;

            db.query(orderItemsQuery, [userId, order.transactionId], (err, itemsResult) => {
                if (err) {
                    console.error("Error fetching order items:", err);
                    return res.status(500).json({error: 'Failed to retrieve order items'});
                }

                ordersWithItems.push({
                    id: order.id,
                    pincode: order.pincode, // Include pincode in the response
                    cmd: order.cmd,
                    otpnumber: order.otpnumber,
                    price: order.price,
                    date: order.date,
                    orderstatus: order.orderstatus,
                    transactionId: order.transactionId,
                    orderItem: itemsResult.map(item => ({
                        itemname: item.itemname,
                        itemprice: item.itemprice,
                        itemunit: item.itemunit
                    }))
                });

                completedRequests++;

                // If all requests are done, send the response
                if (completedRequests === orderResult.length) {
                    res.status(200).json(ordersWithItems);
                }
            });
        });
    });
});


//update transtarcion shopowner
// Update order by transactionId
app.put('/api/updateOrder', (req, res) => {
    const {transactionId, orderstatus, cmd} = req.body;

    if (!transactionId || !orderstatus || !cmd) {
        return res.status(400).json({error: 'transactionId, orderstatus, and cmd are required'});
    }

    const updateQuery = `UPDATE Orders
                         SET orderstatus = ?,
                             cmd         = ?
                         WHERE transactionId = ?`;

    db.query(updateQuery, [orderstatus, cmd, transactionId], (err, result) => {
        if (err) {
            console.error('Error updating order:', err);
            return res.status(500).json({error: 'Error updating order'});
        }

        res.status(200).json({message: 'Order updated successfully', result});
    });
});


// Updated endpoint to accept pincode instead of userId uptate order
app.get('/api/orderitempincode/:pincode', (req, res) => {
    const {pincode} = req.params;
    console.log(`Received request for pincode: ${pincode}`);

    // Query to get all orders for the pincode
    const orderQuery = `
        SELECT o.id,
               o.pincode,
               o.cmd,
               o.otpnumber,
               o.price,
               o.date,
               o.orderstatus,
               o.transactionId
        FROM Orders o
        WHERE o.pincode = ?`;

    db.query(orderQuery, [pincode], (err, orderResult) => {
        if (err) {
            console.error("Error fetching order data:", err);
            return res.status(500).json({error: 'Failed to retrieve order data'});
        }

        if (orderResult.length === 0) {
            console.log(`No orders found for pincode: ${pincode}`);
            return res.status(404).json({message: 'Order not found'});
        }

        // Now, fetch items for each order
        const ordersWithItems = [];
        let completedRequests = 0;

        orderResult.forEach((order, index) => {
            // Query to get associated items for each order
            const orderItemsQuery = `
                SELECT itemname, itemprice, itemunit
                FROM OrderItems
                WHERE transactionId = ?`;

            db.query(orderItemsQuery, [order.transactionId], (err, itemsResult) => {
                if (err) {
                    console.error("Error fetching order items:", err);
                    return res.status(500).json({error: 'Failed to retrieve order items'});
                }

                ordersWithItems.push({
                    id: order.id,
                    pincode: order.pincode, // Include pincode in the response
                    cmd: order.cmd,
                    otpnumber: order.otpnumber,
                    price: order.price,
                    date: order.date,
                    orderstatus: order.orderstatus,
                    transactionId: order.transactionId,
                    orderItem: itemsResult.map(item => ({
                        itemname: item.itemname,
                        itemprice: item.itemprice,
                        itemunit: item.itemunit
                    }))
                });

                completedRequests++;

                // If all requests are done, send the response
                if (completedRequests === orderResult.length) {
                    res.status(200).json(ordersWithItems);
                }
            });
        });
    });
});


// Get referrals recursively in a tree structure
app.get('/api/referrals/tree/:userid', async (req, res) => {
    const {userid} = req.params;

    // Recursive function to build referral tree
    const getReferralTree = async (currentUserId) => {
        return new Promise((resolve, reject) => {
            // Query to get the users who were referred by the current user
            const sql = `
                SELECT r.userid
                FROM refferal r
                WHERE r.refid1 = ?
            `;

            db.query(sql, [currentUserId], (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (result.length === 0) {
                    // If no referrals, return an empty array
                    return resolve([]);
                }

                // Map through each referral and recursively fetch their referrals
                const referralPromises = result.map((user) => {
                    return getReferralTree(user.userid).then((referred) => ({
                        userid: user.userid,
                        referred: referred
                    }));
                });

                // Wait for all recursive promises to resolve and return the data
                Promise.all(referralPromises)
                    .then(resolve)
                    .catch(reject);
            });
        });
    };

    try {
        // Fetch the referral tree starting from the given userid
        const referralTree = await getReferralTree(userid);
        if (referralTree.length === 0) {
            return res.status(404).json({message: 'No referrals found for this user'});
        }

        // Send the referral tree with userid and referred users
        res.status(200).json({
            userid: userid,
            referred: referralTree
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


app.put('/api/fruits/updateStock/:id', (req, res) => {
    const {id} = req.params;  // Get the fruit ID from the URL
    const {newStock} = req.body;  // Get the new stock quantity from the request body

    const sql = 'UPDATE s2s_fruits SET qty = ? WHERE id = ?';
    db.query(sql, [newStock, id], (err, result) => {
        if (err) {
            return res.status(500).json({error: 'Error updating fruit stock', details: err});
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Fruit not found'});
        }
        return res.json({message: `Fruit stock updated successfully to ${newStock}`});
    });
});

// Update vegetable stock
app.put('/api/vegetables/updateStock/:id', (req, res) => {
    const {id} = req.params;  // Get the vegetable ID from the URL
    const {newStock} = req.body;  // Get the new stock quantity from the request body

    const sql = 'UPDATE s2s_vegetables SET qty = ? WHERE id = ?';
    db.query(sql, [newStock, id], (err, result) => {
        if (err) {
            return res.status(500).json({error: 'Error updating vegetable stock', details: err});
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Vegetable not found'});
        }
        return res.json({message: `Vegetable stock updated successfully to ${newStock}`});
    });
});


//admin registerpage insert
app.post('/api/adminPage', (req, res) => {
    const {userid, email, phno} = req.body;
    const sql = 'INSERT INTO admin(userid,email,phno) VALUES (?,?,?)'
    db.query(sql, [userid, email, phno], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        res.status(201).json({message: 'admin details Inserted succesfully'})
    })
})

app.post('/api/phnumberPage', (req, res) => {
    const {phoneNumber, otp, name} = req.body;
    const sql = 'INSERT INTO otp_PhoneNumber(phoneNumber,otp,name) VALUES (?,?,?)'
    db.query(sql, [phoneNumber, otp, name], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        res.status(201).json({message: 'PhoneNumber details Inserted succesfully'})
    })
})


app.get('/api/otpPage/:phoneNumber', (req, res) => {
    const {phoneNumber} = req.params;

    // SQL query to fetch OTP details by phone number
    const sql = 'SELECT * FROM otp_PhoneNumber WHERE phoneNumber = ?';

    db.query(sql, [phoneNumber], (err, result) => {
        if (err) {
            console.error('Error fetching OTP data:', err);
            return res.status(500).json({error: 'Error fetching OTP data'});
        }

        if (result.length === 0) {
            // If no data is found for the given phone number
            return res.status(404).json({message: 'Phone number not found'});
        }

        // Return the OTP data associated with the phone number
        res.status(200).json(result[0]);
    });
});


//Otp List Table
app.get('/api/otpListData', (req, res) => {
    const query = 'select * from otp_PhoneNumber'
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({error: err})
        }
        return res.json(result)
    })
})

app.delete('/api/deleteOtp/:id', (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM otp_PhoneNumber WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({error: 'Failed to delete OTP'});
        }
        res.status(200).json({message: 'OTP deleted successfully'});
    });
});

app.put('/api/editOtp/:id', (req, res) => {
    const {id} = req.params;
    const {name, phoneNumber, otp} = req.body;

    const sql = 'UPDATE otp_PhoneNumber SET name = ?, phoneNumber = ?, otp = ? WHERE id = ?';
    db.query(sql, [name, phoneNumber, otp, id], (err, result) => {
        if (err) {
            return res.status(500).json({error: 'Failed to update OTP'});
        }
        res.status(200).json({message: 'OTP updated successfully'});
    });
});


// Assuming the express app and database connection are already set up
app.get('/api/adminPage/:userid', (req, res) => {
    const {userid} = req.params;

    // SQL query to fetch admin details by userid
    const sql = 'SELECT * FROM admin WHERE userid = ?';

    db.query(sql, [userid], (err, result) => {
        if (err) {
            console.error('Error fetching admin data:', err);
            return res.status(500).json({error: 'Error fetching admin data'});
        }

        if (result.length === 0) {
            // If no data is found for the given userid
            return res.status(404).json({message: 'Admin not found'});
        }

        // Return the fetched admin data
        res.status(200).json(result[0]);
    });
});


// Route to update admin details
app.put('/api/adminPage/:userId', (req, res) => {
    const {userId} = req.params;
    const {userid, email, phno} = req.body;
    const sql = 'UPDATE admin SET userid = ?, email = ?, phno = ? WHERE userid = ?';

    db.query(sql, [userid, email, phno, userId], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (result.affectedRows > 0) {
            res.status(200).json({message: 'Admin profile updated successfully'});
        } else {
            res.status(404).json({message: 'Admin not found'});
        }
    });
});


// app.post('/api/orderitem', (req, res) => {
//     const { id, price, date, orderstatus, transactionId, orderItem } = req.body;

//     // Log the incoming request body for debugging
//     console.log("Received request body:", req.body);

//     // Insert into Orders table
//     const orderQuery = `INSERT INTO Orders (id, price, date, orderstatus, transactionId) VALUES (?, ?, ?, ?, ?)`;
//     db.query(orderQuery, [id, price, date, orderstatus, transactionId], (err, orderResult) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to insert order data' });
//         }

//         // Check if the orderItem array is correctly passed
//         if (!Array.isArray(orderItem) || orderItem.length === 0) {
//             return res.status(400).json({ error: 'Invalid orderItem array' });
//         }

//         // Prepare multiple row data for OrderItems
//         const orderItemsData = orderItem.map(item => [transactionId, item.itemname, item.itemprice, item.itemunit, id]);

//         // Log the data that will be inserted into OrderItems for debugging
//         console.log("Inserting the following orderItems data:", orderItemsData);

//         // Bulk insert into OrderItems table
//         const orderItemsQuery = `
//             INSERT INTO OrderItems (transactionId, itemname, itemprice, itemunit, userid) 
//             VALUES ?`;

//         db.query(orderItemsQuery, [orderItemsData], (err, itemsResult) => {
//             if (err) {
//                 console.error("Error inserting order items:", err);
//                 return res.status(500).json({ error: 'Failed to insert order items' });
//             }
//             res.status(200).json({ message: 'Order and items inserted successfully' });
//         });
//     });
// });

// app.get('/api/orderitem/:userId', (req, res) => {
//     const { userId } = req.params;
//     console.log(`Received request for userId: ${userId}`);

//     // Query to get all orders for the user
//     const orderQuery = `
//         SELECT o.id, o.price, o.date, o.orderstatus, o.transactionId 
//         FROM Orders o
//         JOIN OrderItems oi ON o.transactionId = oi.transactionId
//         WHERE oi.userid = ?`;

//     db.query(orderQuery, [userId], (err, orderResult) => {
//         if (err) {
//             console.error("Error fetching order data:", err);
//             return res.status(500).json({ error: 'Failed to retrieve order data' });
//         }

//         if (orderResult.length === 0) {
//             console.log(`No orders found for userId: ${userId}`);
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         // Now, fetch items for each order
//         const ordersWithItems = [];

//         let completedRequests = 0;
//         orderResult.forEach((order, index) => {
//             // Query to get associated items for each order
//             const orderItemsQuery = `
//                 SELECT itemname, itemprice, itemunit 
//                 FROM OrderItems 
//                 WHERE userid = ? AND transactionId = ?`;

//             db.query(orderItemsQuery, [userId, order.transactionId], (err, itemsResult) => {
//                 if (err) {
//                     console.error("Error fetching order items:", err);
//                     return res.status(500).json({ error: 'Failed to retrieve order items' });
//                 }

//                 ordersWithItems.push({
//                     id: order.id,
//                     price: order.price,
//                     date: order.date,
//                     orderstatus: order.orderstatus,
//                     transactionId: order.transactionId,
//                     orderItem: itemsResult.map(item => ({
//                         itemname: item.itemname,
//                         itemprice: item.itemprice,
//                         itemunit: item.itemunit
//                     }))
//                 });

//                 completedRequests++;

//                 // If all requests are done, send the response
//                 if (completedRequests === orderResult.length) {
//                     res.status(200).json(ordersWithItems);
//                 }
//             });
//         });
//     });
// });


// app.post('/api/send-otp', (req, res) => {
//     const { phoneNumber } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Configure nodemailer
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });

//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: phoneNumber, // If using SMS gateway, replace with the correct format
//         subject: 'Your OTP Code',
//         text: `Your OTP code is: ${otp}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error); // Log the error
//             return res.status(500).json({ error: 'Error sending OTP' }); // Send error response
//         }

//         // Save OTP to database for verification later
//         db.query('INSERT INTO otps (phoneNumber, otp) VALUES (?, ?)', [phoneNumber, otp], (err, result) => {
//             if (err) {
//                 console.error('Database error:', err); // Log the database error
//                 return res.status(500).json({ error: 'Database error' }); // Send error response
//             }
//             res.status(200).json({ message: 'OTP sent!' });
//         });
//     });
// });


// Start the server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});


