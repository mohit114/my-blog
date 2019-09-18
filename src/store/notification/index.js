import axios from 'axios';

export default {
	state: {
		notifications: []
	},
	mutations: {
		setNotification (state, payload) {
			state.notifications = payload
		},
		markAsRead (state, payload){
		  let selectedMessage = state.notifications.filter(function(msg){
                return msg._id === payload.Id
          });
		  selectedMessage[0].isRead = true;
		},
		addNotification (state, payload) {
			state.notifications.unshift(payload)
		}
	},
	actions: {
		getNotifications ({commit}) {
		 axios.get('https://void-blog-api.herokuapp.com/messages').then(response => {
		   commit('setNotification', response.data)
	       }).catch(e => {
	       	console.log(e)
	      })
	   },
	   markRead ({commit}, payload) {
	   	 axios.put('https://void-blog-api.herokuapp.com/mark/' + payload.notificationId).then(response => {
	   	 		commit('markAsRead', {Id: payload.notificationId})
            }).catch(err => {
                console.log('Error : ' + err.message);
          })
	   },
	   insertNotification({commit}, payload) {
	   		commit('addNotification', payload)
	   }
	},
	getters : {
		notification (state) {
			return state.notifications
		}
	}
}