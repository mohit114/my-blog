<template>
 <v-container grid-list-md style="width: 85%">
        <v-layout row wrap style="margin-top: 40px">
          <v-flex xs12 sm6 md3 text-xs-center style="max-height: 245px;">
             <v-avatar 
          :tile="false"
          :size=210
          class="grey lighten-4"
        >
          <img src="../../static/profile.jpg" alt="avatar">
        </v-avatar>
          </v-flex>
          <v-flex xs12 sm6 md9 text-xs-justify>
            <v-card flat class="justify-center">
              <v-card-text>Hello, I am Mohit Maharjan, author of this blog. My profession includes software development, programming and software engineering. I am working as a Software Engineer at Nepasoft Solutions Pvt Ltd. since June 2014. I started blogging to share some of my experiences that I acquired throughout my work life.  Being a tech guy, I will be sharing blogs related to various new programming frameworks, current technologies and also some programming experiences that I acquired during my work period. I consider this blog will be helpful to new programmers and software engineering who are ready to begin their career. Programming is easy to learn but hard to master. It is an art of problem-solving, the more you spend your time, more you move towards perfection. In my opinion, everyone should have some knowledge regarding programming and how technology fits into our daily life.</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap style="margin-top: 30px">
          <v-flex xs12>
            <v-card flat color="transparent">
              <v-card-title primary-title style="padding-left:0px"><h2 style="color:#DC4C46">Works Completed</h2></v-card-title>
            </v-card>
          </v-flex>
          <template v-for="work in worksCompleted">
          <v-flex xs12 sm6 md4  :key="work.workId">
            <v-card>
              <v-card-media 
              v-bind:src="'../../static/' + work.imageUrl" height="200px">
              </v-card-media>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{work.heading}}</h3>
                  <div>{{work.shortDescription}}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="orange">Visit</v-btn>
                <v-btn flat color="orange">More</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          </template>
        </v-layout>
        <v-layout row wrap style="margin-top: 30px">
          <v-flex xs12 sm6>
            <v-card flat color="white">
              <v-card-title primary-title><h2 style="color:#DC4C46">Follow by E-mail</h2></v-card-title>
              <v-card-text>If you sign up you will receive best posts via email. Over 1,000 people have signed up.</v-card-text>
              <v-form @submit.prevent="submit" ref="form" lazy-validation>
                 <v-text-field
                    color="green darken-2"
                    label="Email"
                    required
                    :rules="rules.emailRules"
                    v-model="form.email"
                    prepend-icon="email"
                  ></v-text-field>              
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="red" @click="resetForm">Clear</v-btn>
                     <v-btn
                      flat
                      color="primary"
                      type="submit"
                    >Subscribe</v-btn>                 
                  </v-card-actions>   
                </v-form>        
              </v-card>          
          </v-flex>
           <v-flex xs12 sm6>
            <v-card flat color="white">
              <v-card-title primary-title><h2 style="color:#DC4C46">Socials</h2></v-card-title>
              <v-layout row wrap>
                <span class="group pa-2">
                    <a href="https://www.facebook.com/mohit.maharzan" target="_blank"><v-icon class="icon-cursor" style="color:#4867AA" x-large>fab fa-facebook</v-icon></a>                   
                    <a href="https://twitter.com/Dipsimo8" target="_blank"><v-icon class="icon-cursor" style="color:#1DA1F2" x-large>fab fa-twitter</v-icon></a>
                    <a href="https://www.linkedin.com/in/mohit-maharjan-a5445896/" target="_blank"><v-icon class="icon-cursor" style="color:#0077B5" x-large>fab fa-linkedin</v-icon></a>
                    <a href="https://www.youtube.com/channel/UC29YeU0ldeKs7y_mRSHe4mg?view_as=subscriber" target="_blank"><v-icon class="icon-cursor" style="color:#FF0000" x-large>fab fa-youtube</v-icon></a>
                    <a href="https://github.com/mohit114" target="_blank"><v-icon class="icon-cursor" style="color:#000000" x-large>fab fa-github</v-icon></a>
                    <a href="https://stackoverflow.com/users/4243484/mohit" target="_blank"><v-icon class="icon-cursor" style="color:#F37500" x-large>fab fa-stack-overflow</v-icon></a>                                                                                 
                  </span>
                </v-layout>
              </v-card>
          </v-flex>
          </v-layout>
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
 </v-container>
</template>

<script>
import axios from 'axios';
  export default {
    data (){
      const defaultForm = Object.freeze({
        email: ''
      })
      return{
        form: Object.assign({}, defaultForm),
        snackBarProp:{
            snackbar: false,
            color: 'success',
            timeout: 8000,
            text: '',
            mode: 'vertical'
        },
        worksCompleted: [
          {
            workId: 1,
            heading: 'Taja Samachar',
            shortDescription: 'A complete web application for news posts as well as blogging.',
            imageUrl: 'sunshine.jpg',
            Description: 'here goes the full description of the project',
            link: ''           
          },
          {
            workId: 2,
            heading: 'Mero Pharmacy',
            shortDescription: 'An online portal to place an order for medicines as per perscribed.',
            imageUrl: 'desert.jpg',
            Description: 'here goes the full description of the project',
            link: ''           
          },
          {
            workId: 3,
            heading: 'Attendance System',
            shortDescription: 'An attendance management system to record staff activities.',
            imageUrl: 'road.jpg',
            Description: 'here goes the full description of the project',
            link: ''   
          },    
          {
             workId: 4,
             heading: 'Restaurant System',
             shortDescription: 'A complete restaurant software system for D-Lunch Hut.',
             imageUrl: 'hotel.jpg',
             Description: 'here goes the full description of the project',
             link: ''           
           }
        ],
          rules:{
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
          },
          defaultForm
        }
      },
        methods:{
           resetForm () {
              this.form = Object.assign({}, this.defaultForm)
              this.$refs.form.reset()
            },
           submit () {
              if (this.$refs.form.validate()) {
                axios.post(`https://void-blog-api.herokuapp.com/subscribe`,
                  this.form
                  ).then(response => {
                    this.resetForm()
                    this.snackBarProp.text = response.data.message
                    this.snackBarProp.snackbar = true;
                }).catch(err => {
                    console.log('Error : ' + err.message);
                })
            }
          }
        },
        computed: {
          formIsValid () {
            return (
              this.email
            )
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
  .icon-cursor{
    cursor: pointer
    padding: 0px 0 0 13px
  }
</style>
