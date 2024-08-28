export const removeString = (originalValue: string, removeValue: string) => {
  if (originalValue.startsWith(removeValue)) {
    return originalValue.substring(removeValue.length);
  }
  return originalValue;
};
