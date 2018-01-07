<template class="white">
<div>
<v-layout>
    
    <v-flex xs-6 style="margin-right:0%">
     <v-card style="width:50%" mr-0>
        <v-card-media :src="images[(pet.id-1+length)%length]"  height="300px" >
        </v-card-media>
        
    
          
          
      </v-card>
    </v-flex>
    <v-flex >
        <v-card style="width:50%;height:300px">
       
        <v-card-title primary-title>
          <div>
              <h1>Pet Information</h1>
            <h3 class="headline mb-0">Gender:{{pet.gender}}</h3>
            <div><h3><b>Status:</b>{{pet.status}}</h3><br><h3>Location:{{pet.location}}</h3></div>
            <h3>BreedName:{{pet.breedname}}</h3><h3>Age:{{pet.Age}}yrs</h3><h3>Price:{{pet.Price}}</h3>
            <v-btn class="dark cyan" v-if="$store.state.isuserloggedin" @click="adding()">Addtocart</v-btn>
            <v-btn class="dark cyan" v-if="!$store.state.isuserloggedin">Please login to purchase</v-btn>
          </div>
        </v-card-title>
        
      </v-card>

    </v-flex>
    
    
</v-layout>
</div>


  
</template>

<script>
import Images from '@/images.js'
import Petservice from '@/services/Petservice'
import Cartservice from '@/services/Cartservice'
export default {
    data(){
     return{
         pet:null,
         images:null,
         length:null
     }
    },
  async mounted(){
      try{
       const petid=this.$store.state.route.params.petid
        this.pet=(await Petservice.viewpet(petid)).data
        console.log(this.pet)
        this.images=Images
        this.length=Images.length
        console.log(this.length)
      }
      catch(err){

      }
       
   },
   methods:{
     async adding(){
         const response=(await Cartservice.adding({userId:this.$store.state.user.id,petId:this.pet.id}) ).data
         
     }
   }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
