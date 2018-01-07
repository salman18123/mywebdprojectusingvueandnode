<template>

<div>
<v-layout column>
    
    <v-flex xs6 offset-xs3>
     <panel heading="Register"/>   
            
  <v-form >
    
     <v-text-field
      label="email"
      v-model="em"
      
      
      
    ></v-text-field>
    <v-text-field
      label="password"
      v-model="password"
      type="password"
      
      
      
    ></v-text-field>
    <v-btn @click="validate()">Signup</v-btn>
  </v-form>
            
        
    </v-flex>
</v-layout>
</div>
</template>

<script>
import Panel from '@/components/Panel'
import Authenticationservice from '@/services/Authenticationservice'
export default {
    data(){
        return {
        em:'',
        password:''
        }
    },
  components:{
      Panel
  },
  methods:{
     async validate(){
         
         try{
             
             const response=(await Authenticationservice.register({email:this.em,password:this.password})).data
             console.log(response)
             this.$router.push({name:'login'})

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
