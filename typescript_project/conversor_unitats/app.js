"use strict";
// app.ts
// Classe base per als conversors
class ConversorBase {
    convertir(input, unitatDesti) {
        throw new Error('Aquest mètode ha de ser implementat a la subclasse');
    }
    validarUnitats(unitatOrigen, unitatDesti, unitatsPermeses) {
        if (!unitatsPermeses.includes(unitatOrigen) || !unitatsPermeses.includes(unitatDesti)) {
            throw new Error(`Unitats no vàlides: ${unitatOrigen} o ${unitatDesti}`);
        }
    }
}
// Enumeracions de les unitats
var UnitatLongitud;
(function (UnitatLongitud) {
    UnitatLongitud["METRE"] = "metre";
    UnitatLongitud["QUILOMETRE"] = "quilometre";
    UnitatLongitud["CENTIMETRE"] = "centimetre";
})(UnitatLongitud || (UnitatLongitud = {}));
var UnitatMassa;
(function (UnitatMassa) {
    UnitatMassa["GRAM"] = "gram";
    UnitatMassa["QUILOGRAM"] = "quilogram";
    UnitatMassa["TONA"] = "tona";
})(UnitatMassa || (UnitatMassa = {}));
var UnitatTemperatura;
(function (UnitatTemperatura) {
    UnitatTemperatura["CELSIUS"] = "celsius";
    UnitatTemperatura["FAHRENHEIT"] = "fahrenheit";
})(UnitatTemperatura || (UnitatTemperatura = {}));
// Conversor de longitud
class ConversorLongitud extends ConversorBase {
    convertir(input, unitatDesti) {
        this.validarUnitats(input.unitat, unitatDesti, Object.values(UnitatLongitud));
        const conversions = {
            metre: 1,
            quilometre: 1000,
            centimetre: 0.01
        };
        return input.valor * conversions[input.unitat] / conversions[unitatDesti];
    }
}
// Conversor de massa
class ConversorMassa extends ConversorBase {
    convertir(input, unitatDesti) {
        this.validarUnitats(input.unitat, unitatDesti, Object.values(UnitatMassa));
        const conversions = {
            gram: 0.001,
            quilogram: 1,
            tona: 1000
        };
        return input.valor * conversions[input.unitat] / conversions[unitatDesti];
    }
}
// Conversor de temperatura
class ConversorTemperatura extends ConversorBase {
    convertir(input, unitatDesti) {
        this.validarUnitats(input.unitat, unitatDesti, Object.values(UnitatTemperatura));
        if (input.unitat === 'celsius' && unitatDesti === 'fahrenheit') {
            return input.valor * 9 / 5 + 32;
        }
        else if (input.unitat === 'fahrenheit' && unitatDesti === 'celsius') {
            return (input.valor - 32) * 5 / 9;
        }
        else if (input.unitat === unitatDesti) {
            return input.valor;
        }
        throw new Error(`Conversió no definida entre ${input.unitat} i ${unitatDesti}`);
    }
}
// Classe gestora que utilitza polimorfisme
class GestorConversio {
    constructor() {
        this.conversors = {
            longitud: new ConversorLongitud(),
            massa: new ConversorMassa(),
            temperatura: new ConversorTemperatura()
        };
    }
    convertir(tipus, input, unitatDesti) {
        const conversor = this.conversors[tipus];
        if (!conversor) {
            throw new Error(`Conversor no trobat per al tipus: ${tipus}`);
        }
        return conversor.convertir(input, unitatDesti);
    }
}
// Instància del gestor de conversió
const gestorConversio = new GestorConversio();
// --- Integració amb el DOM ---
// Referències al DOM
const formulari = document.getElementById('formulari-conversio');
const valorInput = document.getElementById('valor');
const tipusConversioSelect = document.getElementById('tipus-conversio');
const unitatOrigenSelect = document.getElementById('unitat-origen');
const unitatDestiSelect = document.getElementById('unitat-desti');
const resultatParagraf = document.getElementById('resultat');
// Funció per carregar les unitats segons el tipus de conversió
function carregarUnitats(tipus) {
    let unitats;
    switch (tipus) {
        case 'longitud':
            unitats = Object.values(UnitatLongitud);
            break;
        case 'massa':
            unitats = Object.values(UnitatMassa);
            break;
        case 'temperatura':
            unitats = Object.values(UnitatTemperatura);
            break;
        default:
            unitats = [];
    }
    // Netejar els selects
    unitatOrigenSelect.innerHTML = '';
    unitatDestiSelect.innerHTML = '';
    // Afegir les opcions als selects
    unitats.forEach((unitat) => {
        const optionOrigen = document.createElement('option');
        optionOrigen.value = unitat;
        optionOrigen.text = unitat.charAt(0).toUpperCase() + unitat.slice(1);
        unitatOrigenSelect.add(optionOrigen);
        const optionDesti = document.createElement('option');
        optionDesti.value = unitat;
        optionDesti.text = unitat.charAt(0).toUpperCase() + unitat.slice(1);
        unitatDestiSelect.add(optionDesti);
    });
}
// Carregar unitats inicials
carregarUnitats('longitud');
// Actualitzar les unitats quan es canviï el tipus de conversió
tipusConversioSelect.addEventListener('change', () => {
    const tipus = tipusConversioSelect.value;
    carregarUnitats(tipus);
});
// Gestionar l'esdeveniment de submit del formulari
formulari.addEventListener('submit', (e) => {
    e.preventDefault();
    const valor = parseFloat(valorInput.value);
    const tipus = tipusConversioSelect.value;
    const unitatOrigen = unitatOrigenSelect.value;
    const unitatDesti = unitatDestiSelect.value;
    if (isNaN(valor)) {
        resultatParagraf.textContent = 'Si us plau, introdueix un valor numèric.';
        return;
    }
    try {
        const resultat = gestorConversio.convertir(tipus, { valor, unitat: unitatOrigen }, unitatDesti);
        resultatParagraf.textContent = `${valor} ${unitatOrigen} són ${resultat.toFixed(2)} ${unitatDesti}.`;
    }
    catch (error) {
        resultatParagraf.textContent = error.message;
    }
});
