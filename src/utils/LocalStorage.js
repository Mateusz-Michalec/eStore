export const getItem = (key, initValue) => {
  const value = localStorage.getItem(key);
  if (value === null) return initValue;
  return JSON.parse(value);
};

export const saveItem = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};
