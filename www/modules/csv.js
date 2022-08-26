
export function convertCSVToHash(csv, firstColumnIsADate = false) {
    csv = csv.trim()
    csv = csv.split('\n')
    let keys = csv.shift().split(';')
    let hash = {}
    for (let row = 0; row < csv.length; row++) {
        let cols = csv[row].split(';')
        if (firstColumnIsADate) {
        cols[0] = new Date(new Date(cols[0]).getTime() + 4 * 3600 * 1000).toISOString().split('T')[0]
        }
        hash[cols[0]] = {}
        for (let col = 0; col < cols.length; col++) {
        hash[cols[0]][keys[col]] = cols[col]
        }
    }
    return hash
}