<template>
  <div class="columns">
    <div class="column is-8">
      <slot></slot>
    </div>

    <div class="column">
      <slot name="side">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
        no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </slot>
    </div>
  </div>
</template>
