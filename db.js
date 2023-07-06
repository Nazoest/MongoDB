const  {MongoClient}=require('mongodb')

let dbConnection
let uri='mongodb+srv://nathanmacharia115:HQj8aAotOZC1SpBN@cluster0.dyn4q7p.mongodb.net/'

module.exports={
    connectToDb:(cb)=>{
        MongoClient.connect(uri)
         .then((client)=>{
            dbConnection=client.db()
            return cb()
         })
         .catch(err=>{
            console.log(err)
            return cb(err)
         })
    },
    getDb:()=>dbConnection
}