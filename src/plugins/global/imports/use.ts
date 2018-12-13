const isStr = (n): n is string => typeof n === 'string';

const useComponents = (componentsMap: ComponentImportMap, relativePath?: string) => Object.keys(componentsMap).reduce(
  (obj, name) => {
    const component = componentsMap[name];

    if (isStr(component)) {
      obj[name] = importComponent(component.replace('*', name), relativePath);
    } else {
      obj[name] = component as ComponentImportPromise;
    }

    return obj;
  },
  {} as ComponentImportPromiseMap
);

function fromArray(componentsMap: ComponentImportMapOrArray, relativePath?: string): ComponentImportMap {
  if (!Array.isArray(componentsMap)) {
    return componentsMap;
  }

  return componentsMap
    .reduce(
      (obj: ComponentImportMap, name: string | ComponentImportMap) => {
        if (isStr(name)) {
          obj[name.replace(/[^\w\d-_]/gi, '-')] = name;
        } else {
          return { ...obj, ...useComponents(name, relativePath) };
        }

        return obj;
      },
      {} as ComponentImportMap
    );
}

const factoryAliases = ['and', 'with'];

const use: UseComponentsFunction = function use(componentsMap: ComponentImportMapOrArray, relativePath?: string) {
  const components: any = useComponents(fromArray(componentsMap, relativePath), relativePath);
  const factory = (c: ComponentImportMap, r?: string) => use({ ...components, ...fromArray(c, r) }, r);

  factoryAliases.forEach(al => components[al] = factory);

  return components;
};

export { use };
