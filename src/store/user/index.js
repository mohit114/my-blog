import * as firebase from 'firebase'

export default {
	state: {
		user: null
	},
	mutations: {
		setUser (state, payload) {
			state.user = payload
		}
	},
	actions: {
		signUserIn ({commit}, payload) {			
			commit('setLoading', true)
			commit('clearError')
			 firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
                (user) => {
                	commit('setLoading', false)
                	const newUser = {
                		id: user.uid,
                		role: 'admin'
                	}
                	commit('setUser', newUser)               	
                },
                (err) => {
                	 commit('setLoading', false)
        			 commit('setError', err)
                     console.log(err)
                }
            )
		},
	 	autoSignIn ({commit}, payload) {
	      	commit('setUser', {
	        id: payload.uid,
	        role: 'admin'
	      })
	    },
	    logout ({commit}) {
	      firebase.auth().signOut()
	      commit('setUser', null)
    	}
	},
	getters: {
		user (state) {
			return state.user
		}
	}
}