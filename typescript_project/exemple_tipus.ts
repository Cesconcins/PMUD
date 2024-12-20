// Exemple de tipus genèric
function retornarElement<T>(element: T): T {
    return element;
}
  
const numero = retornarElement<number>(5);
console.log(`Número retornat: ${numero}`);
  
const text = retornarElement<string>('Hola');
console.log(`Text retornat: ${text}`);
  
// Exemple de tipus d'unió (|): Accepta múltiples tipus
function processarEntrada(entrada: string | number): string {
    if (typeof entrada === 'string') {
        return `Cadena processada: ${entrada.toUpperCase()}`;
    } else {
        return `Número processat: ${entrada * 2}`;
    }
}

console.log(processarEntrada('text'));
console.log(processarEntrada(10));
  
// Exemple de tipus d'intersecció (&): Combina tipus
type Persona = {
    nom: string;
    edat: number;
};
  
type Estudiant = {
    universitat: string;
};
  
type PersonaEstudiant = Persona & Estudiant;
  
const estudiant: PersonaEstudiant = {
    nom: 'Francesco',
    edat: 22,
    universitat: 'EPSEVG',
};
  
console.log(
    `En ${estudiant.nom}, de ${estudiant.edat} anys, estudia a l'${estudiant.universitat}`
);
  