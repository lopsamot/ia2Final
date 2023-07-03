class fondo{

    
    constructor(){
        this.color = color(miPaleta.darColor());
        this.color2 = color(miPaleta.darColor());
        this.color3 = color(miPaleta.darColor());

        this.posX2 = random(width/4, width/2);

        this.posX3 = random(width/2, width);
        this.condicion = random(100) < 70;

    }
    
    dibujar(){

        push();

        noStroke();    
        
        fill(this.color);
        rect(0,0,width,width);

        fill(this.color2);
        rect(this.posX2, 0, width, width);


        if( this.condicion ){
            fill(this.color3);
            rect(this.posX3, 0, width, width);

        }

        pop();
    }
}

