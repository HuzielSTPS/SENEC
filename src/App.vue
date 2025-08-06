<template>
  <router-view />
</template>

<script>
import axios from 'axios'
import { useUserStore } from './stores/user'

export default {
  name: 'App',
  data () {
    return {
      canRender: false
    }
  },
  setup: () => ({ user: useUserStore() }),
  created () {
    const JWT = localStorage.getItem('JWT')

    if (JWT !== null && JWT !== '') {
      axios.defaults.headers.common.Authorization = `Bearer ${JWT}`
      this.user.check()
    } else {
      this.canRender = true
      this.$router.push('/login')
    }
  }
}
</script>
