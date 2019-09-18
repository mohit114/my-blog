import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from '@/components/Home'
import Archive from '@/components/Archives'
import About from '@/components/About.vue'
import Workbook from '@/components/WorkBook.vue'
import Contact from '@/components/Contact.vue'
import Login from '@/components/Login.vue'
import AddBlog from '@/components/AddBlog.vue'
import EditBlog from '@/components/EditBlog.vue'
import Profile from '@/components/Profile.vue'
import Blog from '@/components/Blog.vue'
import {store} from '@/store/store'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/archive',
            name: 'Archive',
            component: Archive
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/workbook',
            name: 'Workbook',
            component: Workbook
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/addblog',
            name: 'AddBlog',
            component: AddBlog,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/editblog',
            name: 'EditBlog',
            component: EditBlog,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/blog/:id',
            name: 'Blog',
            component: Blog
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
            if (store.getters.user) {
                next()
            }
            else{
                next('/')
            }
    }
    else{
        next()
    }
})

export default router
