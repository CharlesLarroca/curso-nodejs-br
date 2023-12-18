const x = '10'

//Check if x is a integer number

if (!Number.isInteger(x)) {
  throw new Error('X is not a integer number')
}

console.log('Keep going...')