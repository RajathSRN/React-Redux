const doWork = function*() {
  console.log("Working...");
  yield 1;
};

let work = doWork();

console.log(work.next());
console.log(work.next());