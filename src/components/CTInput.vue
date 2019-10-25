<template>
  <input
    :value="formatted"
    :class="{ empty: formatted.toString().length === 0 }"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', formatter.from($event.target.value))"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Formatter } from "../types";

export default Vue.extend({
  name: "CtInput",
  props: {
    value: {
      required: true,
      type: [String, Number]
    },
    formatter: {
      type: Object,
      default: (): Formatter<string> => {
        return {
          to(value: string) {
            return value;
          },
          from(value: string) {
            return value;
          }
        };
      }
    }
  },
  computed: {
    formatted() {
      return this.formatter.to(this.value);
    }
  }
});
</script>
