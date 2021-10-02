<template>
    <g fill="none" :stroke="color" :transform="`translate(${origin.x}, ${origin.y}) rotate(${rotate}, ${r}, ${pr}) `">
        <g :transform="`rotate(${-a}, ${center.x}, ${center.y})`">
            <line :x1="center.x" :x2="center.x" y1="0" :y2="center.y"/>
            <circle :cx="r" :cy="r" :r="r" fill="none"/>
        </g>
    </g>
</template>

<script>
export default {
  name: 'Disc',
  props: {
    px: {
      type: Number,
    },
    py: {
      type: Number,
    },
    pr: {
      type: Number,
    },
    r: {
      type: Number,
    },
    a: {
      type: Number,
    },
    color: {
      type: String,
    }
  },
  computed: {
    center() {
      return {
        x: this.r,
        y: this.r,
      }
    },
    origin() {
      return {
        x: this.px - this.r,
        y: this.py - this.pr,
      }
    },
    rotate() {
      return this.a * (this.pr / this.r);
    }
  }
}
</script>