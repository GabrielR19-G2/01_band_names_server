const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
console.log('init server');

// coleccion de bandas
const bands = new Bands();
bands.addBand(new Band('Queen'))
bands.addBand(new Band('Mac Miller'))
bands.addBand(new Band('Eladio Carrion'))
bands.addBand(new Band('Duki'))

console.log(bands);


// Sockets msgs
io.on('connection', client => {
    console.log('Cliente  conectado');

    client.emit('active-bands', bands.getBands())

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
    client.on('vote-band', (payload) => {
        // que queremos hacer
        //console.log(payload);
        bands.voteBand(payload.id);
        //notificando del cambio y hay que refrezcar. io -> Servidor
        io.emit('active-bands', bands.getBands())
    })
    // add-band
    // payload -> band.name
    // crear nueva banda y agragarla a la list de bandas
    // notificar a los clientes conectados q hubo cambio de bandas (una nueva)

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands())
    })


    client.on('delete-band', (payload) => {

        bands.deleteBand(payload.id);
        //notificando del cambio y hay que refrezcar. io -> Servidor
        io.emit('active-bands', bands.getBands())
    })
});
