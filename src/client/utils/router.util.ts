const getLastValue = (path: string): string => {
  const parts = path.split("/");
  return parts[parts.length - 1];
};

export const routerUtil = {
  getLastValue,
};
