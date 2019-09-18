<template>
  <v-container fluid>
    <v-layout>
            <v-flex xs12 sm10 offset-sm1>
              <v-card flat color="transparent">
                <v-card-title primary-title style="padding-left:0px"><h1 style="color:#DC4C46">Historical Archive</h1></v-card-title>
                <v-card-text style="padding-left:0px">5 posts over 1 years. Everything I’ve ever published is right here.</v-card-text>
              </v-card>
            </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-card flat>
          <v-card-text>
            <ul>
              <li>
                <h3>2018</h3>
              </li>
              <li><a href="#">May</a></li>
              <li><a href="#">June</a></li>
              <li><a href="#">July</a></li>
            </ul>    
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
     
    })
  }
</script>

<style scoped lang="stylus">
li{
  display: inline-block;
  padding: 0 5px;
}
a{
  text-decoration: none
  color: #F44336
}
</style>
