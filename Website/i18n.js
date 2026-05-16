const i18n = {
  currentLang: 'en',
  translations: {},

  async load(lang) {
    const res = await fetch(`/geekyhouse/Website/lang_${lang}.json`);
    this.translations[lang] = await res.json();
  },

  t(key) {
    return this.translations[this.currentLang]?.[key]
        ?? key;
  },

  apply() {
    document.querySelectorAll('[data-i18n]')
      .forEach(el => {
        el.innerHTML = this.t(el.dataset.i18n);
      });
    document.documentElement.lang = this.currentLang;
  },

  async setLang(lang) {
    if (!this.translations[lang])
      await this.load(lang);
    this.currentLang = lang;
    this.apply();
    localStorage.setItem('lang', lang);
  }
};

const params = new URLSearchParams(window.location.search);
const lang_URLLL = params.get("lang");

if (lang_URLLL === "en" || lang_URLLL === "fr" || lang_URLLL === "jp") {
  localStorage.setItem("lang", lang_URLLL); i18n.setLang(lang_URLLL);
}