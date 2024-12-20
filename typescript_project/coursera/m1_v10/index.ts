// Benefits of TypeScript
// challenges:
// - give the screen's innerHTML a string
// - change the two input values to numbers

const button = document.querySelector('.button')
const firstInput = document.querySelector('#first-input') as HTMLInputElement   // this is called typecosting and tells TypeScript what this elemnt is. 
                                                                                // We are letting TypeScript know that this will always be the input element 
const secondInput = document.querySelector('#second-input') as HTMLInputElement //"as HTMLInputElement is a TypeScript added functionality
export const screen = document.querySelector('.screen')
 
function addNumbers(a: number,b: number) { // If we don't put the : number, parameters a and b will be type any
    screen.innerHTML = (a + b).toString()  // In order to use the screen we have to export it (line 9) because we are changing the const screen makeup
                                // we used the .toString() function to solve the problem type 'number' is not assignable to type 'string'
}
 
button.addEventListener('click', () => 
    addNumbers(parseInt(firstInput.value), parseInt(secondInput.value))) // We now use the parseInt() function to pass the numbers as strings