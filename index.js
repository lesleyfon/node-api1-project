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
        res.status(404).send({
            message: 'Not found',
            data: err    
        })
    })
  
})
//Endpoint for a specific user
app.get('/api/users/:id', (req, res)=>{
    const id = req.params.id;
    if(!id){
        res.status(404).json({ message: 
            "The user with the specified ID does not exist." })
    } else {
       
        db.findById(id).then(response =>{
            res.status(200).send({
                    message: 'Request successful',
                    data: response    
                })

        }).catch(err=>{
            res.status(500).send({ errorMessage: "The user information could not be retrieved." })
        })
    }
    
  
})

//posting data
app.post('/api/users', (req, res)=>{
    const {name, bio} = req.body;
    if(!name || !bio){
        res.status(404).json({ errorMessage: "Please provide name and bio for the user." })
    } else{
        db.insert({name, bio})
            .then(response => {

                res.status(201).json({message: 'Post Successful', newUser: {name, bio}})
            })
            .catch(err => {
                res.status(500).json({message: 'error'})
                
            })
    }
   
});

//Delete User

app.delete('/api/user/:id', (req, res)=>{
    const id = req.params.id;
    if(!id){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
       
        db.remove(id).then(response =>{
            console.log(response)
            res.status(200).send({
                    message: 'Successfully Deleted',  
                })
        }).catch(err=>{
            res.status(500).send({ errorMessage: "The user could not be removed" })
        })
    }
    
})
app.listen(PORT, ()=> console.log(`Server listening to http://localhost:${PORT}`))