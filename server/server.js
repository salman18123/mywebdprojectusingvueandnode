const express=require('express')
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/',require('./routes'))
app.listen(9090,()=>{
    console.log("started server")
})