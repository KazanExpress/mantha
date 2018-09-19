import BaseButton from 'components/button';
import Vue from 'vue';

export default BaseButton.extend({
  methods: {
    onClick(e) {
      console.error('чекаво', this.$options.methods);

      this.$super<typeof BaseButton>('onClick', e);
    }
  }
});
