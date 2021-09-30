
function Juego(){
    this.usuarios={};
    this.partidas={};

    this.agregarJugador=function(nick){
        if (!this.usuarios[nick]){
            var jugador= new Jugador(nick,this);
            this.usuarios[nick]=jugador;
        }
        else{
            console.log("El nick está en uso");
        }
    }

    this.crearPartida=function(nick,numJug){
        var codigo="patata";
        var jugador=this.usuarios[nick];
        codigo=this.obtenerCodigo();
        while (this.partidas[codigo]){
            codigo=this.obtenerCodigo();
        };
        var partida=new Partida(codigo,jugador,numJug);
        this.partidas[codigo]=partida;

        return partida;
    }

    this.obtenerTodasPartidas=function(){
        var lista=[];

        for(each in this.partidas){
            var partida=this.partidas[each];
            lista.push({propietario:partida.propietario,codigo:each})
        }

        return lista;
    }

    this.unirAPartida=function(codigo,nick){
        if (this.partidas[codigo]){
            var jugador=this.usuarios[nick];
            this.partidas[codigo].unirAPartida(jugador);
        }
    }

    this.obtenerCodigo=function(){
		let cadena="ABCDEFGHIJKLMNOPQRSTUVXYZ";
		let letras=cadena.split('');
		let maxCadena=cadena.length;
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,maxCadena)-1]);
		}
		return codigo.join('');
        //return Date.now().toString();
	}

    this.numeroPartidas=function(){
		return Object.keys(this.partidas).length;
	}
}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}


function Jugador(nick,juego){
    this.nick=nick;
    this.juego=juego;
    this.mano=[];
    this.codigoPartida;
    this.crearPartida=function(numJug){
        return this.juego.crearPartida(nick,numJug);
    }
    this.unirAPartida=function(codigo){
        this.juego.unirAPartida(codigo,nick);
    }
    this.robar=function(num){
        var partida=this.obtenerPartida(this.codigoPartida);
        var robadas=partida.dameCartas(num);
        //var tmp=this.mano;
        this.mano=this.mano.concat(robadas);
    }
    this.manoInicial=function(){
        var partida=this.obtenerPartida(this.codigoPartida);
        this.mano=partida.dameCartas(7);
    }
    this.obtenerPartida=function(codigo){
        return this.juego.partidas[codigo];
    }
}

function Partida(codigo,jugador,numJug){
    this.codigo=codigo;
    this.mazo=[];
    this.propietario=jugador.nick;
    this.numJug=numJug;
    this.jugadores={};
    this.fase=new Inicial();

    this.unirAPartida=function(jugador){
        this.fase.unirAPartida(this,jugador);
    }
    this.puedeUnirAPartida=function(jugador){
        this.jugadores[jugador.nick]=jugador;
        jugador.codigoPartida=this.codigo;
    }
    this.numeroJugadores=function(){
		return Object.keys(this.jugadores).length;
	}
    this.crearMazo=function(){
        var colores=["azul","amarillo","verde","rojo"];
        for (i=0;i<colores.length;i++){
            this.mazo.push(new Numero(0,colores[i]));
        }
        for(j=0;j<colores.length;j++){
            for (i=1;i<10;i++){
                this.mazo.push(new Numero(i,colores[j]));
                this.mazo.push(new Numero(i,colores[j]));
            }
        }
        for(j=0;j<colores.length;j++){
            this.mazo.push(new Cambio(20,colores[j]));
            this.mazo.push(new Cambio(20,colores[j]));
        }
        for(j=0;j<colores.length;j++){
            this.mazo.push(new Bloqueo(20,colores[j]));
            this.mazo.push(new Bloqueo(20,colores[j]));
        }
        for(j=0;j<colores.length;j++){
            this.mazo.push(new Mas2(20,colores[j]));
            this.mazo.push(new Mas2(20,colores[j]));
        }
        for (i=1;i<5;i++){
            this.mazo.push(new Comodin(20));
            this.mazo.push(new Comodin4(20));
        }
    };

    this.asignarUnaCarta=function(){
        var maxCartas=this.mazo.length;
        var indice=randomInt(1,maxCartas)-1;
        var carta=this.mazo.splice(indice,1);
        return carta[0];
    }
    this.dameCartas=function(num){
        var cartas=[];
        for(i=0;i<num;i++){
            cartas.push(this.asignarUnaCarta());
        }
        return cartas;
    }

    this.crearMazo();
    this.unirAPartida(jugador);
}

function Inicial(){
    this.nombre="inicial";
    this.unirAPartida=function(partida,jugador){
        partida.puedeUnirAPartida(jugador);
        if (partida.numeroJugadores()==partida.numJug){
            partida.fase=new Jugando();
        }
    }
}
function Jugando(){
    this.nombre="jugando";
    this.unirAPartida=function(partida,jugador){
        console.log("La partida ya ha comenzado");
    }
}
function Final(){
    this.nombre="final";
    this.unirAPartida=function(partida,jugador){
        console.log("La partida ha terminado");
    }
}

function Numero(valor,color){
    this.tipo="numero";
    this.color=color;
    this.valor=valor;
}

function Cambio(valor,color){
    this.tipo="cambio";
    this.color=color;
    this.valor=valor;   
}

function Bloqueo(valor,color){
    this.tipo="bloqueo";
    this.color=color;
    this.valor=valor;    
}

function Mas2(valor,color){
    this.tipo="mas2";
    this.color=color;
    this.valor=valor;    
}

function Comodin(valor){
    this.tipo="comodin";
    this.valor=valor;
}

function Comodin4(valor){
    this.tipo="comodin4";
    this.valor=valor;
}