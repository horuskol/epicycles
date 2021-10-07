<template>
    <g fill="none"
       :stroke="color"
       stroke-width="5"
       @mouseenter="hover = true"
       @mouseleave="hover = false"
       @click.prevent="$emit('click')"
       class="pointer-events-visible">
        <circle :cx="disc.center.x" :cy="disc.center.y" :r="disc.r" fill="none"/>
        <line :x1="disc.center.x" :x2="disc.p.x" :y1="disc.center.y" :y2="disc.p.y"/>
    </g>
</template>

<script>
export default {
  name: 'Disc',
  props: {
    disc: {
      type: Object,
    },
    selected: {
      type: Boolean,
    }
  },
  emits: [
    'click',
  ],
  data() {
    return {
      hover: false
    }
  },
  computed: {
    color() {
      if (this.hover || this.selected) {
        return 'black'
      }
      return `rgba(${this.disc.color[0]}, ${this.disc.color[1]}, ${this.disc.color[2]}, 1)`
    }
  }
}
</script>