import Vue from 'vue';
import Vuex from 'vuex';

import user from './user'
import shared from './shared'
import blog from './blog'
import notification from './notification'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    blog: blog,
    notification: notification
  }
})