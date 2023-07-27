const hasDuplicate = (arr) => {
	const x = new Set(arr).size != arr.length; // works because the set won't duplicate values
};

console.log(hasDuplicate([1, 3, 2, 1])); // true
console.log(hasDuplicate([1, 5, -1, 4])); // false

const vowelCount = (str) => {
	str = str.toLowerCase();
	const vowMap = new Map();
	for (let c of str) {
		if ("aeiou".includes(c)) {
			if (vowMap.has(c)) {
				vowMap.set(c, vowMap.get(c) + 1);
			} else {
				vowMap.set(c, 1);
			}
		}
	}
	return vowMap;
};
console.log(vowelCount("awesome")); // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
console.log(vowelCount("Colt")); // Map { 'o' => 1 }
