import mediaSizes from './sizes.json';

export function remToPixels(rem) {
  const defaultRemInPixels = 16;

  return rem * (
    document.documentElement
      ? parseFloat(getComputedStyle(document.documentElement).fontSize || (defaultRemInPixels + 'px'))
      : defaultRemInPixels
  );
}

export default (Vue: typeof import('vue').default) => Vue.emits<{
  'media-changed': [];
  'media-init': [];
}>().extend({
  data() {
    return {
      size: 'all',
      clientWidth: window.innerWidth,
      clientHeight: window.innerHeight,
    };
  },
  computed: {
    $sizes() {
      return Object.keys(mediaSizes.sizes).reduce((ac, cur, ind, arr) => {
        const curMedia = remToPixels(mediaSizes.sizes[cur]);
        const nextMedia = remToPixels(mediaSizes.sizes[arr[ind + 1]]);

        if (ind === 0 || ind === arr.length - 1) {
          ac[cur] = current => current >= curMedia;
        } else {
          ac[cur] = current => (current >= curMedia && current < nextMedia);
        }

        return ac;
      }, {});
    }
  },
  methods: {
    _recalculateMedia() {
      this.clientWidth = window.innerWidth;
      this.clientHeight = window.innerHeight;

      Object.keys(this.$sizes).forEach(size => {
        this.size = this.$sizes[size](this.clientWidth) ? size : this.size;
      });

      this.$emit('media-changed');
    }
  },
  mounted() {
    this.$emit('media-init');
    this._recalculateMedia();
    window.addEventListener('resize', this._recalculateMedia);
    window.addEventListener('orientationchange', this._recalculateMedia);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._recalculateMedia);
    window.removeEventListener('orientationchange', this._recalculateMedia);
  }
});
