// Simple Implementation of Genearte Unique Random Number that belong to the half set [min, max)


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
if( (C_isInArc + D_isInArc) == 1){ console.log("hit! , Arc_AB and Arc_CD interset"); }
else {console.log("miss"); }

// Test
console.log("A = "+A);
console.log("B = "+B);
console.log(Arc_AB);
console.log("C = "+C);
console.log("D = "+D);
