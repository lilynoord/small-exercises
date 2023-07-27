const obj = {
	numbers: {
		a: 1,
		b: 2,
	},
};

const { a, b } = obj;

const arr = [1, 2];

[arr[0], arr[1]] = [arr[1], arr[0]];

const raceResults = (arr) => {
	const [first, second, third, ...rest] = arr;
	return { first, second, third, rest };
};
console.log(raceResults(["Tom", "Margaret", "Allison", "David", "Pierre"]));
