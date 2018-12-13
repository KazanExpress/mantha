import Vue, { VueConstructor } from 'vue';
import {
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps
} from 'vue/types/options';

declare module 'vue/types/vue' {
  type BaseRefs = { [name: string]: Element | { default: VueConstructor } | Element[] | VueConstructor[] };
  type BaseEvents = { [name: string]: any[] };
  type BaseArg<Events extends BaseEvents> = Events extends { [name: string]: infer U extends Array<any> ? infer Arg : any[] } ? Arg : any[];

  type VueRefs<Refs extends BaseRefs> = {
    $refs: {
      [key in keyof Refs]?: Refs[key] extends Array<any> ? Refs[key] : Refs[key] extends { default: VueConstructor } ? InstanceType<Refs[key]['default']> : Refs[key]
    };
  };

  type Parent<Methods = {}, Computed = undefined> = {
    /**
     * Provides access to parent's bound instance for using it in overrides.
     */
    $super: Computed extends undefined ? Methods : (Methods & { [key in keyof Computed]: () => Computed[key] });
  };

  // tslint:disable-next-line:interface-name
  interface VueEvents<Events extends BaseEvents> {
    $on(event: keyof Events, callback: (...args: BaseArg<Events>) => any): this;
    $off(event: keyof Events, callback: (...args: BaseArg<Events>) => any): this;
    $emit(event: keyof Events, ...args: BaseArg<Events>): this;
  }

  // tslint:disable-next-line:interface-name
  interface VueConstructor<V extends Vue = Vue> {
    /**
     * Signifies that the component has certain refs in a template.
     * This allows typescript to autocomplete the $refs effortlessly
     *
     * @template the ref type map that is used in a type template ([refname: string]: componentType)
     * @returns a component that has $refs autocomplete
     */
    withRefs<Refs extends BaseRefs>(): VueConstructor<V & VueRefs<Refs>>;

    /**
     * Signifies that the component emits certain events.
     * This allows typescript to know the event names and their argument types for error-prone event emitting.
     *
     * @template event map used in a type template ([eventname: string]: Array<EventArgTypes>)
     * @returns a component that has $on, $off and $emit event autocomplete
     */
    emitsEvents<Events extends BaseEvents>(): VueConstructor<V & VueEvents<Events>>;

    extend<Data, Methods, Computed, PropNames extends string = never>(options?: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>): ExtendedVue<V & Parent<Methods, Computed>, Data, Methods, Computed, Record<PropNames, any>>;
    extend<Data, Methods, Computed, Props>(options?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>): ExtendedVue<V & Parent<Methods, Computed>, Data, Methods, Computed, Props>;
  }

  // tslint:disable-next-line:interface-name
  interface Vue {
    /**
     * A $root instance with autocomplete for media properties. Semantically correct.
     */
    readonly $media: typeof import('@/index').default;

    /**
     * Unique instance ID
     */
    _uid: number;
  }
}

export default function (Vue: VueConstructor) {
  (<any>Vue).withRefs = function () { return this; };
  (<any>Vue).emitsEvents = function () { return this; };

  if (features.multi_level_inheritance.enabled) {
    // Save the old extends function
    const _extend = Vue.extend;

    // Aply new extends function
    Vue.extend = function extend(this: any, options) {
      // Call old extend
      const component: any = _extend.apply(this, [options]);

      if (features.multi_level_inheritance.advanced_inheritance.enabled) {
        // An efficient solution for $super's nested component scope.
        // Will be defined later.
        let efficientScope: any = null;

        const $super = { ...(this.options.methods || {}), ...(this.options.computed || {}) };

        for (const key in $super) {
          const func: Function = $super[key];

          $super[key] = function () {
            // Apply every method and computed to the new component instance
            // to avoid unnecessary closure complications.
            return func.apply(efficientScope, arguments);
          };
        }

        Object.defineProperty(component.prototype, '$super', {
          get(this: any) {
            // Since you have to first get() the $super property,
            // the `efficientScope` will be assigned
            // to the new component instance.
            efficientScope = this;

            return $super;
          },
          configurable: true // Allow children to redefine the $super
        });
      }

      component.withRefs = Vue.withRefs.bind(component);
      component.emitsEvents = Vue.emitsEvents.bind(component);

      return component;
    };
  }

  Object.defineProperty((<any>Vue).prototype, '$media', {
    get(this: Vue) { return this.$root; }
  });
}
