/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const result = {}; 
  for (let i = 0; i < fields.length; i++) {
    if (fields[i] in obj) {
      result[fields[i]] = fields[i];
    }

  }
  return result; 
};
