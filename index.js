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

// app.post('/api/users', (req, res)=>{
//     console.log(req 
//         )
//     // db.find().then(response =>{
//     //     res.status(200).send({
//     //             message: 'Request successful',
//     //             data: response    
//     //         })
//     // }).catch(err=>{
//     //     res.status(404).send({
//     //         message: 'Not found',
//     //         data: err    
//     //     })
//     // })
//   res.status(200).send(req.body)
// })
app.listen(PORT, ()=> console.log(`Server listening to http://localhost:${PORT}`))