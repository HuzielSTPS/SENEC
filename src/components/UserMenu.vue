<script setup>
import { useUserStore } from 'src/stores/user'
import { useDrawerStore } from 'src/stores/drawer'
import api from 'src/commons/api'

const user = useUserStore()
const drawer = useDrawerStore()

const nickname = user.name

function logOut () {
  api.get('/logout').then(() => {
    localStorage.removeItem('JWT')
    window.location.reload()
  })
}
defineProps({
  isExpanded: Boolean
})
</script>

<template>
  <div class="row items-center user-menu-container">
    <!-- Botón del drawer -->
    <q-btn
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      @click="drawer.toggleDrawer"
      class="icon-dessing"
    >
      <template v-if="isExpanded">
        <span class="q-ml-sm">Menú de Opciones</span>
      </template>
    </q-btn>

    <!-- Menú del usuario -->
    <q-btn-dropdown
      class="color-white"
      flat
      :label="isExpanded ? nickname : ''"
      icon="person"
    >
      <q-list>
        <q-item clickable v-close-popup @click="logOut">
          <q-item-section>
            <q-item-label class="responsive-label">Cerrar sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <template v-if="isExpanded">
      <div class="row justify-center logo-container">
        <img src="../assets/LOGOS_INS_NEW-color.png" width="250" style="z-index: 1" />
      </div>
    </template>
  </div>
</template>
