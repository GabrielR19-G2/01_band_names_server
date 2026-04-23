const {io} = require('../index');

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

});
