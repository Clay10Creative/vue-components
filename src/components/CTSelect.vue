<template>
  <div>
    <select :value="value" @change="$emit('input', $event.target.value)">
      <option disabled value="">Please select one</option>
      <option v-for="option in values" :key="option">{{ option }}</option>
    </select>
    {{ value }} {{ values }}
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      required: true,
      type: [String, Number]
    },
    values: {
      required: true
    }
  }
});
</script>
