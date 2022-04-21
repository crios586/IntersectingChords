/*
Name: Christopher Rios

Description: A simple program to estimate the probabilty that chord_AB & chord_CD intersect, given that points A,B,C,D are unique and randomly selected integers [0:360) along a circle

Premise: chord_AB and chord_CD only intersect when point C or D (but not both) exist within chord_AB

Result: after 1 million iteration, about 1/3 of them resulted in chord_AB and chord_CD intersecting
*/


let data = [];
function iter(){
  // Initialize Necessary Functions & Data Structure
  let exclusions = Array(0); // getRandUniqueInt()
  function getRandUniqueInt(min, max) {
  // function getRandUniqueInt(min, max) 
  // - returns an int belonging to the half set [ min, max )
  // - uses external array 'exclusions' to keep track or previously generated numbers
  // - currently does not have a case to return an error if all numbers in the half set [ min, max ) have been previous generate ... code currently does an infinite loop in that case as a result 
    function getRandInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    let gotNumber = false;
    let number;
    while (gotNumber == false) {
      let candidate = getRandInt(min, max);
      if (!(exclusions.includes(candidate))) {
        exclusions.push(candidate);
        number = candidate;
        gotNumber = true;
      }
    }
    return number;
  }
  function withinSet(x, min, max) {
  // returns true when x is in the set [ min, max ] ... else false
      return ((x-min)*(x-max) <= 0);
  }
  
  // Randomly Select 4 Unique Points Along The Circle
  let A = getRandUniqueInt(0, 360);
  let B = getRandUniqueInt(0, 360);
  let C = getRandUniqueInt(0, 360);
  let D = getRandUniqueInt(0, 360);
  
  // Determine Arc_AB
  let Arc_AB = {start:null , end:null};
  if( (A-B)>0 ){ Arc_AB.start = B; Arc_AB.end = A; }
  else /* (B-A)>0 */ { Arc_AB.start = A; Arc_AB.end = B; }
  
  // Determine if point C or point D (but not both) are within Chord_AB
  let C_isInArc = withinSet(C, Arc_AB.start, Arc_AB.end);
  let D_isInArc = withinSet(D, Arc_AB.start, Arc_AB.end);
  if( (C_isInArc + D_isInArc) == 1){ return 1; }
  else { return 0; }
}

let iters = 1000000
for(let i=0; i<iters; i++){ data[i] = iter(); }

let hits = 0;
data.forEach((e)=>{if(e==1){hits++;}});

console.log("estimated probablity of chord_AB & chord_CD intersecting, using "+iters+" iterations");
console.log(hits+"/"+iters);
console.log("which simplifies to about 1/3 : )");
