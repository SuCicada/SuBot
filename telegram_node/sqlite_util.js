const sqlite3 = require('sqlite3').verbose();
const splitter = require('sqlite');
// var {Promise} = require('bluebird');
// module.exports = {
// this.table = "nihongo"
// this .dbFile = "nihongo.sqlite"


class SqliteUtil {

    constructor(table, dbFile) {
        this.table = table
        this.dbFile = dbFile
        this.db = this.getDB()
    }

    getDB() {
        return this.db !== undefined ? this.db :
            (async () => {
                const db = await splitter.open({
                    filename: this.dbFile,
                    driver: sqlite3.cached.Database
                })
                await db.run(`CREATE TABLE if not exists ${this.table} (
                text TEXT,voice BLOB,duration int)`);
                return db
            })()
    }

    add(text, voice, duration) {
        console.log("======", {voice, duration})
        return this.db
            .then(db =>
                db.run(`INSERT INTO ${this.table} 
                    ('text', 'voice', 'duration') 
                VALUES
                    ('${text.trim()}', $voice, '${duration}')`
                    , {$voice: voice}
                ))
    }

    get(text) {
        return this.db
            .then(db => {
                return db.get(`select voice,duration from ${this.table}
                    where text='${text.trim()}' `)
            })

    }
}

module.exports.SqliteUtil = SqliteUtil
