

const issueCreated = "2023-10-12T21:04:30.248+0530"
// moment.format()
const issueCreated2 = "2023-10-13T16:55:30.499Z"
const losangeles = "2023-10-13T04:30:53.000Z"



let issueDate = new Date(issueCreated2)
let losangelesDate = new Date(losangeles)


convert = (isoDateString, offset) =>{

// Parse the ISO date using JavaScript Date object
const isoDate = new Date(isoDateString);

// Time offset in minutes (e.g., +330 for UTC+5:30)

// Calculate the offset in milliseconds
const offsetMilliseconds = offset * 60 * 1000;

// Apply the offset to the date
const convertedDate = new Date(isoDate.getTime() - offsetMilliseconds);

// Output the converted date in another time zone
// console.log(`convert ${convertedDate.toISOString()}`);
console.log(`convert ${convertedDate}`);
}

convert(losangeles,issueDate.getTimezoneOffset())
console.log(issueDate)
console.log(issueDate.getTimezoneOffset())
console.log(losangelesDate.getTimezoneOffset())
console.log(issueDate.toString())