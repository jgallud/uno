describe("El juego del UNO...", function() {
  var juego;

  beforeEach(function() {
    juego=new Juego();
    juego.agregarJugador("ana");
    juego.agregarJugador("pepe");
    juego.agregarJugador("luis");
  });

  it("Ana crea una partida para 2 jugadores", function() {
    var ju1=juego.usuarios["ana"];
    expect(juego.numeroPartidas()).toEqual(0);
    var partida=ju1.crearPartida(2);
    expect(juego.numeroPartidas()).toEqual(1);
    expect(partida.codigo).toBeDefined();
    expect(partida.numeroJugadores()).toEqual(1);
    expect(partida.fase.nombre).toBe("inicial");
  });

  it("Ana crea la partida para 2 jugadores y Pepe se une",function(){
    var ju1=juego.usuarios["ana"];
    expect(juego.numeroPartidas()).toEqual(0);
    var partida=ju1.crearPartida(2);
    expect(juego.numeroPartidas()).toEqual(1);
    expect(partida.codigo).toBeDefined();
    expect(partida.numeroJugadores()).toEqual(1);
    expect(partida.fase.nombre).toBe("inicial");
    var ju2=juego.usuarios["pepe"];
    ju2.unirAPartida(partida.codigo);
    expect(partida.numeroJugadores()).toEqual(2);
    expect(partida.fase.nombre).toBe("jugando");
  });

  it("Ana crea la partida para 2 jugadores, Pepe se une, Luis intenta unirse y no puede",function(){
    var ju1=juego.usuarios["ana"];
    expect(juego.numeroPartidas()).toEqual(0);
    var partida=ju1.crearPartida(2);
    expect(juego.numeroPartidas()).toEqual(1);
    expect(partida.codigo).toBeDefined();
    expect(partida.numeroJugadores()).toEqual(1);
    expect(partida.fase.nombre).toBe("inicial");
    var ju2=juego.usuarios["pepe"];
    ju2.unirAPartida(partida.codigo);
    expect(partida.numeroJugadores()).toEqual(2);
    expect(partida.fase.nombre).toBe("jugando");
    var ju3=juego.usuarios["luis"];
    ju3.unirAPartida(partida.codigo);
    expect(partida.numeroJugadores()).toEqual(2);
    expect(partida.fase.nombre).toBe("jugando");
  });

});
