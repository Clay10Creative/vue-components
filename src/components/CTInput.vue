<template>
  <input
    :value="showFormatted ? formatted : value"
    :type="inputType"
    :class="{ empty }"
    @input="trigger('input', $event.target.value)"
    @change="trigger('change', formatter.from($event.target.value))"
    @blur="trigger('blur', $event)"
    @focus="trigger('focus', $event)"
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
    }
  },
  methods: {
    trigger(event: string, $event: any) {
      if (event === "focus") {
        this.focused = true;
      } else if (event === "blur") {
        this.focused = false;
      }

      this.$emit(event, $event);
    }
  }
});
</script>
