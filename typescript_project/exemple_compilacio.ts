function sumar(a: number, b: number): number {
  return a + b;
}

const resultat = sumar(5, '10'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// cd Documents/Uni/2024-2025/PMUD/typescript_project/
// tsc exemple_compilacio.ts
// node exemple_compilacio.js
