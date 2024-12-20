class Persona {
    private nom: string;
    private edat: number;
  
    constructor(nom: string, edat: number) {
        this.nom = nom;
        this.edat = edat;
    }
  
    public saludar(): void {
        console.log(`Hola, em dic ${this.nom} i tinc ${this.edat} anys.`);
    }
}
  
const persona = new Persona('Francesco', 22);
persona.saludar();

// tsc exemple_classes.ts
// Go Live en el html