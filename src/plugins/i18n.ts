import { createI18n } from "vue-i18n";
import en from "../locales/en.json";

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || "en",
  messages: {
    en,
  },
});

export default i18n;
