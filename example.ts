import NepaliDate from './src/NepaliDate'
import dateConverter from './src/dateConverter'

console.log('node-nepali-datetime')

// Now
const now = new NepaliDate()
console.log('Now:', now.toString())

// Try your example codes here

console.log(dateConverter.enMaxYear())
