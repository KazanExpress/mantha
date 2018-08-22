interface Window {
  [key: string]: any
}

type ComponentImportPromise = () => Promise<any>
type ComponentImportPromiseMap = {
  [name: string]: ComponentImportPromise
}

declare const importComponent: (name: string) => ComponentImportPromise;
declare const importPage: (name: string) => ComponentImportPromise
declare const useComponents: (componentsMap: { [name: string]: string }) => ComponentImportPromiseMap

declare const env: Env

declare module '.*' {
  const render: <T>(arg: T) => T
  export = render;
}
