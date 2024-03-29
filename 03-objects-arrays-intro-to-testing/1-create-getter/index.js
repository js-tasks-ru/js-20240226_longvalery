/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const words = path.split('.');
  if (words.length === 0) {return undefined;}
  const func = (objectSource) => {
    function iterate(obj, stack) {
      const properties = stack.split('.');
      if (obj.hasOwnProperty(properties[0])) {
        if (properties.length === 1) { return obj[properties[0]]; } // We found need value
        else {
          const objNew = Object.assign({}, obj[properties[0]]);
          delete properties[0]; 
          const pathNew = properties.toString().slice(1).replace(",", "."); 
          return iterate(objNew, pathNew);
        } 
      } // /if (obj.hasOwnProperty(properties[0]))
      else { return undefined; }
    }

    return iterate(objectSource, path);
  };
  return func;                      
}
