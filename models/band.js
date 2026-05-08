const { v4: uuid } = require('uuid');

class Band {
    //propiedades en el constructor
    constructor(name = 'no-name') {
        // identificador único
        this.id = uuid();
        this.name = name;
        this.votes = 1;
    }
}

module.exports = Band;