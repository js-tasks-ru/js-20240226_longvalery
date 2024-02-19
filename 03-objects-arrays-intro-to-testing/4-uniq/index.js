/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
    let result = [];
    if ((arr == undefined) || (arr.length == 0)) { return result;}
    for (let i = 0; i < arr.length; i++) {
        if ( ! result.includes(arr[i]) ) { result.push(arr[i]);}
                                         } 
    return result;                                     
                          }

/* fot developer test
console.log(uniq([1, 2, 2, 3, 1, 4])); // [1, 2, 3, 4]
console.log(uniq(['a', 'a', 'b', 'c', 'c'])); // ['a', 'b', 'c']
*/
