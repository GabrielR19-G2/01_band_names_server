const Band = require("./band").default;
// modelo que maneja la coleccion de bandas
class Bands {
    constructor() {
        this.bands = []
    }

    addBand(band = new Band()) {
        this.bands.push(band);
    }

    /// get bands
    getBands() {
        return this.bands;
    }

    deleteBand(id = '') {
        // va a retornar las bandas que tengan id distinto al que estamos pasando
        this.bands = this.bands.filter(band => band.id !== id)
        return this.bands;
    }

    voteBand(id = '') {
        // barrer el arreglo
        this.bands = this.bands.map(band => {
            // nuevo objeto que sera parte de la banda
            if (band.id === id) {
                // a esta banda hay que incrementar votos +1
                band.votes++;
                return band;
            }
            return band;
        });
    }
}

module.exports = Bands;