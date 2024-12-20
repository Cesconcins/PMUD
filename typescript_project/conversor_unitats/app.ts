// Tipus avançats
type ValorAmbUnitat = {
    valor: number;
    unitat: string;
};

// Interfície base per a conversors
interface IConversor {
    convertir(input: ValorAmbUnitat, unitatDesti: string): number;
}

// Classe base per als conversors
class ConversorBase implements IConversor {
    convertir(input: ValorAmbUnitat, unitatDesti: string): number {
        throw new Error('Aquest mètode ha de ser implementat a la subclasse');
    }

    protected validarUnitats(unitatOrigen: string, unitatDesti: string, unitatsPermeses: string[]): void {
        if (!unitatsPermeses.includes(unitatOrigen) || !unitatsPermeses.includes(unitatDesti)) {
            throw new Error(`Unitats no vàlides: ${unitatOrigen} o ${unitatDesti}`);
        }
    }
}

// Enumeracions de les unitats
enum UnitatLongitud {
    METRE = "metre",
    QUILOMETRE = "quilometre",
    CENTIMETRE = "centimetre"
}

enum UnitatMassa {
    GRAM = "gram",
    QUILOGRAM = "quilogram",
    TONA = "tona"
}

enum UnitatTemperatura {
    CELSIUS = "celsius",
    FAHRENHEIT = "fahrenheit"
}

// Conversor de longitud
class ConversorLongitud extends ConversorBase {
    convertir(input: ValorAmbUnitat, unitatDesti: string): number {
        this.validarUnitats(input.unitat, unitatDesti, Object.values(UnitatLongitud));
        const conversions: { [key: string]: number } = {
            metre: 1,
            quilometre: 1000,
            centimetre: 0.01
        };
        return input.valor * conversions[input.unitat] / conversions[unitatDesti];
    }
}

// Conversor de massa
class ConversorMassa extends ConversorBase {
    convertir(input: ValorAmbUnitat, unitatDesti: string): number {
        this.validarUnitats(input.unitat, unitatDesti, Object.values(UnitatMassa));
        const conversions: { [key: string]: number } = {
            gram: 0.001,
            quilogram: 1,
            tona: 1000
        };
        return input.valor * conversions[input.unitat] / conversions[unitatDesti];
    }
}

// Conversor de temperatura
class ConversorTemperatura extends ConversorBase {
    convertir(input: ValorAmbUnitat, unitatDesti: string): number {
        this.validarUnitats(input.unitat, unitatDesti, Object.values(UnitatTemperatura));
        if (input.unitat === 'celsius' && unitatDesti === 'fahrenheit') {
            return input.valor * 9 / 5 + 32;
        } else if (input.unitat === 'fahrenheit' && unitatDesti === 'celsius') {
            return (input.valor - 32) * 5 / 9;
        } else if (input.unitat === unitatDesti) {
            return input.valor;
        }
        throw new Error(`Conversió no definida entre ${input.unitat} i ${unitatDesti}`);
    }
}

// Classe gestora que utilitza polimorfisme
class GestorConversio {
    private conversors: { [key: string]: IConversor } = {
        longitud: new ConversorLongitud(),
        massa: new ConversorMassa(),
        temperatura: new ConversorTemperatura()
    };

    convertir(tipus: string, input: ValorAmbUnitat, unitatDesti: string): number {
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
const formulari = document.getElementById('formulari-conversio') as HTMLFormElement;
const valorInput = document.getElementById('valor') as HTMLInputElement;
const tipusConversioSelect = document.getElementById('tipus-conversio') as HTMLSelectElement;
const unitatOrigenSelect = document.getElementById('unitat-origen') as HTMLSelectElement;
const unitatDestiSelect = document.getElementById('unitat-desti') as HTMLSelectElement;
const resultatParagraf = document.getElementById('resultat') as HTMLParagraphElement;

// Carrega les unitats segons el tipus de conversió
function carregarUnitats(tipus: string): void {
    let unitats: string[];

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

    // Neteja els selects
    unitatOrigenSelect.innerHTML = '';
    unitatDestiSelect.innerHTML = '';

    // Afegeix les opcions als selects
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

// Carrega les unitats inicials
carregarUnitats('longitud');

// Actualitzar les unitats quan es canvia el tipus de conversió
tipusConversioSelect.addEventListener('change', () => {
    const tipus = tipusConversioSelect.value;
    carregarUnitats(tipus);
});

// Gestionar el submit del conversor
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
    } catch (error) {
        resultatParagraf.textContent = (error as Error).message;
    }
});
