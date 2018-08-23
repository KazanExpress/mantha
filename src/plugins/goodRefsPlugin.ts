import Vue, { VueConstructor } from "vue";

declare module 'vue/types/vue' {
  type BaseRefs = {
    [name: string]: Element | Vue | Element[] | Vue[]
  }

  interface VueConstructor<V extends Vue = Vue> {
    withRefs<Refs extends BaseRefs>(): VueConstructor<V & {
      $refs: Refs
    }>
  }

  interface Vue {
    $super<T extends VueConstructor<Vue>>(this: any, propName: keyof InstanceType<T>, ...args): any
  }
}

export default function(Vue: VueConstructor) {
  (<any>Vue).withRefs = function() { return this; };

  (<any>Vue).prototype.$super = function<T extends VueConstructor<Vue>>(this: any, propName: keyof InstanceType<T>, ...args) {
    const options = (<any>this).constructor.super.options;

    if (propName in options.methods)
      return options.methods[propName].apply(this, args);
    else if (propName in options.getters)
      return options.getters[propName].apply(this, args);
    else
      throw new Error('No such method in parent of a component!');
  };
}
