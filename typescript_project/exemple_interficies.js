var Gos = /** @class */ (function () {
    function Gos(nom) {
        this.nom_gos = nom;
    }
    Gos.prototype.menjar = function () {
        console.log("En ".concat(this.nom_gos, " est\u00E0 menjant."));
    };
    return Gos;
}());
var gos = new Gos('Toby');
gos.menjar();
