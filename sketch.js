
let miPaleta;
let miFondo;
let miBase;
let miCircuito = [];
let miBaseCircuitos = [];
let miVentana = [];


let APosYCircuitos = [];
let APosXCircuitos = [];

let moduloCirc;
let cantmoduloCirc = 20;

let cantidadCircuitos = 0;

//duplicado circuitos base
let APosYBaseCircuitos = [];
let APosXBaseCircuitos = [];

let moduloBaseCirc;
let cantmoduloBaseCirc = 20;

let cantidadBaseCircuitos = 0;
///////////////////////////


let a_posVent = [];

let moduloVent;
let cantModuloVent = 3;

let cantidadVentanas = 0;

let estado = "lineas";
let finLineas = [];

//SONIDO
let monitorear = false;

let mic;
let pitch;
let audioContext;

let c;
let gestorAmp;
let gestorPitch;
let haySonido;
let antesHabiaSonido;

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';



function preload() {
  miPaleta = new paleta("data/ejemplo2.png");
}


function setup() {

  createCanvas(displayHeight, displayHeight);
  
  miFondo = new fondo();
  
  miBase = new base();

  moduloCirc = displayHeight * 1.0 / cantmoduloCirc;
  
  //duplicado circuitos base
  moduloBaseCirc = displayHeight * 1.0 / cantmoduloBaseCirc;
///////////////////////////////////////

  moduloVent = displayHeight * 1.0 / cantModuloVent;


  for(let i = 1; i <= 20; i ++){
    APosXCircuitos[i] = false;
    APosYCircuitos[i] = false;
  }

  //duplicado circuitos base
  for(let i = 1; i <= 20; i ++){
    APosXBaseCircuitos[i] = false;
    APosYBaseCircuitos[i] = false;
  }
 ////////////////////////////////

  for(let i = 1; i <= 3; i ++){
    a_posVent [i] = false;
  }

  //SONIDO
  //inicializo la escucha de sonido
  audioContext = getAudioContext();
	mic = new p5.AudioIn();
  //acá le pido que llame a startPitch
  mic.start( startPitch );

  gestorAmp = new GestorSenial( 0.01 , 0.4 );
  gestorPitch = new GestorSenial( 40 , 75 );

  //hay que agregar esto
	userStartAudio();
  antesHabiaSonido = false;
}

function draw() {

  print(gestorPitch.filtrada);

  //SONIDO
  let vol = mic.getLevel();
  gestorAmp.actualizar( vol );

  haySonido = gestorAmp.filtrada>0.05;
  let inicioElSonido = haySonido && !antesHabiaSonido;
  let finDelSonido = !haySonido && antesHabiaSonido;

  miFondo.dibujar();

  /////circuitos creacion y draw
  ////posiciones por cuadrantes/////
  let posCircX = int(random(cantmoduloCirc));
  let posCircY = int(random(cantmoduloCirc));

  //duplicado circuitos base
  let posBaseCircX = int(random(cantmoduloBaseCirc));
  let posBaseCircY = int(random(cantmoduloBaseCirc));
//////////////////////////////
  

  if( !APosXCircuitos [posCircX] && !APosYCircuitos [posCircY]){

    if(haySonido && cantidadCircuitos <= 5){
      print("hay sonido");
      print(cantidadCircuitos);
      miCircuito[ cantidadCircuitos ] = new circuitos( posCircX * moduloCirc , posCircY * moduloCirc );
      cantidadCircuitos ++;

      print(APosXCircuitos [posCircX]);

      APosXCircuitos [ posCircX ] = true;
      APosYCircuitos [ posCircY ] = true;
    }
  }

    //duplicado circuitos base
    if( !APosXBaseCircuitos [posBaseCircX] && !APosYBaseCircuitos [posBaseCircY]){

      if(haySonido && cantidadBaseCircuitos <= 3){
        miBaseCircuitos[ cantidadBaseCircuitos ] = new baseCircuitos( posBaseCircX * moduloBaseCirc , posBaseCircY * moduloBaseCirc );
        cantidadBaseCircuitos ++;
  
        print(APosXBaseCircuitos [posBaseCircX]);
  
        APosXBaseCircuitos [ posBaseCircX ] = true;
        APosYBaseCircuitos [ posBaseCircY ] = true;
      }
    }
///////////////////////////////////////////////////////
  
    for( let i=0 ; i<cantidadCircuitos ; i++ ){
      miCircuito[i].dibujar();

        if(haySonido){
          miCircuito[i].actualizar();
        }
      
      finLineas[i] = miCircuito[i].dibujar();  
      
      if(finLineas[i] == true){
        estado = "ventanas";
      }      
    }
  
   
    miBase.dibujar();  
  
    //duplicado circuitos base
    for( let i=0 ; i<cantidadBaseCircuitos ; i++ ){
      miBaseCircuitos[i].dibujar();

        if(haySonido){
          miBaseCircuitos[i].actualizar();
        }
    }
    ///////////////////////////
  


  ////posiciones por cuadrantes/////
  if(estado == "ventanas"){
    let posVent = int(random(3));
    
    
    //condicion de audio para ventanas
    if( !a_posVent [posVent] && inicioElSonido){
  
      a_posVent [ posVent ] = true;
      
      
      if(cantidadVentanas <= 10){
        
        miVentana[ cantidadVentanas ] = new ventana( posVent * moduloVent);
        cantidadVentanas ++;
      }
    }
  
    for( let i=0 ; i<cantidadVentanas ; i++ ){
      miVentana[i].dibujar();
      
    }
  }
  

 
  //SONIDO
  if( monitorear ){
    gestorAmp.dibujar( 100 , 100 );
    gestorPitch.dibujar( 100 , 300 );
  }
  
  antesHabiaSonido = haySonido;
}


//SONIDO
//--------------------------------------------------------------------
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}
//--------------------------------------------------------------------
function modelLoaded() {
  //select('#status').html('Model Loaded');
  getPitch();
  //console.log( "entro aca !" );

}
//--------------------------------------------------------------------
function getPitch() {
  pitch.getPitch(function(err, frequency) {
  if (frequency) {    	
    let midiNum = freqToMidi(frequency);
    //console.log( midiNum );

    gestorPitch.actualizar( midiNum );

  }
  getPitch();
})
}
