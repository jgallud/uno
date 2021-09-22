
function Juego(){
    this.jugadores={};
    this.partidas={};

    this.agregarJugador=function(nick){
        if (!this.jugadores[nick]){
            var jugador= new Jugador(nick,this);
            this.jugadores[nick]=jugador;
        }
    }

    this.crearPartida=function(nick,numJug){
        //crear código único
        //crear la instancia de Partida
        //asignarla a la coleccion partidas
    }
}

function Jugador(nick,juego){
    this.nick=nick;
    this.juego=juego;
    this.crearPartida=function(numJug){
        this.juego.crearPartida(nick,numJug)
    }
}

function Partida(nombre){
    this.nombre=nombre;
}

function Carta(color,tipo){
    this.color=color;
    this.tipo=tipo;
}