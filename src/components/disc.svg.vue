<template>
    <g fill="none" :stroke="disc.color" stroke-width="5">
        <g>
            <line :x1="disc.center.x" :x2="disc.p.x" :y1="disc.center.y" :y2="disc.p.y"/>
            <circle :cx="disc.center.x" :cy="disc.center.y" :r="disc.r" fill="none"/>
        </g>
    </g>
</template>

<script>
export default {
  name: 'Disc',
  props: {
    disc: {
      type: Object,
    },
  }
}
</script>