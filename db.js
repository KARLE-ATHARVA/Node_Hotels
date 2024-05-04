const mongoose=require('mongoose');

const mongoURL='mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db=mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MongoDb Server...')
})
db.on('error',()=>{
    console.log('MongoDb Connection Error...')
})
db.on('disconnect',()=>{
    console.log('MongoDb Disconnected...')
});

module.exports=db
