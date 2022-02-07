import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

const provider = new GoogleAuthProvider();

export default createStore({
  state: {
    user: null,
    token: null,
    menu_is_active: false,
    errors: []
  },

  mutations: {
    // Set the user from a firebase auth object
    SET_USER: (state, user) => {
      state.user = user
    },

    // Clear the user to log out
    CLEAR_USER: (state) => {
      state.user = null
    },

    // Set token
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    // Toggle the menu
    TOGGLE_MENU: (state) => {
      state.menu_is_active = !state.menu_is_active
    },

    // Set errors
    SET_ERRORS: (state, errors) => {
      state.errors = errors
    }
  },
  
  actions: {
    async login ({ commit, state }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            commit('SET_ERRORS', [...state.errors, 'User not found'])
            break
          case 'auth/wrong-password':
            commit('SET_ERRORS', [...state.errors, 'Wrong password'])
            break
          default:
            commit('SET_ERRORS', [...state.errors, error.message])
            break
        }

        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async register ({ commit, state }, { email, password }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            commit('SET_ERRORS', [...state.errors, 'Email already in use'])
            break
          case 'auth/invalid-email':
            commit('SET_ERRORS', [...state.errors, 'Invalid email'])
            break
          case 'auth/operation-not-allowed':
            commit('SET_ERRORS', [...state.errors, 'Operation not allowed'])
            break
          default:
            commit('SET_ERRORS', [...state.errors, 'Something went wrong'])
            break
        }

        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async logout ({ commit, state }) {
      try {
        await signOut(auth)
      } catch (error) {
        commit('SET_ERRORS', [...state.errors, error.message])
      }

      commit('CLEAR_USER')

      router.push('/login')
    },

    loginWithGoogle ({ commit, state }) {
      try {
        signInWithPopup(auth, provider)
          .then(result => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            
            commit('SET_TOKEN', token)
            commit('SET_USER', result.user) 
          })
      } catch (error) {
        commit('SET_ERRORS', [...state.errors, error.message])
        return
      }

      router.push('/')
    },

    RemoveError ({ commit, state }, error) {
      commit('SET_ERRORS', state.errors.filter(e => e !== error))
    },

    FetchUser ({commit}) {
      auth.onAuthStateChanged(async user => {
        if (user === null)  {
          commit('CLEAR_USER')
          return
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    },

    toggleMenu ({ commit }) {
      commit('TOGGLE_MENU')
    }
  },

  getters: {
    // Get the user from the state
    user: (state) => {
      return state.user
    },

    // Get auth state
    isAuthenticated: (state) => {
      return !!state.user
    },

    // Get Errors
    errors: (state) => {
      return state.errors
    }
  }
})
