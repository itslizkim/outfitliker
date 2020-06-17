let myMatrix = [[1, 2, 3, 4],
                [12,13,14,5],
                [11,16,15,6],
                [10,9, 8, 7]];


function unroll(matrix) {
  
  //exit condition
  if (matrix.length === 0) return ;
  
  //top
  console.log(...matrix.shift())
  
  
  //right side (last number of every array)
  console.log(...matrix.map(row => row.pop()))
  
  // bottom
  console.log(...matrix.pop().reverse())
  
  
  // left side (first number of every array)
  console.log(...matrix.map(row => row.shift()).reverse())
  
  unroll(matrix);
  
}
unroll(myMatrix);


// end result: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16



// function greet(person){
//     if (person === {name: 'John'}){
//       console.log("Hello, John")}
//    else {
//         console.log("Welcome")
//    }
// }

// var input = {name: 'John'}
// greet(input);

