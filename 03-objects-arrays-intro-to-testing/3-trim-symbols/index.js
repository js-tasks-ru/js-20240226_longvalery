/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let symbol = '';
  let count = 0;
  let result = '';
  if ((size === 0) || (string.length == 0)) { return result; }
  if (size == undefined) { return string; }
  for (let i = 0; i < string.length; i++) {
    if (string[i] == symbol) {
      count++;
      if (count < size) {result += string[i];}
    }
    else {
      symbol = string[i];
      count = 0;
      result += string[i];
    }                         
  }
  return result;
}

