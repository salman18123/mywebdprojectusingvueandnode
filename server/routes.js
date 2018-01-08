const route=require('express').Router()
const user=require('./db').user
const pets=require('./db').pets
const cart=require('./db').cart
const joi =require('joi')
const jwt=require('jsonwebtoken')
const stripe=require('stripe')('sk_test_F1Ze2FHOCbuV1KKOEGarJfTm')

route.post('/pets',(req,res)=>{

    pets.create({
        gender:req.body.gender,
        location:req.body.location,
        status:req.body.status,
        breedname:req.body.breedname,
        temparament:req.body.temparament,
        Age:parseInt(req.body.age),
        Price:parseInt(req.body.price)
    })
    .then((pet)=>{
        res.status(203).send(pet)
    })
    .catch((err)=>{
        res.status(403).send({error:"not created properly"})
    })
})
route.post('/user',(req,res,next)=>{
    const schema={
        email:joi.string().email(),
        password:joi.string().regex(
            new RegExp(`^[a-zA-Z0-9]{8,32}$`)
        )
    }
    const {error,val}=joi.validate(req.body,schema)
    if(error){
        switch(error.details[0].context.key){
            case 'email':res.send({error:"not a proper email"})
            break;
            case 'password':res.send({error:"not a valid password"})
            break;
            default:res.send({error:"not valid data"})
        }

    }
    else{
        next()
    }
},(req,res)=>{
    user.create(req.body)
    .then((users)=>{
        res.send({user:users,token:jwt.sign({data:users},'secret',{expiresIn:24*24*60*7})})
    })
    .catch((err)=>{
        res.send({error:"not added user properly"})
    })
})
route.post('/login',(req,res)=>{
    user.findOne({
        where:{
            email:req.body.email
        }
    })
    .then((users)=>{
        if(!users){
            res.send({error:"no such userdata"})
        }
        const isp=users.comparepassword(req.body.password)
        if(!isp){
            res.send({error:"incorrect password"})
        }
        res.send({user:users,token:jwt.sign({data:users},'secret',{expiresIn:24*24*60*7})})
    })
    .catch((err)=>{
        res.send({error:"no such user exists"})
    })
})
route.post('/pay',(req,res)=>{
    const amount=10000
    console.log(req.body)
    stripe.customers.create({
        email:req.body.email,
        source:req.body.stripe.id
        
    })
    .then((cus)=>{
      stripe.charges.create({
          amount:amount,
          description:'testing',
          receipt_email:req.body.email,
          currency:'inr',
          customer:cus.id
      }) 
      .then(()=>{
          res.send("hello")
      }) 
    })
    })
route.get('/pets',(req,res)=>{
pets.findAll()
.then((pet)=>{
    res.status(203).send(pet)
})
.catch((err)=>{
    res.send({error:"not getting properly"})
})
})

route.get('/pet/:petid',(req,res)=>{
    pets.findById(req.params.petid)
    .then((pet)=>{
        res.status(203).send(pet)
    })
    .catch((err)=>{
        res.status(403).send({error:"not achieved properly"})
    })
})
route.post('/cart',(req,res)=>{
    cart.create(req.body)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send({error:"not added to cart"})
    })
})
route.get('/cart',(req,res)=>{
    cart.findAll({
        include:[pets],
        where:{
            userId:req.query.userId
        }
    })
    .then((data)=>{
        res.send(data)
    })
    
    
    .catch((err)=>{
        res.send({error:"not fetched properly"})
    })
})
route.delete('/cart/:id',(req,res)=>{
    cart.findOne({
        where:{
         id:req.params.id
        }
    })
    .then((data)=>{
        return data.destroy()
    })
    .then(()=>{
        res.send({message:"item deleted successfully from your cart"})
    })
    .catch((err)=>{
        console.log(err)
    })
})
route.delete('/user/:id',(req,res)=>{
    cart.destroy({
        
      where:{
          userId:req.params.id
      }  
    })
    
    .then(()=>{
        res.send({message:"deleted all the items"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({msg:"not deleted properly"})
    })
})



exports=module.exports=route