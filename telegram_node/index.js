// import _ from 'config'
// const httpUtil = require('./http_util')
const {SuBot} = require("./bot");
// const {SqliteUtil} = require("./sqlite_util");
const {SqlUtil} = require('./dbhelper/sql_util')
const {SqliteConnection} = require('./dbhelper/sqlite_connection')
const {MySqlConnection} = require('./dbhelper/mysql_connection')
// con = new SqliteConnection('./nihongo.sqlite', 'nihongo')
con = new MySqlConnection({
    host: 'sucicada.cf',
    table: 'nihongo',
    user: 'root',
    password: 'sa',
    database: 'nihongo'
})
const sqlUtil = new SqlUtil(con)

const ttsUtil = require("./tts_util")
// const {getAudioDurationInSeconds} = require('get-audio-duration');

// ttsUrl = "https://translate.google.com/translate_tts?ie=UTF-8&q=%E5%83%95%E3%81%AE%E8%82%8B%E9%AA%A8%E3%82%92%E8%B9%B4%E3%81%A3%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84&tl=ja&total=1&idx=0&textlen=12&tk=&tk=270386.191893&client=webapp&prev=input&ttsspeed=0.6"

const CONFIG = require('./config');
// const {TELEGRAM_TOKEN, TELEGRAM_USER} = require('./config.js');
require('./proxy')

table = CONFIG.TABLE
dbFile = CONFIG.DB_PATH
// const sqliteUtil = new SqliteUtil(table, dbFile)
BOT_TOKEN = CONFIG.TELEGRAM_TOKEN
chat = CONFIG.TELEGRAM_USER
const suBot = new SuBot(BOT_TOKEN)
    .rememberChat(chat)
// Promise.all([
//     httpUtil.request(ttsUrl)
//     ,sqliteUtil.getDB()
// ])

// text = "僕の肋骨を蹴ってください";
text = "僕の肋骨を蹴ってください12313";

function sendVoice({chatId, text}) {
    (async () => {
        let voice, duration;
        let res = await sqlUtil.get(text)
        console.log(res)
        if (!res) {
            ({voice, duration} = await ttsUtil.getVoice(text))
            sqlUtil.add(text, voice, duration)
                .then(console.log)
        } else {
            ({voice, duration} = res)
        }
        console.log(voice, duration)
        suBot.sendVoice({chatId, data: voice, duration})
    })()
}


suBot.getBot().command('talk', (ctx) => {
    // console.log(ctx)
    sendVoice({
        chatId: ctx.from.id,
        text: ctx.message.text.substr('/talk '.length)
    })
})
suBot.start()
// sendVoice({text})

// then(([response, db]) => {
//     console.log(response.rawBody)
// console.log(db)
// return db.run(`INSERT INTO ${table} ('text','voice') VALUES('${ttsUrl}',$voice)`, {
//     $voice: response.rawBody
// })
// })
//     .then((a) => console.log(a))
// .then((db) => {
//     return (async () => {
//         a = await db.all(`select * from ${sqliteUtil.table}`)
//         console.log(a)
//         return a
//     })
// })
// .then(a => console.log(a()))


