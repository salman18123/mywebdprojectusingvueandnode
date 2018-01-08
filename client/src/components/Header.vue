<template>
  <v-toolbar fixed>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-btn flat class="dark" @click="navigateTo({name:'pets'})">Browse</v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat  class="dark" v-if="!$store.state.isuserloggedin" @click="navigateTo({name:'login'})">Login</v-btn>
      <v-btn flat  class="dark" v-if="$store.state.isuserloggedin" @click="logout()">Logout</v-btn>
      <v-btn flat  class="dark" v-if="$store.state.isuserloggedin"  @click="navigateTo({name:'sellpet'})">sellpet</v-btn>
      <v-layout row justify-center> <v-dialog v-model="dialog" width="600px">
      <v-btn color="primary"  dark slot="activator" @click="getting()">View Cart</v-btn><v-card >
          <div v-if="$store.state.isuserloggedin">
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
          
          
           <v-btn color="green darken-1" flat="flat" @click=" rem(),navigateTo({name:'successpay'}) ">Pay</v-btn>
       
        </v-card-actions></div>
        <div v-if="!$store.state.isuserloggedin" style="height:100px"><h3>Please login to see your cart</h3></div>
      </v-card>
    </v-dialog></v-layout>
      <v-btn flat class="dark " @click="navigateTo({name:'register'})">Signup</v-btn>
      
    </v-toolbar-items>
  </v-toolbar>
  
</template>

<script>
import Cartservice from '@/services/Cartservice'


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
        async rem(){
            try{
                console.log("hello")
                const response=(await Cartservice.delall(this.$store.state.user.id)).data
                console.log(response)
            }
            catch(err){
             console.log(err)
            }
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
        
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
