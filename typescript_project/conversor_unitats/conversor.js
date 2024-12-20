// conversor.ts
// Enums per a les unitats
export var UnitatLongitud;
(function (UnitatLongitud) {
    UnitatLongitud["Metres"] = "metres";
    UnitatLongitud["Quilometres"] = "quil\u00F2metres";
    UnitatLongitud["Centimetres"] = "cent\u00EDmetres";
    UnitatLongitud["Polzades"] = "polzades";
    UnitatLongitud["Peus"] = "peus";
})(UnitatLongitud || (UnitatLongitud = {}));
export var UnitatMassa;
(function (UnitatMassa) {
    UnitatMassa["Grams"] = "grams";
    UnitatMassa["Quilograms"] = "quilograms";
    UnitatMassa["Lliures"] = "lliures";
})(UnitatMassa || (UnitatMassa = {}));
export var UnitatTemperatura;
(function (UnitatTemperatura) {
    UnitatTemperatura["Celsius"] = "celsius";
    UnitatTemperatura["Fahrenheit"] = "fahrenheit";
    UnitatTemperatura["Kelvin"] = "kelvin";
})(UnitatTemperatura || (UnitatTemperatura = {}));
export class Conversor {
    static convertir(valor, unitatOrigen, unitatDesti, taulaConversio) {
        const factorOrigen = taulaConversio[unitatOrigen];
        const factorDesti = taulaConversio[unitatDesti];
        if (factorOrigen === undefined || factorDesti === undefined) {
            throw new Error('Unitat no vàlida');
        }
        // Convertir el valor a una unitat base
        const valorBase = valor * factorOrigen;
        // Convertir de la unitat base a la unitat de destí
        return valorBase / factorDesti;
    }
    static convertirLongitud(valor, unitatOrigen, unitatDesti) {
        const taulaConversio = {
            [UnitatLongitud.Metres]: 1,
            [UnitatLongitud.Quilometres]: 1000,
            [UnitatLongitud.Centimetres]: 0.01,
            [UnitatLongitud.Polzades]: 0.0254,
            [UnitatLongitud.Peus]: 0.3048,
        };
        return this.convertir(valor, unitatOrigen, unitatDesti, taulaConversio);
    }
    static convertirMassa(valor, unitatOrigen, unitatDesti) {
        const taulaConversio = {
            [UnitatMassa.Grams]: 1,
            [UnitatMassa.Quilograms]: 1000,
            [UnitatMassa.Lliures]: 453.592,
        };
        return this.convertir(valor, unitatOrigen, unitatDesti, taulaConversio);
    }
    static convertirTemperatura(valor, unitatOrigen, unitatDesti) {
        let valorEnKelvin;
        // Convertir el valor a Kelvin
        switch (unitatOrigen) {
            case UnitatTemperatura.Celsius:
                valorEnKelvin = valor + 273.15;
                break;
            case UnitatTemperatura.Fahrenheit:
                valorEnKelvin = ((valor - 32) * 5) / 9 + 273.15;
                break;
            case UnitatTemperatura.Kelvin:
                valorEnKelvin = valor;
                break;
            default:
                throw new Error('Unitat d\'origen no vàlida');
        }
        // Convertir de Kelvin a la unitat de destí
        let resultat;
        switch (unitatDesti) {
            case UnitatTemperatura.Celsius:
                resultat = valorEnKelvin - 273.15;
                break;
            case UnitatTemperatura.Fahrenheit:
                resultat = ((valorEnKelvin - 273.15) * 9) / 5 + 32;
                break;
            case UnitatTemperatura.Kelvin:
                resultat = valorEnKelvin;
                break;
            default:
                throw new Error('Unitat de destí no vàlida');
        }
        return resultat;
    }
}
