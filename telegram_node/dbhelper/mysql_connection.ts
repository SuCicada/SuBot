import {Connection} from "./sql_util";
import * as mysql from 'promise-mysql'
import * as Bluebird from "bluebird";

export default class MySqlConnection extends Connection {

    conn: Bluebird<void | mysql.Connection>

    constructor({database, table, host, user, password}) {
        super(database, table);
        this.conn = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        })
            .catch(err => console.error(err))
        // .then(r => console.log(r))
    }

    exec(sql, ...params: any[]): Promise<any> {
        return this.conn.then((c: mysql.Connection) => {
            return c.query(sql, params)
        })
    }

    insert(table, params: object): Promise<any> {
        return this.exec(`INSERT INTO ${table}
                SET ?`, params)
    }

    select(sql, ...params: any[]): Promise<any> {
        return this.exec(sql, params)
    }
}
