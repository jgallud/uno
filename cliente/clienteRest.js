function ClienteRest(){
	this.agregarJugador=function(nick){
		$.getJSON("/agregarJugador/"+nick,function(data){
			//se ejecuta cuando conteste el servidor
			console.log(data);
		})
		//sigue la ejecución sin esperar
		// mostrar una ruleta
	}

	this.crearPartida=function(num,nick){
		$.getJSON("/crearPartida/"+num+"/"+nick,function(data){
			console.log(data);
		})
	}

	//unir partida
	//lista de partidas

}