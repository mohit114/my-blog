<template>
<v-form @submit.prevent="submit" ref="form" enctype="multipart/form-data" lazy-validation>
<v-container grid-list-md style="width: 80%">
   <v-layout wrap>
        <v-flex xs12>
            <v-card flat color="transparent">
                <v-card-title style="padding-left:0px" primary-title><h1 style="color:#DC4C46">Add Blog</h1></v-card-title>                                                    
            </v-card>
        </v-flex>
        <v-flex xs12>
             <v-text-field
              color="purple darken-2"
              label="Title"
              required
              v-model="form.blogTitle"
              :rules="rules.name"
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
              color="teal"
              multi-line
              required
              v-model="form.blogSnippet"
              :rules="rules.name"
            >
              <div slot="label">
                Snippet*
              </div>
            </v-text-field>
          </v-flex>
        <v-flex xs12 style="padding: 0px">
        <v-btn raised class="primary" @click="onPickFile">Add Image</v-btn>
        <input type="file" id="blog_image_file" @change="onFilePicked" name="blogImage" style="display: none" accept="image/*" ref="blogFileInput">
        </v-flex>
        <v-flex xs12 v-show="hasLoadedAnImage">
            <img :src="imagePreview" height="200px" width="200px">
        </v-flex>
        <v-flex xs12 style="margin-top: 20px">
            <tinymce id="d1" v-model="form.blogBody" label="Blog Body" required :rules="rules.name"></tinymce>
        </v-flex>
    </v-layout>
     <v-layout>
    <v-flex xs12>
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
</v-form>
</template>
  
<script>
import axios from 'axios'
import firebase from 'firebase'
export default {
    data () {
            const defaultForm = Object.freeze({
            blogTitle: '',
            blogSnippet: '',
            blogBody: '',
            blogImageUrl: ''
        })
        return{
            hasLoadedAnImage: false,
            imagePreview: '',
            blogImage: null,
            form: Object.assign({}, defaultForm),
            snackBarProp:{
                snackbar: false,
                color: 'success',
                timeout: 8000,
                text: '',
                mode: 'vertical'
            },
            rules: {
            name: [val => (val || '').length > 0 || 'This field is required']
            }
        }
    },
    methods:{
        resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset();
        document.getElementById("blog_image_file").value = "";
        this.hasLoadedAnImage = false;
      },
      submit () {
        if (this.$refs.form.validate()) {
            const filename = this.blogImage.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            let loader = this.$loading.show();
            firebase.storage().ref('BlogImages/' + Date.now() + '_' + filename).put(this.blogImage).then(fileData => {
                this.form.blogImageUrl = fileData.metadata.downloadURLs[0];
                return axios.post(`https://void-blog-api.herokuapp.com/addBlog`,this.form)
            })
            .then(response => {
              if(!response.data.error){
                this.$store.dispatch('addBlog', response.data.output)
              }
              loader.hide()
              this.resetForm();
              this.snackBarProp.text = response.data.message;
              this.snackBarProp.snackbar = true;
            }).catch(err => {
              loader.hide()
              console.log('Error : ' + err.message);
          })
        }
      },
      onPickFile (){
          this.$refs.blogFileInput.click()
      },
      onFilePicked (event){
          const files = event.target.files
          let fileName = files[0].name
          if(fileName.lastIndexOf('.') <= 0){
              return alert('Please add a valid file.');
          }
          this.hasLoadedAnImage = true
          //turn this binary file to base64 string (img tag src property can load base64 string image)
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
              this.imagePreview = fileReader.result 
          })
          fileReader.readAsDataURL(files[0])
          this.blogImage = files[0]
      }
    }
}
</script>

<style>

</style>
