<<<<<<< HEAD
const Sequelize = require("sequelize");
const db = require("../config/database");
const Clase = require("./clase");
const User = require("./user");

const Anuncio = db.define("anuncio", {
        titulo: {
            type: Sequelize.STRING
        },
        cuerpo: {
            type: Sequelize.TEXT
        },
        fecha_creacion: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    },  
    {
    timestamps: false
    }
);

Anuncio.belongsTo(Clase)
Anuncio.hasOne(User, {as: "profesor"}) //default foreign key: userId

=======
const Sequelize = require("sequelize");
const db = require("../config/database");
const Clase = require("./clase");
const User = require("./user");

const Anuncio = db.define("anuncio", {
        titulo: {
            type: Sequelize.STRING
        },
        cuerpo: {
            type: Sequelize.TEXT
        },
        fecha_creacion: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    },  
    {
    timestamps: false
    }
);

Anuncio.belongsTo(Clase);
Clase.hasOne(Anuncio);
Anuncio.hasOne(User, {as: "profesor"}) //default foreign key: userId

>>>>>>> bc89ade88faa1ceffb04f4da20496f838b4950f9
module.exports = Anuncio;