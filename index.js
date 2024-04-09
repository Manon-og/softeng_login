const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
    host: "127.0.0.1",
    user: "root", 
    password:"wakoyuyab",
    database: "s2",
    });

    app.post('/register', (req, res) => {
        const sql = "INSERT INTO Login (`Name`, `Email`, `Password`) VALUES (?, ?, ?)";
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const values = [name, email, password];
        db.query(sql, values, (err, data) => {
            if (err) return res.json("error"); 
            return res.json(data)
        })
    })

    app.post('/login', (req, res) => {
        const sql = "SELECT * FROM Login WHERE `Email` = ? AND `Password`= ?";
        db.query(sql,[req.body.email,req.body.password], (err, data) => {
            if (err) return res.json("error")
            if (data.length > 0) {
                console.log("success")
                return res.json({ message: "Success", userId: data[0].Name})
            }
            else { 
                console.log("invalid")
                return res.json("Invalid Email or Password")
            }
        })

        // const insertSql = "INSERT INTO People (Names) SELECT `Name` FROM Login WHERE `Email` = ? AND `Password`= ?";
        // const insertValues = [req.body.email, req.body.password];
        // db.query(insertSql, insertValues, (err, data) => {
        //     if (err) return res.json("error");
        //     return res.json(data);
        // });
    })

    
        app.listen(8801, () => {
            console.log('running');
        });
