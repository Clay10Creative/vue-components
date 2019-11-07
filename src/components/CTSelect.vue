<template>
  <select :value="selected" v-on="listeners">
    <option value="-1" disabled selected>{{ initialText }}</option>
    <option v-for="(option, index) in valuesArray" :key="index" :value="index">
      {{ formatter.to(option) }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  model: {
    prop: "value",
    event: "change"
  },
  // inheritAttrs: false, this.$attrs
  props: {
    value: {
      default: ""
    },
    values: {
      required: true
    },
    formatter: {
      type: Object,
      default: (): any => {
        return {
          to(value: string) {
            return value;
          },
          from(value: string) {
            return value;
          }
        };
      }
    },
    initialText: {
      default: "Select",
      type: String
    }
  },
  computed: {
    selected(): number {
      return this.valuesArray.findIndex((value: any) => value === this.value);
    },
    valuesArray(): any[] {
      return Array.isArray(this.values)
        ? this.values
        : Object.values(this.values as any);
    },
    listeners(): any {
      const vm = this as any;
      return Object.assign({}, this.$listeners, {
        change(event: any) {
          vm.$emit(
            "change",
            vm.formatter.from(vm.valuesArray[+event.target.value])
          );
        }
      });
    }
  }
});
</script>
