<template>
  <v-card flat class="back-ground-color">
 <v-snackbar
    :timeout="snackBarProp.timeout"
    :color="snackBarProp.color"
    :multi-line="snackBarProp.mode === 'multi-line'"
    :vertical="snackBarProp.mode === 'vertical'"
    v-model="snackBarProp.snackbar"
    >
    {{ snackBarProp.text }}
    <v-btn dark flat @click.native="snackBarProp.snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-form @submit.prevent="submit" ref="form" lazy-validation>
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12 sm8 offset-sm2 mt-2>
            <v-card flat color="transparent">
              <v-card-title primary-title style="padding-left:0px"><h1 style="color:#DC4C46">Get In Touch</h1></v-card-title>
            </v-card>
           <v-card-text style="padding-left:0px">We’re more than happy to discuss your business needs and answer any questions you may have. Fill out the form below and we’ll get back to you soon.</v-card-text>                                           
          </v-flex>
          </v-layout>
          <v-layout wrap>
          <v-flex xs12 sm8 offset-sm2 mt-3>
            <v-text-field
              color="purple darken-2"
              label="FullName"
              required
              v-model="form.fullName"
              prepend-icon="face"
              :rules="rules.name"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm8 offset-sm2 mt-3>
            <v-text-field
              color="green darken-2"
              label="Email"
              required
              prepend-icon="email"
              v-model="form.email"
              :rules="rules.emailRules"
            ></v-text-field>
          </v-flex>
           <v-flex xs12 sm8 offset-sm2 mt-3>
            <v-text-field
              color="orange darken-2"
              label="Contact No"
              v-model="form.contact"
              single-line
              prepend-icon="phone"
            ></v-text-field>
          </v-flex>
           <v-flex xs12 sm8 offset-sm2 mt-3>
            <v-text-field
              color="voilet darken-2"
              label="Subject"
              v-model="form.subject"
              single-line
              prepend-icon="subject"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm8 offset-sm2 mt-3>
            <v-text-field
              color="teal"
              multi-line
              prepend-icon="message"
              required
              v-model="form.message"
              :rules="rules.name"
            >
              <div slot="label">
                Message
              </div>
            </v-text-field>
          </v-flex>

            <v-flex xs12 sm8 offset-sm2 mt-3>
              <v-card flat color="transparent">
            <v-card-actions>
            <v-spacer></v-spacer>          
             <v-btn flat color="red" @click="resetForm">Clear</v-btn>   
              <v-btn
                flat
                color="primary"
                type="submit"
              >Submit</v-btn>       
          </v-card-actions>
              </v-card>
            </v-flex>

         
           </v-layout>          
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import axios from 'axios';
  export default {
    data () {
      const defaultForm = Object.freeze({
        fullName: '',
        email: '',
        message: '',
        contact: '',
        subject: ''
      })

      return {
        data: '',
        form: Object.assign({}, defaultForm),
        rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ]
        },
        snackBarProp:{
              snackbar: false,
              color: 'success',
              timeout: 8000,
              text: 'Message sent successfully. Thank you for contacting us.',
              mode: 'vertical'
          },
        defaultForm
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.fullName &&
          this.form.email &&
          this.form.message
        )
      }
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        if (this.$refs.form.validate()) {
            let loader = this.$loading.show();
            axios.post(`https://void-blog-api.herokuapp.com/notification`,
            this.form
            ).then(response => {
              this.$store.dispatch('insertNotification', response.data.newlyAddedUser)
              loader.hide()
              this.snackBarProp.snackbar = true
              this.resetForm()
          }).catch(err => {
              loader.hide()
              console.log('Error : ' + err.message);
          })
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
    @import '../../node_modules/vuetify/src/stylus/settings/_variables.styl'
    .back-ground-color{
      background-color: #F8F8F8
    }
    .headline-color{
      font-family: "sans-serif"
      font-weight: normal
      font-size: 34px
      line-height : 35px
      color: black
    }
    .popup-header{
      color: green; 
      font-weight: normal; 
      font-size:20px;
    }
</style>