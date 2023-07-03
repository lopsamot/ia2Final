class baseCircuitos{
    constructor(x_, y_){
        this.x = x_;
        this.y = map(y_, 0, width, 714, height);

        this.dirHoriz = random(100) < 50;
        this.dirVert = random(100) < 50;

        this.color = miPaleta.darColor();
        this.anchoLineas = random(15, 60);

        this.derecha = this.x;
        this.izquierda = this.x;
        this.arriba = this.y;
        this.abajo = this.y;

        this.vel = 5;
    }
    
    
    dibujar( ){

        push();

        noFill();
        strokeCap(PROJECT);

        strokeWeight(this.anchoLineas);
        stroke(this.color);
        
        translate(0, height + 714);
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

    }

    actualizar (){

        if(this.derecha <= width){
            this.derecha = this.derecha + this.vel;
        }
        
        if(this.izquierda >= 0){
            this.izquierda = this.izquierda - this.vel;
        }

        if(this.abajo <= 714){
            this.abajo = this.abajo + this.vel;
        }
        
        if(this.arriba >= 0){
            this.arriba = this.arriba - this.vel;
        }

        
    }

}