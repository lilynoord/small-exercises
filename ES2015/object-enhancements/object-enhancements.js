const createInsturctor = (firstName, lastName) => {
  return { firstName, lastName };
};

console.log(createInsturctor("Joe", "Mama"));

const favoriteNumber = 42;
const instructor = {
    firstName:"Colt",
    [favoriteNumber]: "That is my favorite!",
    sayHi(){
        return "Hi!";
      },
      sayBye(){
        return this.firstName + " says bye!";
      }
}

 
  


const createAnimal = (species, verb, noise) => {
  return {
    species,
    noise,
    [verb]() {
        console.log(this.noise);
      }
  };
  
};



const d = createAnimal("dog", "bark", "Woooof!");
d.bark(); //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa");
s.bleet(); //"BAAAAaaaa"

