// Example for JS being Sync
// function calc(a, b) {
//   // ajax
//   // timer
//   return a + b;
// }

// Example for JS being Sync
function calc(a, b) {
    console.log('Inside calc');

    return new Promise( (resolve) => {
        setTimeout(() => {
            console.log('Called after 2secs');
            resolve(a + b);
         }, 2000)
    });
    
  }

  calc(10, 20).then((result) => {
        console.log(result)
        console.log("execution completed")
    }
);
  
//   console.log(output);
  
  console.log('Program Ended');