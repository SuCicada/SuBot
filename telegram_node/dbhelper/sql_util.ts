const sqlite3 = require('sqlite3').verbose();
const splitter = require('sqlite');
// var {Promise} = require('bluebird');
// module.exports = {
// this.table = "nihongo"
// this .dbFile = "nihongo.sqlite"


type Conn = any

export abstract class Connection {
    public readonly db: string
    public readonly table: string

    protected constructor(db: string, table: string) {
        this.db = db;
        this.table = table;
    }

    // abstract open(): Promise<any>

    abstract exec(sql, ...params: any[]): Promise<any>

    abstract select(sql, ...params: any[]): Promise<any>
}

export class SqlUtil {
    // private conn: Conn
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
        this.connection.exec(`CREATE TABLE if not exists ${this.connection.table} (
                text TEXT,voice BLOB,duration int)`)
            // .then((r) => console.log(r))
            .catch((r) => console.log(r))
        // connection.open().then(() => {
        // })
    }

    // abstract initConn(): any
    getConnection(): Connection {
        return this.connection
    }

    // async getConnection(): Promise<any> {
    // return this.conn !== undefined ? this.conn : this.initConn();
    // return this.connection.open().then(a => {
    //     console.log(a)
    //     return a
    // });
    // }

    add(text, voice, duration) {
        return this.connection
            .exec(`INSERT INTO ${this.connection.table}
                    ('text', 'voice', 'duration')
                VALUES
                    ('${text.trim()}', $voice, '${duration}')`
                , {$voice: voice}
            )
    }

    get(text): Promise<any> {
        return this.connection
            .select(`select voice,duration from ${this.connection.table}
                    where text='${text.trim()}' `)

    }
}

// module.exports.SqliteUtil = SqliteUtil
