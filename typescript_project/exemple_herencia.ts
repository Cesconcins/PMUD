class Vehicle {
    protected velocitat: number = 0;
  
    accelerar(increment: number): void {
        this.velocitat += increment;
        console.log(`Velocitat actual: ${this.velocitat} km/h`);
    }
}
  
class Cotxe extends Vehicle {
    private marca: string;
  
    constructor(marca: string) {
        super();
        this.marca = marca;
    }
  
    accelerar(increment: number): void {
        super.accelerar(increment);
        console.log(`El ${this.marca} està accelerant.`);
    }
}

const cotxe = new Cotxe('Toyota');
cotxe.accelerar(50);
  
