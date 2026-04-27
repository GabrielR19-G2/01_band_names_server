const { io } = require('../index');

// Sockets msgs
io.on('connection', client => {
    console.log('Cliente  conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });


    // on -> estar escuchando, lo que queremos hacer al recibir el evento
    client.on('mensaje', (payload) => {
        console.log('Msg!', payload);

        // , lo que queremos enviar
        io.emit('mensaje', { admin: "Nuevo mensaje" });
    })

    // cliente emite 'nuevo-mensaje'
    client.on('emitir-mensaje', (payload) => {
        console.log(payload);
        // payload -> lo que la persona quiere emitir
        // io.emit('nuevo-mensaje', payload); //emite a todos!
        client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos el que lo emitió

    })
});
