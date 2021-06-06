const express= require('express')
const mongoose = require('mongoose')
const app=express()
const bodyparser = require('body-parser')
const router=express.Router()
const Person=require('./models/person')

const uri = 'mongodb+srv://slim:qwerty@cluster0.miul8.mongodb.net/db?retryWrites=true&w=majority'
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('connected'))
.catch((err)=>console.log(err))

const port = process.env.PORT || 3000
app.listen(port,()=>console.log(`connected on ${port}`))

app.use(bodyparser.json())

app.post('/add-person',async(req,res)=>{

    try {
        const newPerson = new Person({
            ...req.body
        })
        
        const person = await newPerson.save()
        res.json(person)
        

        
        
    } catch (err) {
        console.log(err)
        
    }

    
   
    
   
})


app.get('/find/:name',async(req,res)=>{
    try {
        const person = await Person.find({name:req.params.name})
        res.json({person})
        
    } catch (err) {
        console.log(err)
        
    }

})

app.get('/like/:favoriteFoods',async(req,res)=>{
    try {
        const person = await Person.find({favoriteFoods:req.params.favoriteFoods}).sort(req.name).limit(2).exec(req.age)
        res.json(person)
        
    } catch (err) {
        console.log(err)

        
    }
})

app.get('/findfood/:favoriteFoods' , async(req,res)=>{
    try {
        const person = await Person.findOne({favoriteFoods:req.params.favoriteFoods})
        res.json(person)
        
    } catch (err) {
        console.log(err)
        
    }


    
})
app.get('/findbyid/:id',async(req,res)=>{

    try {
      const person= await Person.findById({_id:req.params.id})
        res.json({person})
    } catch (err) {
        console.log(err)
    }


    
})
app.put('/update/:id',async(req,res)=>{
    try {
        const person = await Person.findOneAndUpdate({_id:req.params.id},{$set:{...req.body}})
        res.json(person)
        
    } catch (err) {
        console.log(err)
        
    }
})
app.delete('/delete/:id',async(req,res)=>{
    try {
        const person = await Person.findByIdAndRemove({_id:req.params.id})
        res.json(person)
        
    } catch (err) {
        console.log(err)
        
    }
})
app.delete('/remove/:name',async(req,res)=>{
    
    try {
        const person = await Person.remove({name:req.params.name})
        res.json(person)
        
    } catch (err) {
        console.log(err)
        
    }
})

app.get('/all',(req,res)=>{
    Person.find()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))

})