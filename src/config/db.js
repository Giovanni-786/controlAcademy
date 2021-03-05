const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: "102030",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})