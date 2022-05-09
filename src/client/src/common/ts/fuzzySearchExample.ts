import fuzzysort from 'fuzzysort';
const result = fuzzysort.single('query', 'some string that contains my query.');
// exact match returns a score of 0. lower is worse
if(result) {
    console.log(result.score); // -59
    console.log(result.indexes); // [29, 30, 31, 32, 33]
    console.log(result.target); // some string that contains my query.
    // console.log(result.obj); // reference to your original obj when using options.key
    fuzzysort.highlight(result, '<b>', '</b>'); // some string that contains my <b>query</b>.
}


let objects = [{title:'Favorite Color', desc:'Chrome'}, {title:'Google Chrome', desc:'Launch Chrome'}];
let results = fuzzysort.go('chr', objects, {
  keys: ['title', 'desc'],
  // Create a custom combined score to sort by. -100 to the desc score makes it a worse match
  scoreFn: a => Math.max(a[0]?a[0].score:-1000, a[1]?a[1].score-100:-1000)
});

var bestResult = results[0];
// When using multiple `keys`, results are different. They're indexable to get each normal result
fuzzysort.highlight(bestResult[0]); // 'Google <b>Chr</b>ome'
fuzzysort.highlight(bestResult[1]); // 'Launch <b>Chr</b>ome'
bestResult.obj.title; // 'Google Chrome'