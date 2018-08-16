import BaseButton from 'components/button'

export default BaseButton.extend({
  methods: {
    onClick(e) {
      this.$error('чекаво', this.$options.methods)
      BaseButton.options.methods.onClick.call(this, e)
    }
  }
})
