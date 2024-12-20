var Persona = /** @class */ (function () {
    function Persona(nom, edat) {
        this.nom = nom;
        this.edat = edat;
    }
    Persona.prototype.saludar = function () {
        console.log("Hola, em dic ".concat(this.nom, " i tinc ").concat(this.edat, " anys."));
    };
    return Persona;
}());
var persona = new Persona('Francesco', 22);
persona.saludar();
// tsc exemple_classes.ts
// Go Live en el html
