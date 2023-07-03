class base{

    
    constructor(){
        this.x = random(displayWidth);
        this.y = random(714, displayHeight);
        this.ancho = displayWidth;
        this.alto = random(400, 1000);
        this.color = miPaleta.darColor();
        this.anchoLineas = random(15, 40);

        this.colorFondo = miPaleta.darColor();
    }
    
    dibujar(){

        push();

        noStroke();
        fill(this.colorFondo);
        rect(0, 714, displayWidth, displayHeight);
/* 
        noFill();
        stroke(this.color);
        strokeWeight(this.anchoLineas);


        line(this.x, this.y, this.x, this.y + this.alto);
        line(this.x, this.y, this.x + this.ancho, this.y);
 */
        
        pop();
    }
}
