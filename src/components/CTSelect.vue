<template>
  <span>
    <select :value="value" @change="$emit('input', $event.target.value)">
      <option disabled value="">{{ empty }}</option>
      <option v-for="(option, key) in values" :key="key" :value="key">
        {{ option }}
      </option>
    </select>
  </span>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      default: ""
    },
    values: {
      required: true
    },
    empty: {
      default: "Select",
      type: String
    }
  }
});
</script>
