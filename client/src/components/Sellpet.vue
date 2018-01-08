<template>
<v-flex xs6 offset-xs3>
     <panel heading="sellpet"/>   
            
  <v-form >
    
     <v-text-field
      label="Gender"
      v-model="gender"
      
      
      
    ></v-text-field>
    <v-text-field
      label="location"
      v-model="location">
      </v-text-field>
      <v-text-field
      label="status"
      v-model="status">
      </v-text-field>
      <v-text-field
      label="breedname"
      v-model="breedname">
      </v-text-field>
      <v-text-field
      label="temparament"
      v-model="temparament">
      </v-text-field>
      <v-text-field
      label="age"
      v-model="age">
      </v-text-field>
      <v-text-field
      label="price"
      v-model="price">
      </v-text-field>
    <v-btn @click="addnew()">Add</v-btn>
  </v-form>
            
        
    </v-flex>
  
</template>

<script>
import Panel from '@/components/Panel'
import Petservice from '@/services/Petservice'

export default {
    data(){
        return{
             gender:'',
    location:'',
    status:'',
    breedname:'',
    temparament:'',
    age:'',
    price:''
        }
    },
    
    methods:{
        async addnew(){
            console.log("clicked")
         try{
              console.log("clicked")
             const response=(await Petservice.add({gender:this.gender,location:this.location,status:this.status,breedname:this.breedname,temparament:this.temparament,age:this.age,price:this.price})).data
             console.log(response)
         }
         catch(err){

         }

        }
    },
    components:{
        Panel
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
