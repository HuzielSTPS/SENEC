<template>
    <q-dialog v-model="modal" persistent>
        <q-card :style="styleCard">
            <q-card-section class="bg-primary">
                <div class="row">
                <div class="col-sm-11 text-h6" style="color: white">{{ title }}</div>
                <div class="col-sm-1 pull-right"><q-btn color="white" flat v-close-popup round dense icon="close" /></div>
                </div>
            </q-card-section>
        <q-separator />
        <slot></slot>
        <q-card-actions align="right" style="vertical-align: bottom" v-show="this.showButtons">
            <q-btn flat v-for="button in getButtons"
            :class="typeof(button.class) === 'undefined' ? 'bg-positive text-white' : button.class"
            :style="typeof(button.style) === 'undefined' ? 'background-color: #21ba45;' : button.style"
            :color="typeof(button.color) === 'undefined' ? 'white' : button.color"
            v-bind:key="button.id" :icon="button.icon" :label="button.label"  v-on:click="$emit(button.click)" >
            </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script>
export default {
  name: 'waspModal',
  data () {
    return {
      modal: this.value
    }
  },
  computed: {
    getButtons () {
      return this.buttons
    }
  },
  watch: {
    modal (newValue) {
      this.$emit('input', newValue)
    },
    value (value) {
      this.modal = value
    }
  },
  created () {

  },
  methods: {
  },
  props: {
    showButtons: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    styleCard: {
      type: String,
      default: 'min-width: 40%; !important;'
    },
    value: {
      type: Boolean,
      default: true
    },
    buttons: {
      required: false,
      default: () => ([])
    }
  }
}
</script>
<style>
</style>
