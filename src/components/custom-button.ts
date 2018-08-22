import BaseButton from 'components/button'

// TODO https://github.com/vuejs/vue-class-component/issues/143#issuecomment-408304814 - make it nice

export default BaseButton.extend({
  methods: {
    onClick(e) {
      console.error('чекаво', this.$options.methods);
      console.log(this);
      console.log({ ...BaseButton });
      (<any>BaseButton).options.methods.onClick.call(this, e);
    }
  }
})
