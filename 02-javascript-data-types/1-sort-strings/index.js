/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
       let result = Array.from(arr);
       let collator = new Intl.Collator('ru', {caseFirst: 'upper',});
       if (param === 'asc') { 
          result.sort((a,b) =>  { 
             return collator.compare(a,b) ;
                             });
                            }
       else                 { 
          result.sort((a,b) =>  { 
             return -1 * collator.compare(a,b) ;
                             });
                            }
       return result;
}
