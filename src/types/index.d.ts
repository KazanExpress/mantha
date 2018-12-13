interface Window {
  [key: string]: any
}

type Partial<T> = { [key in keyof T]+?: T[key] }
type ComponentImportPromise = () => Promise<any>;
type ComponentImportMap = { [name: string]: string | ComponentImportPromise };
type ComponentImportMapOrArray = ComponentImportMap | Array<string | ComponentImportMap>;

type UseComponentsFunction = {
  (componentsMap: ComponentImportMapOrArray, relativePath: string): ExtendedUseComponents;
  (componentsMap: ComponentImportMapOrArray): ExtendedUseComponents;
  (componentsMap: ComponentImportMapOrArray, relativePath: string): ComponentImportPromiseMap;
  (componentsMap: ComponentImportMapOrArray): ComponentImportPromiseMap;
};

type ExtendedUseComponents = ComponentImportPromiseMap & {
  and: UseComponentsFunction;
  with: UseComponentsFunction;
  fluttershy: UseComponentsFunction;
}

type ComponentImportPromiseMap = {
  [name: string]: ComponentImportPromise;
};

declare const importFactory: (type: string, typeStyle?: string) => (name: string, relativePath?: string) => ComponentImportPromise;
declare const importComponent: (name: string, relativePath?: string) => ComponentImportPromise;
declare const importPage: (name: string, relativePath?: string) => ComponentImportPromise;
declare const use: UseComponentsFunction;
declare const useLayouts: (componentsMap: ComponentImportMap) => ComponentImportPromiseMap;
declare const features: typeof import('@/.features').default;
declare const env: String & {
  isDevelopment: boolean
};

declare const Mantha: {
  Component: typeof import('@/components/mantha-component').default;
  Page: typeof import('pages/mantha-page').default;
};

declare module '.*' {
  const render: <T>(arg: T) => T
  export = render;
}

declare interface Console {
  image: (url: string, scale?: number) => void;
}
