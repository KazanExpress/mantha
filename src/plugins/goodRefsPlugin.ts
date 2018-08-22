import { VueConstructor } from "vue";

declare module 'vue/types/vue' {
  type BaseRefs = {
    [name: string]: Element | Vue | Element[] | Vue[]
  }

  interface VueConstructor<V extends Vue = Vue> {
    withRefs<Refs extends BaseRefs>(): VueConstructor<V & {
      $refs: Refs
    }>
  }
}

export default function(Vue: VueConstructor) {
  (<any>Vue).withRefs = function() { return this; }
}
