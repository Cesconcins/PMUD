// conversor.ts

// Enums per a les unitats
export enum UnitatLongitud {
    Metres = 'metres',
    Quilometres = 'quilòmetres',
    Centimetres = 'centímetres',
    Polzades = 'polzades',
    Peus = 'peus',
}
  
export enum UnitatMassa {
    Grams = 'grams',
    Quilograms = 'quilograms',
    Lliures = 'lliures',
}
  
export enum UnitatTemperatura {
    Celsius = 'celsius',
    Fahrenheit = 'fahrenheit',
    Kelvin = 'kelvin',
}

export type TipusConversio = 'longitud' | 'massa' | 'temperatura';

export class Conversor {
    static convertir<T>(
        valor: number,
        unitatOrigen: T,
        unitatDesti: T,
        taulaConversio: Record<string, number>
    ): number {
        const factorOrigen = taulaConversio[unitatOrigen as unknown as string];
        const factorDesti = taulaConversio[unitatDesti as unknown as string];
    
        if (factorOrigen === undefined || factorDesti === undefined) {
            throw new Error('Unitat no vàlida');
        }
  
      // Convertir el valor a una unitat base
      const valorBase = valor * factorOrigen;
  
      // Convertir de la unitat base a la unitat de destí
      return valorBase / factorDesti;
    }
  
    static convertirLongitud(
      valor: number,
      unitatOrigen: UnitatLongitud,
      unitatDesti: UnitatLongitud
    ): number {
      const taulaConversio: Record<string, number> = {
        [UnitatLongitud.Metres]: 1,
        [UnitatLongitud.Quilometres]: 1000,
        [UnitatLongitud.Centimetres]: 0.01,
        [UnitatLongitud.Polzades]: 0.0254,
        [UnitatLongitud.Peus]: 0.3048,
      };
  
      return this.convertir(valor, unitatOrigen, unitatDesti, taulaConversio);
    }
  
    static convertirMassa(
        valor: number,
        unitatOrigen: UnitatMassa,
        unitatDesti: UnitatMassa
    ): number {
        const taulaConversio: Record<string, number> = {
            [UnitatMassa.Grams]: 1,
            [UnitatMassa.Quilograms]: 1000,
            [UnitatMassa.Lliures]: 453.592,
        };
    
        return this.convertir(valor, unitatOrigen, unitatDesti, taulaConversio);
    }
  
    static convertirTemperatura(
        valor: number,
        unitatOrigen: UnitatTemperatura,
        unitatDesti: UnitatTemperatura
    ): number {
        let valorEnKelvin: number;
    
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
        let resultat: number;
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
  