interface Animal {
    nom: string;
    menjar(): void;
}

// Classe Gos implementa Animal
class Gos implements Animal {
    nom: string;

    constructor(nom: string) {
        this.nom = nom;
    }

    menjar(): void {
        console.log(`El gos ${this.nom} menja pinso.`);
    }
}

// Nova classe Gat que també implementa Animal
class Gat implements Animal {
    nom: string;

    constructor(nom: string) {
        this.nom = nom;
    }

    menjar(): void {
        console.log(`El gat ${this.nom} menja llaunes de tonyina.`);
    }
}
  
// Aquí és on el polimorfisme entra en acció
const animals: Animal[] = [
    new Gos('Toby'),
    new Gat('Misu')
];

for (const animal of animals) {
    // Encara que no sapiguem quin tipus concret d'Animal és,
    // podem cridar menjar() i cadascun actuarà segons la seva implementació.
    animal.menjar();
}
