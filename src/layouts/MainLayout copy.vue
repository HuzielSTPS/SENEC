<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="header-aleph">
    <q-toolbar class="q-px-md">
  <q-toolbar-title>
    <q-avatar class="icon-main"></q-avatar>
  </q-toolbar-title>

  <q-space />

  <!-- Grupo de usuario + menú administración -->
  <div class="row items-center" style="background-color: #9B2247;color: #fff !important;border-radius: 10px;box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; margin-top: 1%;">
    <!-- Ícono de administración (drawer) -->
    <q-btn
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      @click="toggleLeftDrawer"
      class="icon-dessing"
    />

    <!-- Usuario -->
    <q-btn-dropdown class="color-white" flat :label="`${nickname}`">
      <q-list>
        <q-item clickable v-close-popup @click="logOut()">
          <q-item-section>
            <q-item-label>Cerrar sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</q-toolbar>

    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="custom-drawer"
      behavior="mobile"
      :breakpoint="0"
    >
      <q-list>
        <q-expansion-item
          expand-separator
          label="Administración del Sistema"
          v-if="hasRole(['ADMIN'])"
          class="custom-expansion-item"
          group="menu-group"
        >
        <q-item to="/roles" v-if="hasRole(['ADMIN'])">
            <q-item-section avatar>
              <q-icon name="supervisor_account" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Roles</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/users" v-if="hasRole(['ADMIN'])">
            <q-item-section avatar>
              <q-icon name="supervisor_account" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Usuarios</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/movements" v-if="hasRole(['ADMIN'])">
            <q-item-section avatar>
              <q-icon name="supervisor_account" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Movimientos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/logs" v-if="hasRole(['ADMIN'])">
            <q-item-section avatar>
              <q-icon name="supervisor_account" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logs</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated style="float: right;  text-align: right;" class="footer-background">
        <q-toolbar style="float: right;  text-align: right;" >
          <q-toolbar-title>
        </q-toolbar-title>
          <div>
          <img src="../assets/LOGOS_INS_NEW-color.png" width="380">
        </div>
        </q-toolbar>
      </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { openURL } from 'quasar'
import api from '../commons/api.js'
import { hasRole } from 'src/commons/utils'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(true)
    const user = useUserStore()

    return {
      hasRole,
      leftDrawerOpen,
      user,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  mounted () {
    this.toggleLeftDrawer()
  },
  computed: {
    nickname () {
      return this.user.name
    }
  },

  methods: {
    openURL,
    openProfile () {
      this.$router.push('/profile')
    },
    openRep (url) {
      this.$router.push(url)
    },
    logOut () {
      api.get('/logout').then(async ({ data }) => {
        localStorage.removeItem('JWT')
        window.location.reload()
      })
    }
  }
})
</script>

<style >
 .custom-drawer {
    background-color: #ececec;
  }
  .custom-expansion-item:hover,
  .custom-expansion-item.q-expansion-item--expanded {
  background-color: #000;
  color: #fff;
}
.custom-expansion-item .q-icon{
  color: #000;
}
.custom-expansion-item:hover .q-icon{
  color: #fff;
}
.custom-expansion-item.q-expansion-item--expanded .q-icon{
  color: #fff;
}
.custom-expansion-item.q-expansion-item--expanded .q-item__label {
  color: #fff !important;
}
/* Estilo para el q-item seleccionado */
.q-item.q-router-link--active {
  background-color: #474747 !important; /* Gris */
  color: #fff !important;
}
.q-layout__shadow::after{
  box-shadow: none;
}
.q-toggle__inner--truthy {
  color: #621132;
}
</style>
