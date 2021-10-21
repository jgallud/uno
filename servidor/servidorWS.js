function ServidorWS(){
	//zona cliente del servidor WS
	this.enviarAlRemitente=function(socket,mensaje,datos){
		socket.emit(mensaje,datos);
	}
	this.enviarATodos=function(io,codigo,mensaje,datos){
		io.sockets.in(codigo).emit(mensaje,datos)
	}

	//zona servidor del servidor WS
	this.lanzarServidorWS=function(io,juego){
		var cli=this;
		io.on("connection",function(socket){
			console.log("Usuario conectado");

			socket.on("crearPartida",function(num,nick){
				var ju1=juego.usuarios[nick];
				var res={codigo:-1};
				var partida=ju1.crearPartida(num);
				console.log("Nueva partida de "+nick +" codigo: "+ju1.codigoPartida);
				res.codigo=ju1.codigoPartida;
				socket.join(res.codigo);
				cli.enviarAlRemitente(socket,"partidaCreada",res);
			});

			socket.on("unirAPartida",function(codigo,nick){
				var ju1=juego.usuarios[nick];
				var res={codigo:-1};
				ju1.unirAPartida(codigo);
				console.log("Jugador "+nick +" se une a partida codigo: "+ju1.codigoPartida);
				res.codigo=ju1.codigoPartida;
				if (res.codigo!=-1){
					socket.join(res.codigo);
					var partida=juego.partidas[codigo];
					cli.enviarAlRemitente(socket,"unidoAPartida",res);
					if (partida.fase.nombre=="jugando"){
						cli.enviarATodos(io,codigo,"pedirCartas",{});
					}
				}
				else{
					cli.enviarAlRemitente(socket,"fallo",res);	
				}
			});

			socket.on("manoInicial",function(nick){
				var ju1=juego.usuarios[nick];
				ju1.manoInicial();
				cli.enviarAlRemitente(socket,"mano",ju1.mano);
			});
		})
	}
}

module.exports.ServidorWS=ServidorWS;