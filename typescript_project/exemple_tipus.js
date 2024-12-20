// Exemple de tipus genèric
function retornarElement(element) {
    return element;
}
var numero = retornarElement(5);
console.log("N\u00FAmero retornat: ".concat(numero));
var text = retornarElement('Hola');
console.log("Text retornat: ".concat(text));
// Exemple de tipus d'unió (|): Accepta múltiples tipus
function processarEntrada(entrada) {
    if (typeof entrada === 'string') {
        return "Cadena processada: ".concat(entrada.toUpperCase());
    }
    else {
        return "N\u00FAmero processat: ".concat(entrada * 2);
    }
}
console.log(processarEntrada('text'));
console.log(processarEntrada(10));
var estudiant = {
    nom: 'Francesco',
    edat: 22,
    universitat: 'EPSEVG',
};
console.log("En ".concat(estudiant.nom, ", de ").concat(estudiant.edat, " anys, estudia a l'").concat(estudiant.universitat));
