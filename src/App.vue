<template>
    <svg viewBox="0 0 1000 1000"
         xmlns="http://www.w3.org/2000/svg"
         height="500"
         width="500"
    >
        <circle cx="500" cy="500" r="400" fill="none" stroke="black" stroke-width="5"/>

        <disc px="500" py="500" pr="400" r="100" :a="angle" color="red"/>
        <disc px="500" py="500" pr="400" r="125" :a="angle" color="green"/>
        <disc px="500" py="500" pr="400" r="75" :a="angle" color="blue"/>
    </svg>
</template>

<script>
import Disc from './components/disc.svg'
export default {
  name: 'App',
  components: {
    disc: Disc,
  },
  data() {
    return {
      angle: 0,
      timer: null,
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.angle += 0.05;
    }, 1)
  }
}
</script>