class circuitos{
    constructor(x_, y_){
        this.x = x_;
        this.y = y_;

        this.dirHoriz = random(100) < 50;
        this.dirVert = random(100) < 50;

        this.color = miPaleta.darColor();
        this.anchoLineas = random(15, 80);

        this.derecha = this.x;
        this.izquierda = this.x;
        this.arriba = this.y;
        this.abajo = this.y;

        this.vel = 5;

        this.finCrecimiento = false;
    }
    
    
    dibujar( ){

        push();

        noFill();
        strokeCap(PROJECT);

        strokeWeight(this.anchoLineas);
        stroke(this.color);
        
        translate(0, height);
        scale(1,-1);

        ///horizontal
        if(this.dirHoriz){
            line(this.x, this.y, this.derecha, this.y);

        }
        else{
            line(this.x, this.y, this.izquierda, this.y);
        }
        
         ///vertical
        if(this.dirVert){
            line(this.x, this.y, this.x, this.abajo);

        }
        else{
            line(this.x, this.y, this.x, this.arriba);
        }
        
            
        pop();

        if(this.derecha >= width && this.izquierda <= 0 && this.abajo >= width && this.arriba <= 0){
            this.finCrecimiento = true;
        }

        return this.finCrecimiento;

    }

    actualizar (){

        if(this.derecha <= width){
            this.derecha = this.derecha + this.vel;
        }
        
        if(this.izquierda >= 0){
            this.izquierda = this.izquierda - this.vel;
        }

        if(this.abajo <= width){
            this.abajo = this.abajo + this.vel;
        }
        
        if(this.arriba >= 0){
            this.arriba = this.arriba - this.vel;
        }

        
    }

}