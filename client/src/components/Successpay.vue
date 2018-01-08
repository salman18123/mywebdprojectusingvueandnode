<template>
  <div id='app'>
    <div>
      <v-flex xs6 offset-xs3>
    <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Name"
      v-model="name"
      
      
    ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="ema"
      
     
    ></v-text-field>
    <p>Please give us your payment details:</p><br>
    <v-flex offset-xs5>
    <card class='stripe-card'
      :class='{ complete }'
      stripe='pk_test_D6nQcTNtKTWeMXvwUd4aDwiZ'
      :options='stripeOptions'
      @change='complete = $event.complete'
    />
    </v-flex><br>
    <v-btn class='pay-with-stripe' @click='pay' :disabled='!complete'>Pay with credit card</v-btn>
    
    

    
    
  </v-form>
      </v-flex>
    </div>
    
  
  </div>
</template>
 
<script>

import { Card, createToken } from 'vue-stripe-elements'
import Paymentservice from '@/services/Paymentservice'
 
export default {
  data () {
    return {
      complete: false,
      name:(this.$store.state.user.email).split('@')[0],
      ema:this.$store.state.user.email,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      }
    }
  },
 
  components: { Card },
 
  methods: {
    pay () {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then((data) => {console.log(data.token)
      const resp=Paymentservice.success({email:this.$store.state.user.email,stripe:data.token})
      //console.log(resp)
      }
      )
    }
  }
}
</script> 
 
<style>
.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
</style> 
