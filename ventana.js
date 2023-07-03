class ventana {           
    constructor (x) {
        this.x = x;
        this.y = 200;
        this.ancho = random(100, 300);
        this.alto = random(200, 500);
        
        this.colorStroke = color(miPaleta.darColor());
        this.colorStrokeOriginal = this.colorStroke;
        this.colorFill = color(miPaleta.darColor());
        this.colorFillOriginal = this.colorFill;
        this.colorRect = color(miPaleta.darColor());
        this.colorRectOriginal = this.colorRect;

        this.izq = this.x - this.ancho/2;
        this.der = this.x + this.ancho/2;
        this.arr = this.y - this.alto/2;
        this.abj = this.y + this.alto/2;
    }


    dibujar() {
    

        push();



        translate(width, height);
        rotate(PI);

        
        noStroke();
        fill(this.colorRect);
        rect(this.x - 50, this.y -50, this.ancho + 100, this.alto + 100);

        fill(this.colorFill);
        stroke(this.colorStroke);
        strokeWeight(8);
        //strokeCap(SQUARE);
        
        rect(this.x, this.y, this.ancho, this.alto);
        line(this.x + this.ancho/2, this.y, this.x + this.ancho/2, this.y + this.alto);//vertical
        line(this.x + this.ancho/4, this.y, this.x + this.ancho/4, this.y + this.alto);
        line(this.x + this.ancho/4 +this.ancho/2, this.y, this.x + this.ancho/4 + this.ancho/2, this.y + this.alto);

    
        pop();
        
    }

}