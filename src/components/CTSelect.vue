<template>
  <select :value="value" @change="$emit('input', $event.target.value)">
    <option disabled value="">Please select one</option>
    <option v-for="option in values" :key="option">{{ option }}</option>
  </select>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    values: {
      required: true
    }
  }
});
</script>
