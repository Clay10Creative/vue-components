<template>
  <input
    :value="showFormatted ? formatted : value"
    :type="inputType"
    :class="{ empty }"
    v-on="listeners"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Formatter } from "../types";

export default Vue.extend({
  props: {
    value: {
      default: ""
    },
    type: {
      default: "text"
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
  data() {
    return {
      focused: false
    };
  },
  computed: {
    showFormatted(): boolean {
      return this.type.toLowerCase() === "number" && !this.focused;
    },
    formatted(): any {
      return this.formatter ? this.formatter.to(this.value) : this.value;
    },
    empty(): boolean {
      return this.formatted ? this.formatted.toString().length === 0 : true;
    },
    inputType(): string {
      return this.showFormatted ? "text" : this.type;
    },
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
          input(event: any) {
            vm.$emit("input", event.target.value);
          },
          change(event: any) {
            vm.$emit("change", vm.formatter.from(event.target.value));
          },
          focus(event: any) {
            vm.focused = true;
            vm.$emit("focus", event);
          },
          blur(event: any) {
            vm.focused = false;
            vm.$emit("blur", event);
          }
        }
      );
    }
  }
});
</script>
