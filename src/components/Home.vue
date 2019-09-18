<template>
        <v-container grid-list-md>
            <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card flat color="transparent">
                         <v-text-field
                            color="blue darken-2"
                            label="Search blogs"
                            v-model="search"
                            ></v-text-field>                                                      
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout>
               <v-flex xs12>
                    <v-card flat color="transparent">
                     <v-card-title style="padding-left:0px" primary-title><h1 style="color:#DC4C46">What's new?</h1></v-card-title>                                                    
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row wrap>              
                <v-flex xs12 sm6 v-for="recentBlog in filteredBlogs" :key="recentBlog._id">
                    <v-card flat>
                        <v-card-text><span class="grey--text">{{recentBlog.AddedDate | moment("MMMM Do YYYY")}} by {{recentBlog.AddedBy}}</span><br>
                        <span><h2>{{recentBlog.Title}}</h2></span>
                        </v-card-text>  
                        <v-card-text>
                            {{recentBlog.Snippet}} <br>
                            <router-link class="blog-link" v-bind:to="'/blog/' + recentBlog._id">Read more</router-link>
                        </v-card-text>                
                    </v-card>
                </v-flex>
            </v-layout>
             <v-layout style="margin-top: 20px">
               <v-flex xs12>
                    <v-card flat color="transparent">
                     <v-card-title primary-title style="padding-left:0px"><h1 style="color:#DC4C46">Reading lists</h1></v-card-title>                                                    
                    </v-card>
                </v-flex>
            </v-layout>
             <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <v-card tile>
                     <v-card-title primary-title><h2>Blog Topics</h2></v-card-title>
                        <v-card-text>Below are some of the top blog topics sorted by their popularity:                               
                        </v-card-text>  
                     <v-card-title primary-title><h3>Top 5</h3></v-card-title>   
                     <v-card-text>
                        <li><a href="#">UI/UX</a></li>
                        <li><a href="#">Software Development</a></li>
                        <li><a href="#">REST API</a></li>
                        <li><a href="#">Digital Marketing</a></li>
                    </v-card-text>                       
                    </v-card>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-card tile>
                     <v-card-title primary-title><h2>High Rated Blogs</h2></v-card-title>
                        <v-card-text>Below are some of the higly discussed blogs. Must watch.<br><br>
                        <div>
                        <ul>
                            <li v-for="rBlogs in highRatedBlogs" :key="rBlogs._id">
                                <router-link v-bind:to="'/blog/' + rBlogs._id">{{rBlogs.Title}}</router-link>
                                <br>
                            </li>
                         </ul>
                        </div>
                        </v-card-text>                         
                    </v-card>
                </v-flex>
             </v-layout>
        </v-container>
</template>

<script>
    export default {
        data () {
            return {   
                search: ''  
            }
        },
        computed:{
            filteredBlogs: function() {
                return this.$store.getters.blogs.filter((blog) => {
                    return blog.Title.toLowerCase().match(this.search.toLowerCase());
                });
            },
            highRatedBlogs: function() {
                return this.$store.getters.blogs.filter(function(blog){
                     return blog.IsHighRated === true;
                 });
            }
        }
    }
</script>

<style scoped lang="stylus">
.blog-link{
    color:  #F44336
    text-decoration: none
}
a{
    text-decoration: none
    color: #F44336
}
li{
    padding-top: 18px
}
ul {
  list-style-type: none;
}
</style>