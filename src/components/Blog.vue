<template>
    <v-container fluid>
        <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2 mt-3>
            <span class="grey--text">{{blog.AddedDate | moment("MMMM Do YYYY")}} by {{blog.AddedBy}}</span>
        </v-flex>
        <v-flex xs12 sm8 offset-sm2 mt-3>
            <h2 class="blog-heading">{{blog.Title}}</h2>
        </v-flex>
        <v-flex xs12 sm8 offset-sm2 mt-3 text-xs-justify>
            <div style="margin-top: 20px">
            <span v-html="blog.Body"></span>
            </div>
        </v-flex>
        <v-flex xs12 sm8 offset-sm2 mt-3><v-divider></v-divider></v-flex>
        
        <v-flex xs12 sm8 offset-sm2 mt-3 style="margin-top:25px;">
            <v-card flat color="white" style="padding:5px">
                <v-card-title primary-title><h2 style="color:#DC4C46">About The Author</h2></v-card-title>
                <v-layout row wrap>
                <v-flex xs12 sm3 text-xs-center>
                   <v-avatar
                    :tile=false
                    :size=80
                    color="grey lighten-4"
                    >
                    <img src="../../static/profile.jpg" alt="avatar">
                    </v-avatar>
                </v-flex>
                <v-flex xs12 sm9 text-xs-center>
                    <span>
                        I'm Mohit Maharjan, co-founder of Maharjan and Groups Software, and CEO of Dream World. 
                        <router-link class="link-p" to="/about">More about me.</router-link> 
                    </span>
                </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    data() {
            return{
                blog: {}
            }
        },
        methods: {
            fetchBlogById(){
                var blogId = this.$route.params.id
                axios.get('https://void-blog-api.herokuapp.com/blog/' + blogId).then(response => {
                this.blog = response.data;       
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        created: function(){
            this.fetchBlogById()
        }
    }
</script>
<style scoped lang="stylus">
.blog-heading{
    font-size: 35px;
    color: #DC4C46
}
.date{
    font-family: Verdana, Geneva, Tahoma, sans-serif 
    color: #424242
    font-size: 13px
}
.link-p{
    text-decoration: none
    color: red
}
span{
    font-size: 17px;
    font-family: Open Sans
}
ul{
    list-style-type: none;
}
</style>

              

            