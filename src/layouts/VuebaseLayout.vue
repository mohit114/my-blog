<template>
    <v-app>
        <v-navigation-drawer
                width="290"
                class="blue-grey darken-4"
                dark
                persistent
                :mini-variant="miniVariant"
                v-model="drawer"
                fixed
                app               
        >
            <v-toolbar flat class="transparent" dense>
                <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                    <v-list-tile>
                        <v-list-tile-action v-if="!miniVariant">
                          <v-avatar class="white" size="32">
                            <img src="https://avatars2.githubusercontent.com/u/22293973?s=460&v=4" alt="moh">
                          </v-avatar>
                        </v-list-tile-action>
                        <v-list-tile-content v-if="!miniVariant">
                            <v-list-tile-title><h3>Mohit Maharjan</h3></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click.stop="miniVariant = !miniVariant">
                                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>

            <v-tooltip right :disabled="!miniVariant">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile
                                to="/"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon>home</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Blogs</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <span>Blogs</span>
            </v-tooltip>
            <v-divider></v-divider>
            <v-list subheader :class="{'list-border-bottom' : miniVariant}">
                <v-subheader>Navigations</v-subheader>
                <div v-for="(item, index) in middleItems" :key="index">
                    <v-tooltip right :disabled="!miniVariant">
                        <v-list-tile
                                :key="item.icon"
                                :to="item.link"
                                exact
                                slot="activator"
                        >
                            <v-list-tile-action>
                                <v-icon v-html="item.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span v-text="item.title"></span>
                    </v-tooltip>
                </div>
            </v-list>
           
            <v-divider></v-divider>
            <div v-if="userIsAuthenticated">
            <v-list subheader>
                <v-subheader>Admin Section</v-subheader>
                <div v-for="(item, index) in topItems" :key="index">
                    <v-tooltip right :disabled="!miniVariant">
                        <v-list-tile
                                :key="item.icon"
                                :to="item.link"
                                exact
                                slot="activator"
                        >
                            <v-list-tile-action>
                                <v-icon v-html="item.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title style="font-size: 14px; font-weight: 500" v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span v-text="item.title"></span>
                    </v-tooltip>
                </div>
            </v-list>
             </div>
            <!--<v-divider></v-divider>-->
        </v-navigation-drawer>

        <v-toolbar
                app
                flat
                dense
                color="secondary"
                dark
        >
            <v-spacer></v-spacer>    
            <v-tooltip bottom>
                 <v-btn icon @click="dialog = true" slot="activator">
                        <v-icon>subscriptions</v-icon>
                </v-btn>
                <span>Subscribe to the blog</span>
            </v-tooltip>                       
            <v-tooltip bottom v-if="userIsAuthenticated">
                <v-btn icon @click.stop="rightDrawer = !rightDrawer" slot="activator">
                    <v-badge color="red" overlap>
                        <span slot="badge" v-if="isBadgeVisible">{{getUnreadCount}}</span>
                        <v-icon>notifications</v-icon>
                    </v-badge>
                </v-btn>
                <span>{{getUnreadCount}} unread notifications</span>
            </v-tooltip>
            <v-menu
                    bottom
                    left
                     v-if="userIsAuthenticated"
            >
                <v-btn icon slot="activator">
                     <v-icon medium>face</v-icon>
                </v-btn>
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <v-avatar class="primary" size="48px">
                                 <img src="https://avatars2.githubusercontent.com/u/22293973?s=460&v=4" alt="moh">
                            </v-avatar>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Mohit Maharjan</v-list-tile-title>
                            <v-list-tile-sub-title>Administrator</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile key="profile">
                        <v-list-tile-action>
                            <v-icon>person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>My Profile</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile key="lock_open" @click="logout">
                        <v-list-tile-action>
                            <v-icon>lock_open</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-content>
            <router-view />
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-form @submit.prevent="submit" ref="form" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="headline">Subscribe to the blog</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>             
                <v-flex xs12>
                  <v-text-field 
                    label="Email" 
                    required
                    prepend-icon="email"
                    color="green darken-2"
                    :rules="rules.emailRules"
                    v-model="form.email">
                </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat @click="closeDialog">Close</v-btn>
            <v-btn 
                color="blue darken-1" 
                flat
                type="submit"
                >Subscribe</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>
        </v-content>

        <v-navigation-drawer
                width="400"
                temporary
                :right="right"
                v-model="rightDrawer"
                fixed
                app
        >
            <v-toolbar flat prominent dark class="secondary">
                <v-toolbar-title>Notifications</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="rightDrawer = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list subheader dense>
                <v-subheader><h3>Messages</h3></v-subheader>
                <div v-for="notification in getNotifications" :key="notification._id">
                    <v-list-tile v-bind:style="{background: notification.isRead ? '#FFF' : '#E6F7D6'}" @click="showPopup(notification._id)">
                        <v-list-tile-action>
                            <div v-if="notification.isRead">
                                <v-icon>fas fa-envelope-open</v-icon>
                            </div>
                            <div v-else>
                                <v-icon>fas fa-envelope</v-icon>
                            </div>
                        </v-list-tile-action>
                        <v-list-tile-title>
                            <span v-bind:style="{fontWeight: notification.isRead ? 'normal' : 'bolder',
                            fontStyle: notification.isRead ? 'normal' : 'oblique'
                            }">
                                {{notification.fullName}} - {{notification.subject}}
                            </span>
                        </v-list-tile-title>
                    </v-list-tile>
                </div>
            </v-list>
        </v-navigation-drawer>
          <v-dialog
            v-model="messageDialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
         <v-card tile>
          <v-toolbar card dark color="secondary">
            <v-btn icon dark @click.native="messageDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Notification Message Detail</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div style="width: 80%; margin:auto; margin-top: 50px;">
             <v-container grid-list-sm text-xs-justify>
                 <v-layout row wrap>
                     <v-flex xs12 md4>
                        <v-card flat color="transparent">
                           <v-card-text style="color:#DC4C46">Sent By:</v-card-text>                                          
                        </v-card>
                     </v-flex>
                     <v-flex xs12 md8>
                        <v-card flat color="transparent">
                           <v-card-text><strong>{{message.fullName}}</strong></v-card-text>                                           
                        </v-card>
                        <v-divider></v-divider>
                     </v-flex>
                     <v-flex xs12 md4>
                        <v-card flat color="transparent">
                           <v-card-text style="color:#DC4C46">Email:</v-card-text>                                           
                        </v-card>
                     </v-flex>
                     <v-flex xs12 md8>
                        <v-card flat color="transparent">
                           <v-card-text><strong>{{message.email}}</strong></v-card-text>                                           
                        </v-card>
                        <v-divider></v-divider>
                     </v-flex>                    
                     <v-flex xs12 md4>
                        <v-card flat color="transparent">
                           <v-card-text style="color:#DC4C46">Contact Number:</v-card-text>                                           
                        </v-card>
                     </v-flex>
                     <v-flex xs12 md8>
                        <v-card flat color="transparent">
                           <v-card-text><strong>{{message.contactNo}}</strong></v-card-text>                                           
                        </v-card>
                        <v-divider></v-divider>
                     </v-flex>
                    <v-flex xs12 md4>
                        <v-card flat color="transparent">
                           <v-card-text style="color:#DC4C46">Received Date:</v-card-text>                                           
                        </v-card>
                     </v-flex>
                     <v-flex xs12 md8>
                        <v-card flat color="transparent">
                           <v-card-text><strong>{{message.receivedDate | moment("MMMM Do YYYY, h:mm:ss a")}}</strong></v-card-text>                                           
                        </v-card>
                         <v-divider></v-divider>
                     </v-flex>                   
                    <v-flex xs12 md4>
                        <v-card flat color="transparent">
                           <v-card-text style="color:#DC4C46">Subject:</v-card-text>                                           
                        </v-card>
                     </v-flex>
                     <v-flex xs12 md8>
                        <v-card flat color="transparent">
                           <v-card-text><strong>{{message.subject}}</strong></v-card-text>                                           
                        </v-card>
                         <v-divider></v-divider>
                     </v-flex>
                      
                    <v-flex xs12 md4>
                        <v-card flat color="transparent">
                           <v-card-text style="color:#DC4C46">Message:</v-card-text>                                           
                        </v-card>
                     </v-flex>
                     <v-flex xs12 md8>
                        <v-card flat color="transparent">
                           <v-card-text><strong>{{message.body}}</strong></v-card-text>                                           
                        </v-card>
                         <v-divider></v-divider>
                     </v-flex>
                 </v-layout>
             </v-container>             
          </div>
         </v-card>
          </v-dialog>
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
    </v-app>
</template>

<script>
    import firebase from 'firebase'
    import axios from 'axios';
    export default {
        name: 'VuebaseLayout',
        data () {
             const defaultForm = Object.freeze({
                    email: ''
                })
            return {
                form: Object.assign({}, defaultForm),
                drawer: true,
                fixed: false,
                dialog: false,
                messageDialog: false,
                isBadgeVisible: false,
                message:{
                    fullName: '',
                    email: '',
                    contactNo: '',
                    subject: '',
                    body: '',
                    receivedDate: ''
                },
                snackBarProp:{
                     snackbar: false,
                     color: 'success',
                     timeout: 8000,
                     text: '',
                     mode: 'vertical'
                },
                email: '',
                topItems: [
                    {
                        icon: 'library_add',
                        title: 'Add Blog',
                        link: '/addblog'
                    },
                    {
                        icon: 'content_cut',
                        title: 'Manage Blog',
                        link: '/editblog'
                    },
                    {
                        icon: 'group',
                        title: 'Edit Profile',
                        link: '/profile'
                    },
                ],
                middleItems: [
                    {
                        icon: 'archive',
                        title: 'Archives',
                        link: '/archive'
                    },
                    {
                        icon: 'important_devices',
                        title: 'WorkBook ',
                        link: '/workbook'
                    },
                    {
                        icon: 'person',
                        title: 'About',
                        link: '/about'
                    },
                    {
                        icon: 'mail_outline',
                        title: 'Contact',
                        link: '/contact'
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                rules: {
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ]
                }
            }
        },

        methods: {
             submit () {
              if (this.$refs.form.validate()) {
                axios.post(`https://void-blog-api.herokuapp.com/subscribe`,
                  this.form
                  ).then(response => {
                    this.dialog = false;
                    this.snackBarProp.text = response.data.message
                    this.snackBarProp.snackbar = true;
                    this.form = Object.assign({}, this.defaultForm)
                    this.$refs.form.reset()
                }).catch(err => {
                    console.log('Error : ' + err.message);
                    this.dialog = false;
                })
            }
          },
            logout(){
                this.$store.dispatch('logout')
                this.$router.push('/')
            },
            showPopup(notificationId){
                this.rightDrawer = false;               
                var selectedMessage = this.$store.getters.notification.filter(function(msg){
                    return msg._id === notificationId
                });
                if(selectedMessage.length > 0 && selectedMessage[0].isRead == false)
                {
                    this.message.fullName = selectedMessage[0].fullName;
                    this.message.email = selectedMessage[0].email;
                    this.message.contactNo = selectedMessage[0].contact;
                    this.message.subject = selectedMessage[0].subject;
                    this.message.body = selectedMessage[0].message;
                    this.message.receivedDate = selectedMessage[0].receivedDate;
                    this.messageDialog = true;

                    this.$store.dispatch('markRead', {notificationId : notificationId})                 
                }
                else{
                     this.message.fullName = selectedMessage[0].fullName;
                     this.message.email = selectedMessage[0].email;
                     this.message.contactNo = selectedMessage[0].contact;
                     this.message.subject = selectedMessage[0].subject;
                     this.message.body = selectedMessage[0].message;
                     this.message.receivedDate = selectedMessage[0].receivedDate;
                     this.messageDialog = true;
                }
                
            },
            closeDialog(){
                this.form = Object.assign({}, this.defaultForm);
                this.$refs.form.reset();
                this.dialog = false;
            }                 
        },
        computed: {
            formIsValid () {
                return (
                this.email 
                )
            },
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            getNotifications() {
                return this.$store.getters.notification
            },
            getUnreadCount() {
              let unreadMessages = this.$store.getters.notification.filter(function(item){
                   return item.isRead === false;
               });
               this.isBadgeVisible = unreadMessages.length > 0;
               return unreadMessages.length;             
            }
       } 
    }

</script>

<style scoped lang="stylus">
    @import '../../node_modules/vuetify/src/stylus/settings/_variables.styl'

    .bottom-menu {
        position: absolute;
        width: 100%;
        bottom: 0;
    }

    .searching {
        overflow: hidden;
        width: 208px;
        padding-left: 8px;
        transition: $primary-transition;
    }

    .searching--closed {
        padding-left: 0;
        width: 0;
    }

    .searching > * {
        right: 8px;
    }

    .searching--closed > * {
        display: none;
    }

    .hidden-searching {
        @media $display-breakpoints.sm-and-down {
            display: none !important;
        }
    }

    .list-border-bottom {
        border-bottom: 1px solid rgba(255, 255, 255, .12);
    }
    .margin_left{
        margin-left : 5px;
    }
</style>
