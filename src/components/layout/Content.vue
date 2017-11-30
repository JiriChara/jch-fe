<template>
  <div class="columns">
    <div class="column is-8">
      <slot></slot>
    </div>

    <div class="column">
      <slot name="side">
      </slot>
    </div>
  </div>
</template>
