<template>
<v-container fluid>
    <div v-if="user" style="background-color:#E6F7D6">
        <v-flex xs12 style="padding: 10px">
            <h1 style="color:#424242; text-align:center">Hello Mohit, you have already logged in.</h1>
        </v-flex>
    </div>
    <div v-else style="background-color:transparent">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Username"
                v-model="email"
                type="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                v-model="password"
                type="password"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center">
              <v-btn color="primary"
              @click="AuthenticateUser"
               >Sign In</v-btn>
            </v-flex>
            <v-flex v-if="error" style="margin-top : 20px" class="text-xs-center">
                <h3 style="color: red">{{error.message}}</h3>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    </div>
    </v-container>
</template>
<script>
    export default {
        data () {
            return {  
                email : '',
                password: ''
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            },
            error () {
                return this.$store.getters.error
            }         
        },
        watch: {
            user (value) {
                if (value !== null && value !== undefined){
                     this.$router.push('/')
                }
            }
        },
        methods:{
            AuthenticateUser: function(){
                if(this.email.trim().length === 0){
                    this.$store.dispatch('setError', {message : 'Please provide a username'})
                    return;
                }                
                if(this.password.trim().length === 0){
                    this.$store.dispatch('setError', {message : 'Please provide a valid password for ' + this.email})
                    return;
                }
                this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
            }
        }
    }
</script>