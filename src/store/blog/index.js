import axios from 'axios';

export default {
	state: {
		allBlogs: []
	},
	mutations: {
		setBlogs (state, payload) {
			state.allBlogs = payload
		},
		pushBlog (state, payload) {
			state.allBlogs.unshift(payload)
		}	
	},
	actions : {
		getBlogs ({commit}) {
		  	axios.get(`https://void-blog-api.herokuapp.com/blog`)
            .then(response => {
                 commit('setBlogs', response.data)
            })
            .catch(err => {
                 console.log(err.message);
            })
		},
		addBlog ({commit}, payload) {
			commit('pushBlog', payload)
		}
	},
	getters : {
		blogs (state) {
			return state.allBlogs
		}
	}
}