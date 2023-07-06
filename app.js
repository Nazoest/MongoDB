const express =require('express')
const {connectToDb,getDb}=require('./db')

//init app & middleware
const app=express()

//db connection
let db
connectToDb((err)=>{
    if(!err){
        app.listen(3000,()=>{
            console.log("listening from 3000")
        })
        db=getDb()
    }
})
//routes
app.get('/books',(req,res)=>{
     
    let books=[]
    db.collection('books')
    .find()
    .sort({author:1})
    .forEach(book =>books.push(book))
    .then(()=>{
        res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({error: 'Could not fetch the documents'})
    })

})

app.get('/books/:id',(req,res)=>{
    db.collection('books')
    .findone({_id:ObjectId(req.params.id)})
    .then(doc =>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(500).json({error:'Could not fetch the document'})
    })
})