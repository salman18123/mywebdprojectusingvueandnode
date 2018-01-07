<template>
  <v-toolbar fixed>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-btn flat class="dark" @click="navigateTo({name:'pets'})">Browse</v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat  class="dark" v-if="!$store.state.isuserloggedin" @click="navigateTo({name:'login'})">Login</v-btn>
      <v-btn flat  class="dark" v-if="$store.state.isuserloggedin" @click="logout()">Logout</v-btn>
      <v-layout row justify-center> <v-dialog v-model="dialog" width="600px">
      <v-btn color="primary" dark slot="activator" @click="getting()">Open Dialog</v-btn><v-card>
        <v-card-title>
          <span class="headline">Cart</span>
        </v-card-title><v-card-text>
            <table>
                <tr>
                    <th>PetId</th>
                    <th>breedname</th>
                    <th>Price</th>
                </tr>
                <tr v-for="item in cartdata" :key="item.id">
                    <td>{{item.pet.id}}</td>
                    <td>{{item.pet.breedname}}</td>
                    <td>{{item.pet.Price}}</td>
                    <td> <v-btn @click="remove(item.id)">delete item</v-btn></td>
                </tr>
            </table>
            
            </v-card-text><v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="paypal()">Pay</v-btn>
           <v-btn color="green darken-1" flat="flat" @click="navigateTo({name:'successpay'})">Pay</v-btn>
       
        </v-card-actions>
      </v-card>
    </v-dialog></v-layout>
      <v-btn flat class="dark " @click="navigateTo({name:'register'})">Signup</v-btn>
      
    </v-toolbar-items>
  </v-toolbar>
  
</template>

<script>
import Cartservice from '@/services/Cartservice'
import Paypalservice from '@/services/Paypalservice'

export default {
    data(){
     return{
         cartdata:null,
         cartsum:0,
         cartall:0,
   
     }
    },
    props:[
        'title'
    ],
    components:{
        
    },
    methods:{
        navigateTo(route){
            this.$router.push(route)
        },
        logout(){
            this.$store.dispatch('setToken',null)
            this.$store.dispatch('setUser',null)
            this.$router.push({name:'login'})
        },
        async getting(){
            console.log(this.$store.state.user.id)
            try{
          this.cartdata=(await Cartservice.getting(this.$store.state.user.id)).data
          console.log(this.cartdata)
          
          

            }
            catch(err){
                console.log(err)
            }

        },
        async remove(data){
            try{
                await Cartservice.remove(data)
            }
            catch(err){
                
            }
        },
        async paypal(){
            try{
            const payment=(await Paypalservice.buying()).data
            console.log(payment)
            for(let i=0;i<payment.links.length;i++){
                if(payment.links[i].rel==='approval_url'){
                    console.log(payment.links[i].href)
               setImmediate(()=>{
                   location.href=payment.links[i].href
               },0)
                }
            }
            console.log(payment)
            }
            catch(err){
                console.log(err)
            }
        }
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
