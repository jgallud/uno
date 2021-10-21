function ClienteRest(){
	this.agregarJugador=function(nick){
		$.getJSON("/agregarJugador/"+nick,function(data){
			//se ejecuta cuando conteste el servidor
			console.log(data);
		})
	}

	this.crearPartida=function(num,nick){
		$.getJSON("/crearPartida/"+num+"/"+nick,function(data){
			console.log(data);
		})
	}
	this.obtenerListaPartidas=function(){
		$.getJSON("/obtenerListaPartidas",function(data){
			console.log(data);
		})
	}
}