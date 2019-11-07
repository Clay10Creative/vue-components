<template>
  <div id="app">
    <fieldset>
      <legend @click="animatedNumber.show = !animatedNumber.show">
        Animated Number
      </legend>
      <template v-if="animatedNumber.show">
        <p>
          Standard: <ct-animated-number :value="animatedNumber.randomNumber" />
        </p>
        <p>
          Duration:
          <ct-animated-number
            :value="animatedNumber.randomNumber"
            :duration="750"
          />
        </p>
        <p>
          Formatted:
          <ct-animated-number
            :value="animatedNumber.randomNumber"
            :formatter="formatters.currency()"
          />
          <ct-animated-number
            :value="animatedNumber.randomNumber"
            :formatter="formatters.currency(2, '$')"
          />
        </p>
      </template>
    </fieldset>

    <fieldset>
      <legend @click="animation.show = !animation.show">
        Animation
      </legend>
      <template v-if="animation.show">
        <button @click="animation.showExample = !animation.showExample">
          Toggle
        </button>
        <ct-animation
          v-show="animation.showExample"
          :data="animationJson"
          :autoplay="false"
          style="height: 200px;"
          :frames="animationFrames"
        />

        <ct-input v-model="animation.frame" />
        <ct-animation
          :data="animationJson"
          :autoplay="false"
          style="height: 200px;"
          :frames="animationFrames"
          :playing="animation.frame"
        />

        <p>Loop</p>
        <ct-animation
          :data="animationJson"
          :autoplay="true"
          :loop="true"
          style="height: 200px;"
        />
      </template>
    </fieldset>

    <fieldset>
      <legend @click="inputs.show = !inputs.show">
        Inputs
      </legend>
      <template v-if="inputs.show">
        <p>
          <ct-input
            type="number"
            v-model.number="inputs.number"
            :formatter="formatters.currency(2)"
          />
          <ct-animated-number
            :value="inputs.number"
            :formatter="formatters.currency(2)"
          />
        </p>
        <p>
          blur
          <ct-input
            type="number"
            :value="inputs.number"
            @change="inputs.number = $event"
            @blur="log"
            :formatter="formatters.currency(2)"
          />
        </p>
        <p>
          <ct-input :value="inputs.string" @change="inputs.string = $event" />
        </p>
        <p>
          <ct-input v-model="inputs.string" />
        </p>

        <p>
          <ct-input
            :value="inputs.date"
            @change="inputs.date = $event"
            :formatter="formatters.date()"
            :formatted-only="true"
          />
        </p>
      </template>
    </fieldset>

    <fieldset>
      <legend @click="select.show = !select.show">
        Select
      </legend>
      <template v-if="select.show">
        <ct-select v-model="select.selected" :values="select.values" />
        <ct-select v-model="select.enumSelected" :values="select.enum" />
        <ct-select v-model="select.undefined" :values="select.enum" />
      </template>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import animationJson from "./examples/RubbishPile.json";
import { formatters } from "./index";

enum Select {
  first = "First value",
  second = "Second value",
  third = "Third value"
}

export default Vue.extend({
  name: "app",
  data() {
    return {
      animatedNumber: {
        show: false,
        randomNumber: 0,
        input: 0
      },
      animation: {
        show: false,
        showExample: true,
        frame: ""
      },
      inputs: {
        show: true,
        number: 0,
        string: "hello",
        date: new Date()
      },
      select: {
        show: false,
        undefined: undefined,
        selected: "Second value",
        values: {
          first: "First value",
          second: "Second value",
          third: "Third value"
        },
        enumSelected: Select.first,
        enum: Select
      }
    };
  },
  computed: {
    formatters() {
      return formatters;
    },
    animationJson() {
      return animationJson;
    },
    animationFrames() {
      return {
        enter: [0, 45],
        leave: [45, 67]
      };
    }
  },
  methods: {
    log() {
      console.log(arguments);
    }
  },
  mounted() {
    setInterval(() => {
      this.animatedNumber.randomNumber = Math.random() * 1000;
    }, 1000);
  }
});
</script>
