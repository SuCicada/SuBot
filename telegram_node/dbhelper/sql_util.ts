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

    /**
     * mysql 和 sqlite 插入blob时语法不一样.
     */
    insert(table, params: object): Promise<any> {
        return this.exec(`INSERT INTO ${this.table}
            (${Object.keys(params).map(k => `'${k}'`).join(',')})
            VALUES
            (${Object.values(params).map(k => `'${k}'`).join(',')})`)
    }

    abstract select(sql, ...params: any[]): Promise<any>
}

export class SqlUtil {
    // private conn: Conn
    private readonly connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
        this.connection.exec(`CREATE TABLE if not exists ${this.connection.table} (
                text TEXT,voice BLOB,duration float)`)
            // .then((r) => console.log(r))
            .catch((r) => console.error(r))
        // connection.open().then(() => {
        // })
    }

    static build(config: object) {
        let type = config['type']
        let sqlConf = config[type]
        // let aa = import('./mysql_connection')
        let connection = require(`./${type}_connection`)
        return new SqlUtil(new connection.default(sqlConf))
    }

// abstract initConn(): any
//     getConnection()
//         :
//         Connection {
//         return this.connection
//     }

// async getConnection(): Promise<any> {
// return this.conn !== undefined ? this.conn : this.initConn();
// return this.connection.open().then(a => {
//     console.log(a)
//     return a
// });
// }

    add(text, voice, duration) {
        return this.connection
            // ('text', 'voice', 'duration')
            .insert(this.connection.table,
                // .exec(`INSERT INTO ${this.connection.table}
                //     SET ?`,
                {
                    text: text.trim(),
                    voice: voice,
                    duration: duration
                })
        // VALUES
        //     ('${text.trim()}', '${voice}', '${duration}')`
        // , {$voice: voice}
        // )
    }

    get(text): Promise<any> {
        return this.connection
            .select(`select voice,duration from ${this.connection.table}
                    where text='${text.trim()}' limit 1`)
            .then(res => res[0])

    }
}

// module.exports.SqliteUtil = SqliteUtil
