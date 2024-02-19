/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    if (obj == undefined) {return undefined;}
    let result = {};
    if (Object.entries(obj).length === 0) { return result;}
    for (let key in obj) {
        result[obj[key]] = key;
                         }
    return result;                 
}

/* for developer test 
const obj = { key: 'value' };
console.log(invertObj(obj)); // { value: 'key'}
*/

