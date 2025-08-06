import { defineStore } from 'pinia'
import api from '../commons/api.js'
import { LocalStorage } from 'quasar'

export const useUserStore = defineStore('user', {
  state: () => ({
    counter: 1,
    name: LocalStorage.getItem('name'),
    email: LocalStorage.getItem('email'),
    roles: LocalStorage.getItem('roles')
  }),

  getters: {
    getName (state) {
      return state.name
    },
    getRoles (state) {
      return state.roles
    }
  },

  actions: {
    logout () {
      this.$patch({
        name: '',
        email: false,
        roles: []
      })

      // we could do other stuff like redirecting the user
    },
    check () {
      api.get('/check').then(({ data }) => {
        this.$patch({
          name: data.user.name,
          email: data.user.email,
          roles: data.roles
        })
        LocalStorage.set('name', data.user.name)
        LocalStorage.set('roles', data.roles)
        LocalStorage.set('email', data.user.email)
      }).catch(() => {
        this.$patch({
          name: '',
          email: '',
          roles: []
        })
      })
    }
  }
})
