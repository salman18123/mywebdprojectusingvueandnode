
<template>
<v-layout row wrap>
<v-flex xs4 v-for="(data,index) in this.song" :key="data.id">
      <v-card style="width:60%;margin-bottom:2%">
        <v-card-media :src="images[(index+song.length)%song.length]" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{data.gender}}</h3>
            <div>{{data.status}}<br>{{data.location}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          
          <v-btn flat color="orange" @click="navigateTo({name:'pet',params:{petid:data.id}})" >Explore</v-btn>
        </v-card-actions>
      </v-card>
</v-flex>

</v-layout>
  
</template>

<script>
import Petservice from '@/services/Petservice'
export default {
    data(){
        return {
            song:null,
            images:['https://i.pinimg.com/736x/63/0f/0e/630f0ef3f6f3126ca11f19f4a9b85243--dachshund-puppies-weenie-dogs.jpg',
            'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?dpr=1&auto=format&fit=crop&w=376&h=251&q=60&cs=tinysrgb',
            'https://www.what-dog.net/Images/faces2/scroll000.jpg','https://s.yimg.com/uu/api/res/1.2/BX4hQ2Ixa4C9a6YpuN9w_w--~B/aD0zMTU0O3c9NDczMDtzbT0xO2FwcGlkPXl0YWNoeW9u/http://media.zenfs.com/en-US/homerun/time_72/25f0a36be1cb766f83657ca233e6f4ec',
            'https://www.cheatsheet.com/wp-content/uploads/2017/05/Maltese-Dog.jpg','https://i.pinimg.com/originals/db/ef/33/dbef3386a04c4ca6b916a7d52a4dcdb8.jpg']
        }
    },
     async mounted(){
         try{
      this.song=(await Petservice.index()).data
      console.log(this.song)
         }
         catch(err){
             console.log(err)
         }

    },
    methods:{
        navigateTo(route){
            this.$router.push(route)

        }
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
