import Vue, { VueConstructor } from "vue";
import { format, parse } from "date-fns";
import accounting from "accounting";

import CTAnimatedNumber from "./components/CTAnimatedNumber.vue";
import CTAnimation from "./components/CTAnimation.vue";
import CTInput from "./components/CTInput.vue";
import CTPaginate from "./components/CTPaginate.vue";
import CTSelect from "./components/CTSelect.vue";
import CTSlider from "./components/CTSlider.vue";
import { IComponents, Formatters, Formatter } from "./types";

export * from "./types";

export interface FormatSettings {
  prefix?: string;
  suffix?: string;
  precision?: number;
}

export const formatters: Formatters = {
  number(precision: number = 0): Formatter<number> {
    return {
      to(value) {
        return accounting.formatNumber(value, value > 10000 ? 0 : precision);
      },
      from(value) {
        return accounting.unformat(value);
      }
    };
  },
  currency(precision: number = 0, currency: string = "£"): Formatter<number> {
    return {
      to(value) {
        return accounting.formatMoney(
          value,
          currency,
          value > 10000 ? 0 : precision
        );
      },
      from(value) {
        return accounting.unformat(value);
      }
    };
  },
  date(dateFormat: string = "dd/MM/yyyy") {
    return {
      to(value: Date) {
        return format(value, dateFormat);
      },
      from(value: string) {
        return parse(value, dateFormat, new Date());
      }
    };
  },
  format(opts?: FormatSettings) {
    const settings = Object.assign(
      {},
      {
        prefix: "",
        suffix: "",
        precision: undefined
      },
      opts
    );

    return {
      to(value) {
        return settings.precision
          ? `${accounting.formatMoney(
              value,
              settings.prefix,
              settings.precision
            )}${settings.suffix}`
          : `${settings.prefix}${value}${settings.suffix}`;
      },
      from(value) {
        return settings.precision ? accounting.unformat(value) : value;
      }
    };
  }
};

export const Components: IComponents = {
  "ct-animated-number": CTAnimatedNumber,
  "ct-animation": CTAnimation,
  "ct-input": CTInput,
  "ct-paginate": CTPaginate,
  "ct-select": CTSelect,
  "ct-slider": CTSlider
};

export default {
  install(Vue: VueConstructor<Vue>) {
    Vue.filter(
      "ctCurrency",
      (value: number, precision: number = 0, currency: string = "£") =>
        formatters.currency(precision, currency).to(value)
    );
    Vue.filter("ctNumber", (value: number, precision: number = 0) =>
      formatters.number(precision).to(value)
    );
    Vue.filter("ctDate", (date: Date, dateFormat: string = "dd/MM/yyyy") =>
      formatters.date(dateFormat).to(date)
    );
    Vue.filter("ctFormat", (value: any, pSettings?: FormatSettings) =>
      formatters.format(pSettings).to(value)
    );

    Vue.directive("focus", {
      inserted: function(el) {
        el.focus();
      }
    });

    Object.keys(Components).forEach((name: string) => {
      Vue.component(name, Components[name]);
    });
  }
};
