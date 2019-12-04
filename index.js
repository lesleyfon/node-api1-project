// implement your API here

const express = require('express');

const db = require('./data/db')
const app = express();

app.use(express.json())
const PORT = 8080;

app.get('/api/users', (req, res)=>{
    db.find().then(response =>{
        res.status(200).send({
                message: 'Request successful',
                data: response    
            })
    }).catch(err=>{
        console.log(err)
    })
  
})

app.listen(PORT, ()=> console.log(`Server listening to http://localhost:${PORT}`))