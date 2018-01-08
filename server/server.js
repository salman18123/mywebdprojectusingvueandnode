const express=require('express')
const cors=require('cors')


const app=express()
const port=process.env.PORT|| 9090
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/',require('./routes'))

app.listen(port,()=>{
    console.log("started server")
})