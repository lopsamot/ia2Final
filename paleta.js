class paleta{

    constructor( nombre ){
        this.imagen = loadImage(nombre);
    }

    darColor(){
        let x = int( random( this.imagen.width ));
        let y = int( random( this.imagen.height ));

        let elColor = this.imagen.get( x , y );
        //print("color", elColor);
        return elColor;
    }

}