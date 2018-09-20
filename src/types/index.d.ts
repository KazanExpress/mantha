interface Window {
  [key: string]: any
}

type Partial<T> = { [key in keyof T]+?: T[key] }
type ComponentImportPromise = () => Promise<any>
type ComponentImportPromiseMap = {
  [name: string]: ComponentImportPromise
}

declare const importFactory: (type: string) => (name: string) => ComponentImportPromise;
declare const importComponent: (name: string) => ComponentImportPromise;
declare const importPage: (name: string) => ComponentImportPromise;
declare const useComponents: (componentsMap: { [name: string]: string }) => ComponentImportPromiseMap;
declare const env: String & {
  isDevelopment: boolean
};

declare module '.*' {
  const render: <T>(arg: T) => T
  export = render;
}

// declare module 'vue/types/options' {
//   interface ComponentOptions<V extends Vue> {
//     name: string
//     router?: import('vue-router').default
//   }
// }
