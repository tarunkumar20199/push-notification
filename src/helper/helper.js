export const convertNestedArrays = inputData => {
  const parsedData = JSON.parse(inputData);
  const outputData = {};
  for (const key in parsedData) {
    const value = parsedData[key];
    if (Array.isArray(value) && value.length === 1 && Array.isArray(value[0])) {
      outputData[key] = value[0];
    } else if (
      Array.isArray(value) &&
      value.length === 1 &&
      value[0] === null
    ) {
      outputData[key] = null;
    } else if (typeof value === 'object' && value !== null) {
      const nestedObject = {};
      for (const nestedKey in value) {
        const nestedValue = value[nestedKey];
        if (
          Array.isArray(nestedValue) &&
          nestedValue.length === 1 &&
          nestedValue[0] === null
        ) {
          nestedObject[nestedKey] = null;
        } else {
          nestedObject[nestedKey] = nestedValue;
        }
      }
      outputData[key] = nestedObject;
    } else {
      outputData[key] = value;
    }
  }
  return outputData;
};
