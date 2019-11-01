<template>
  <select :value="value" v-on="listeners">
    <option value="" disabled selected>{{ empty }}</option>
    <option v-for="(option, key) in values" :key="key" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  // Use this and v-bind="$attrs" to use attributes elsewhere to send
  // inheritAttrs: false,
  model: {
    prop: "value",
    event: "change"
  },
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
  },
  computed: {
    listeners(): any {
      var vm = this as any;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          change(event: any) {
            vm.$emit("change", event.target.value);
          }
        }
      );
    }
  }
});
</script>
