export interface IErrorMap {
  [name: string]: new (...args: any[]) => Error;
}

export type ErrorProneFunction<F extends Function, E extends IErrorMap> = F & {
  throws?: E & Throws;
};

export type Throws = {
  <Err extends Error>(error: Err): boolean;
};

export const throws = <E extends IErrorMap, F extends Function>(errors: E, f: F): ErrorProneFunction<F, E> => {
  const newF = f as ErrorProneFunction<F, E>;

  newF.throws = function throws(e: Error) {
    if (!(e instanceof Error)) {
      return false;
    }

    if (e.constructor.name in errors) {
      return true;
    }

    // Check for direct instantiation
    return Object.values(errors).some(E => e.constructor.prototype === E.prototype);
  } as E & Throws;

  for (const key in errors) {
    newF.throws[key] = errors[key] as any;
  }

  return newF;
};
