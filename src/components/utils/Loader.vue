<template>
  <pulse-loader
    size="10px"
    color="#a49a87" />
</template>

<script>
  import PulseLoader from 'vue-spinner/src/PulseLoader';

  export default {
    name: 'jch-loader',

    components: {
      PulseLoader,
    },
  };
</script>
