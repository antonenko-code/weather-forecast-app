export const getDate = (timestamp: number, options: {}) => {
  return new Date(timestamp * 1000).toLocaleString('en-US', options);
};
