'use strict'

function sort(input) {
  let temp= 0;
for(let i =0; i<input.lenght-1;i++){
  for(let j = 0; j<input.lenght-1;j++){
    if(input[j]>input[j+1]){
    input[j]=temp;
    input[j]= input[j+1];
    temp = input[j+1];
  }
}
}
}

module.exports = sort
