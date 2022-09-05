/**
 * 
 * @param {[{},..]} data Array of objects
 * @param {String} keyCol Name of object property to hash
 * @param {null || String} valueCol Name of column to get value from, if only a primitive value is wanted
 * @param {bool} valueArr True to push values to an array instead of writing over single value
 * @returns 
 */

module.exports = function hashify(data, keyCol, valueCol = null, valueArr = false){
    let hash = {}
    if(valueArr){
        for(let item of data){
            if(!hash[item[keyCol]]){
                hash[item[keyCol]] = []
            }
            if(valueCol){
                hash[item[keyCol]].push(item[valueCol])
            }else{
                hash[item[keyCol]].push(item)
            }            
        }
    }else{
        for(let item of data){
            if(valueCol){
                hash[item[keyCol]] = item[valueCol]
            }else{
                hash[item[keyCol]] = item
            }            
        }
    }
    return hash
}