import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
  const isDrawerOpen = ref(false)

  function toggleDrawer () {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  return { isDrawerOpen, toggleDrawer }
})
