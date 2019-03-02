const env = process.env.NODE_ENV;

export const logDev = (...args: any[]) => {
  if (env === 'development')
    console.log(...args)
};

export const logDevProd = (...args: any[]) => {
  if (env === 'development' || env === 'production')
    console.log(...args)
};