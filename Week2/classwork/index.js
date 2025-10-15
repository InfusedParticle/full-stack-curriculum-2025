// 1. Write a JavaScript program to find the longest string in a given array
function findLongestString(arr) {
    let longestLength = 0
    let longestIndex = -1
    arr.forEach((string, index) => {
        if(string.length > longestLength) {
            longestIndex = index
            longestLength = string.length
        }
    })

    if(longestIndex === -1) {
        return ""
    }

    return arr[longestIndex];
}

// Test for findLongestString
const testArr1 = ["apple", "banana", "cherry", "date"];
console.log("Expected: banana, Output:", findLongestString(testArr1));

// 2. Write an arrow function that calculates the area of a rectangle
const calculateArea = (length, width) => {
    return length * width
};

// Test for calculateArea
console.log("Expected: 20, Output:", calculateArea(4, 5));

// 3. Write a JavaScript program to display the reading status (i.e. display book name, author name and reading status) of the following books:
const library = [
  {
    title: "The Road Ahead",
    author: "Bill Gates",
    readingStatus: true,
  },
  {
    title: "Walter Isaacson",
    author: "Steve Jobs",
    readingStatus: false,
  },
  {
    title: "Mockingjay: The Final Book of The Hunger Games",
    author: "Suzanne Collins",
    readingStatus: false,
  },
];

function displayReadingStatus() {
    library.forEach((book) => {
        const {title, author, readingStatus} = book;
        statusString = (readingStatus) ? "Read" : "Unread"
        console.log(`Book Title: ${title}, Author: ${author}, Reading Status: ${(statusString)}`)
    })
}

// Test for displayReadingStatus
displayReadingStatus();

// 4. Square the value of every element in an array, then print the result
function squareAndPrint(arr) {
    const mapped = arr.map((item) => item*item)
    console.log(mapped)
}

// Test for squareAndPrint
const testArr2 = [1, 2, 3, 4, 5];
squareAndPrint(testArr2);

// 5. Filter array to numbers greater than 5
function filterGreaterThanFive(arr) {
    return arr.filter((item) => item > 5)
}

// Test for filterGreaterThanFive
const testArr3 = [3, 8, 1, 5, 9];
const expectedArr = [8,9]
console.log("Expected: " + expectedArr + ", Output:", filterGreaterThanFive(testArr3));
