const Promise=require('bluebird')
const bcrypt=Promise.promisifyAll(require('bcrypt-nodejs'))
const Sequelize=require('sequelize')
const db=new Sequelize('petkart','petkart','petkart',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        min:0,
        max:5
    }
})
function hashpassword(user,options){
    const SALT_FACTOR=8
    if(!user.changed('password')){
      return
    }
    return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt)=>{
        return bcrypt.hashAsync(user.password,salt,null)
    })
    .then((hash)=>{
        return user.setDataValue('password',hash)
    })
}
const user=db.define('user',{
    email:{
        type:Sequelize.STRING,
        unique:true
    },
    password:Sequelize.STRING
},{
    hooks:{
        beforeCreate:hashpassword,
        beforeUpdate:hashpassword,
        beforeSave:hashpassword
    }
})
user.prototype.comparepassword=(password)=>{
    return bcrypt.compareAsync(password,this.password)
}
const pets=db.define('pets',{
    gender:Sequelize.STRING,
    location:Sequelize.STRING,
    status:Sequelize.STRING,
    breedname:Sequelize.STRING,
    temparament:Sequelize.STRING,
    Age:Sequelize.INTEGER,
    Price:Sequelize.INTEGER
})
const cart=db.define('cart',{

})
cart.belongsTo(pets)
cart.belongsTo(user)
db.sync()
.then(()=>{
    console.log("syncing done")
})
.catch((err)=>{
    console.log(err)
})
exports=module.exports={
    user,pets,cart
}