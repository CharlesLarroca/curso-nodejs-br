const _ = require('lodash')

const arr1 = [1,2,3,4,5,5,6,9,8,8]

console.log(_.sortedUniq(arr1)) // apresenta apenas 1 elemento caso o mesmo esteja duplicado - [ 1, 2, 3, 4, 5, 6, 9, 8 ]

