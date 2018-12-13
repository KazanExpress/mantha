import VueI18n from 'vue-i18n';

import messages from 'text';

const defaultImpl = VueI18n.prototype.getChoiceIndex;
VueI18n.prototype.getChoiceIndex = function (choice, choicesLength) {
  if (this.locale !== 'ru') {
    return defaultImpl.apply(this, [choice, choicesLength]);
  }

  if (choice === 0) {
    return 0;
  }

  // tslint:disable-next-line:no-magic-numbers
  const teen = choice > 10 && choice < 20;
  // tslint:disable-next-line:no-magic-numbers
  const endsWithOne = choice % 10 === 1;

  // tslint:disable-next-line:no-magic-numbers
  if (choicesLength < 4) {
    // tslint:disable-next-line:no-magic-numbers
    return (!teen && endsWithOne) ? 1 : 2;
  }
  if (!teen && endsWithOne) {
    return 1;
  }
  // tslint:disable-next-line:no-magic-numbers
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    // tslint:disable-next-line:no-magic-numbers
    return 2;
  }

  // tslint:disable-next-line:no-magic-numbers
  return (choicesLength < 4) ? 2 : 3;
};

export default (Vue) => {
  Vue.use(VueI18n);

  return (locale: string) => {
    const i18n = new VueI18n({
      locale,
      fallbackLocale: 'ru',
      messages
    });

    (i18n as any).vm.$watch('locale', () => {
      if (document.documentElement) {
        document.documentElement.setAttribute('lang', i18n.locale);
      }
    }, {
      immediate: true
    });

    return i18n;
  };
};
