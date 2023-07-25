const filterOutOdds = (...nums) => nums.filter((num) => num % 2);

const findMin = (...args) => Math.min(...args);

const mergeObjects = (o1, o2) => {
  return { ...o1, ...o2 };
};

const doubleAndReturnArgs = (arr, ...doubles) => {
  return [...arr, ...doubles.map((v) => v * 2)];
};

const removeRandom = (items) => {
  let rem = Math.floor(Math.random() * items.length);
  return items.filter((v, i) => i !== rem);
};

const extend = (array1, array2) => {
  return [...array1, ...array2];
};

const addKeyVal = (obj,key,val) => {
  obj[key] = val;
  return obj;
}

const main = () => {
  console.log(filterOutOdds(5, 2, 4, 5, 1));
  console.log(findMin(1, 4, 12, -3));
  console.log(findMin(1, -1));
  console.log(findMin(3, 1));
  console.log(mergeObjects({ a: 1, b: 2 }, { c: 3, d: 4 })); // {a:1, b:2, c:3, d:4}
  console.log(doubleAndReturnArgs([1, 2, 3], 4, 4));
  console.log(doubleAndReturnArgs([2], 10, 4));
  console.log(removeRandom([1, 2, 3, 4, 5, 6, "Asf", 7, 8, 9, 10]));
  console.log(extend([1,2,3,4],["A","b","x"]))
  console.log(addKeyVal({"a":"A","b":"B"},"z","Z"));
};
main();
