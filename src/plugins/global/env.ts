// Because a class instance is needed to reliably add a new property to the object,
// tslint:disable-next-line:no-construct
const env = new String(process.env.NODE_ENV) as any;
env.isDevelopment = process.env.NODE_ENV === 'development';

export { env };
