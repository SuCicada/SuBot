import {Connection} from "./sql_util";
import * as sqlite3 from 'sqlite3'
import * as sqlite from 'sqlite'

// const splitter = require('sqlite');
//
// const sqlite3 = require('sqlite3').verbose();
//
export default class SqliteConnection extends Connection {

    conn: Promise<void | sqlite.Database>

    constructor({dbPath, table}) {
        super(dbPath, table);
        this.conn = sqlite.open({
            filename: dbPath,
            driver: sqlite3.cached.Database
        }).catch(r => console.error(r))
    }

    exec(sql, ...params: any[]) {
        return this.conn.then((c: sqlite.Database) => c.run(sql, params))
    }

    insert(table, params: object): Promise<any> {
        // `(${Object.keys(params).map(k => `'${k}'`).join(',')})`
        let newParams = {};
        Object.entries(params).forEach(kv => {
            newParams[`$${kv[0]}`] = kv[1]
        })
        return this.conn.then(
            (c: sqlite.Database) =>
                c.run(`INSERT INTO ${this.table}
                    (${Object.keys(params).map(k => `'${k}'`).join(',')})
                    VALUES
                    (${Object.keys(params).map(k => `$${k}`).join(',')})`
                    , newParams))
    }

    select(sql, ...params: any[]) {
        return this.conn.then((c: sqlite.Database) => c.all(sql, params))
    }
}
