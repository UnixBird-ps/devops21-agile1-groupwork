export async function getData(endpoint){
    let data = await fetch('/data/' + endpoint)
    if(data.status > 399){
        data = []
    } else {
        data = await data.json()
    }
    return data
}

export function hashify(arr, byProp = 'id', toArrayOfItems = false){
    let hash = {}
    for(let item of arr){
        if(toArrayOfItems){
            if(!hash[item[byProp]]){
                hash[item[byProp]] = []
            }
            hash[item[byProp]].push(item)
        }else{
            hash[item[byProp]] = item
        }
    }
    return hash
}