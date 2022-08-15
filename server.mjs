import express, { json } from 'express'
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

console.log(nanoid());

let userBase = [];

//to create user
app.post('/signup', (req, res) => {
    let body = req.body;

    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        res.status(400).send(`require field missing.please fill the require field eg:
    {    
        
        "firstName" : "john" , 
        "lastName" : "doe" ,
        "email": "abc@gmail.com",
        "password" : "12345"

    }`);

        return;
    }

    let newUser = {
        "id": nanoid(),
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password
    }

    userBase.push(newUser);
    res.status(201).send("user is created");

});

// post because login data is private or get ki body me openly jata h isliye post use
app.post('/login', (req, res) => {
    let body = req.body;

    if (!body.email || !body.password) {
        res.status(400).send(`require field missing.please fill the require field eg:
    {    
        
        "firstName" : "john" , 
        "lastName" : "doe" ,
        "email": "abc@gmail.com",
        "password" : "12345"

    }`);

        return;
    }

    isfound = false ;

    for (let i = 0; i < userBase.length; i++) {

        isfound = true;

        if (userBase[i].email == req.body.email) {
            if (userBase[i].password == body.password) {
                res.send(
                    {
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "email": req.body.email,
                        "message": "login successful"
                    })
            }

            else {
                res.status(401).send(
                    { message: "your password is incorrect" }
                    )
            }
        
        
        return;
        }

        if(!isfound){
           res.end(
            {
                message : "user not found"
            }
           )
           return;
        }

    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})