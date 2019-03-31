import Vue, { VueConstructor } from 'vue';
import {
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps
} from 'vue/types/options';

declare module 'vue/types/vue' {
  type BaseRefs = { [name: string]: Element | { default: VueConstructor } | Element[] | VueConstructor[] };
  type BaseEvents = { [name: string]: (...args: any[]) => any[] };

  type WithRefs<V extends Vue, Refs extends BaseRefs> = V & {
    $refs: {
      [key in keyof Refs]?: Refs[key] extends Array<any> ? Refs[key] : Refs[key] extends { default: VueConstructor } ? InstanceType<Refs[key]['default']> : Refs[key]
    };
  };

  type Parent<V extends Vue, Methods = {}, Computed = undefined> = V & {
    /**
     * Provides access to parent's bound instance for using it in overrides.
     */
    $super: Computed extends undefined ? Methods : (Methods & { [key in keyof Computed]: () => Computed[key] });
  };

  // tslint:disable-next-line:interface-name
  type WithEvents<V extends Vue, Events extends BaseEvents> = V & {
    $on: V['$on'] & {
      [key in keyof Events]: (cb: (...args: Parameters<Events[key]>) => void) => void;
    };

    $once: V['$once'] & {
      [key in keyof Events]: (cb: (...args: Parameters<Events[key]>) => void) => void;
    };

    $off: V['$off'] & {
      [key in keyof Events]: (cb: (...args: Parameters<Events[key]>) => void) => void;
    };

    $emit: V['$emit'] & {
      [key in keyof Events]: (...args: Parameters<Events[key]>) => void;
    };
  };

  // tslint:disable-next-line:interface-name
  interface VueConstructor<V extends Vue = Vue> {
    /**
     * Signifies that the component has certain refs in a template.
     * This allows typescript to autocomplete the $refs effortlessly
     *
     * @template the ref type map that is used in a type template ([refname: string]: componentType)
     * @returns a component that has $refs autocomplete
     */
    withRefs<Refs extends BaseRefs>(): VueConstructor<WithRefs<V, Refs>>;

    /**
     * Signifies that the component emits certain events.
     * This allows typescript to know the event names and their argument types for error-prone event emitting.
     *
     * @template event map used in a type template ([eventname: string]: Array<EventArgTypes>)
     * @returns a component that has $on, $off and $emit event autocomplete
     */
    emits<Events extends object>(...events: (keyof Events)[]): VueConstructor<WithEvents<V, Events extends BaseEvents ? Events : BaseEvents>>;

    extend<Data, Methods, Computed, PropNames extends string = never>(options?: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>): ExtendedVue<Parent<V, Methods, Computed>, Data, Methods, Computed, Record<PropNames, any>>;
    extend<Data, Methods, Computed, Props>(options?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>): ExtendedVue<Parent<V, Methods, Computed>, Data, Methods, Computed, Props>;
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

  (<any>Vue).emits = function () {
    this.prototype._events = (this.prototype._events || []).slice();
    this._new_events = Array.from(arguments);

    return this;
  };

  if (features.multi_level_inheritance.enabled) {
    // Save the old extends function
    const _extend = Vue.extend as any;

    // Aply new extends function
    Vue.extend = function extend(this: any, options) {
      // Call old extend
      const component: any = _extend.apply(this, [options]);

      component.prototype._events = [...(this.prototype._events || []), ...(this._new_events || [])];
      this._new_events = undefined;

      if (features.multi_level_inheritance.advanced_inheritance.enabled) {
        const def = (name: string, value: any, target = component.prototype) => Object.defineProperty(target, name, {
          get(this: any) {
            // Since you have to first get() the property,
            // the new component instance will be assigned
            // to the `_self`,
            // allowing the assigned property to re-use the instance
            // in its own properties
            value._self = this;

            return value;
          },
          configurable: true // Allow children to redefine the property
        });

        const $super = { ...(this.options.methods || {}), ...(this.options.computed || {}) };

        for (const key in $super) {
          const func: Function = $super[key];

          $super[key] = function () {
            // Apply every method and computed to the new component instance
            // to avoid unnecessary closure complications.
            return func.apply(this._self, arguments);
          };
        }

        def('$super', $super);

        [
          '$emit',
          '$on',
          '$once',
          '$off'
        ].forEach(name => {
          const original = this.prototype[name];

          Object.defineProperty(component.prototype, name, {
            value: (() => ({[name](this: any) {
              return original.apply(this, arguments);
            } }[name]))(),
            writable: true,
            enumerable: false,
            configurable: true
          });

          for (const event of component.prototype._events || []) {
            component.prototype[name][event] = function () {
              return this.apply(this._self, [event, ...arguments]);
            };
          }

          def(name, component.prototype[name]);
        });
      }

      component.withRefs = Vue.withRefs.bind(component);
      component.emits = Vue.emits.bind(component);

      return component;
    };
  }

  Object.defineProperty((<any>Vue).prototype, '$media', {
    get(this: Vue) { return this.$root; }
  });
}
