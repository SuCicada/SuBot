const {Telegraf} = require('telegraf')

// BOT_TOKEN = "1227008831:AAGYjAXdXIwcDYv13dD61mpfZsrWSEXhfr8"

class SuBot {
    constructor(BOT_TOKEN) {
        // this.BOT_TOKEN = BOT_TOKEN
        this.bot = new Telegraf(BOT_TOKEN)
        this.registerCommand = this.bot.command
    }

    getBot() {
        return this.bot
    }

    rememberChat(chat) {
        this.chat = chat
        return this
    }

    sendVoice({chatId = this.chat, data, duration}) {
        console.log()
        this.bot.telegram
            .sendVoice(chatId,
                {source: data},
                {duration: duration})
            .then(r => {
                console.log(`send voice to ${r.message_id} duration: ${r.voice.duration}`)
                return r
            })
            .catch(r => console.error(r))
    }

    start() {
        this.bot
            .start(ctx => {
                ctx.reply('Welcome!').catch(r => console.error(r))
            })
            .on('text', (ctx) => {
                console.log(ctx.message)
                console.log(ctx.chat.id)
                // ctx.reply('Hello World')
            })
            .launch()
            .then(r => {
                console.log("bot 已启动")
            })

    }
}

module.exports.SuBot = SuBot

// ttsUrl = "https://translate.google.com/translate_tts?ie=UTF-8&q=%E5%83%95%E3%81%AE%E8%82%8B%E9%AA%A8%E3%82%92%E8%B9%B4%E3%81%A3%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84&tl=ja&total=1&idx=0&textlen=12&tk=&tk=270386.191893&client=webapp&prev=input&ttsspeed=0.6"
// file = "tts.mp3"
// var FormData = require('form-data');
// var form = new FormData();
//
// fs = require('fs')
// stream = fs.createReadStream(file);
// form.append('file', stream);//'file'是服务器接受的key
// mp3 = "https://sucicada.cf:4141/resource/tts.mp3"


// bot.telegram
//     .sendMessage(chat, "222222222")
//     .then(a => console.log(a))
// bot.launch()
// process.exit(1)
// bot.telegram.getMe()
// bot.on('message', (ctx) => {
//     chat = ctx.chat.id
//     console.log(ctx.telegram.getChat(chat))
//     console.log(chat)
//     ctx.telegram.sendCopy(ctx.chat.id, ctx.message)
// })
// bot.launch().then(r => console.log(r))
// bot.command('start', ctx => {
//     ctx.reply("Hello Worlsssssssssssd");
//     bot.telegram.sendMessage(ctx.chat.id, "Hello Worlsssssssssssd");
// });
// bot.use(async (ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log('Response time: %sms', ms)
// })
//
// bot.on('text', (ctx) => {
//     console.log(ctx.message)
//     console.log(ctx.chat.id)
//     ctx.reply('Hello World')
// })


// var FormData = require('form-data');
// var fs = require('fs');
// var http = require('http');
// var form = new FormData();
// form.append('file', fs.createReadStream("./filename.zip"));//'file'是服务器接受的key

// var headers = form.getHeaders();//这个不能少
// headers.Cookie = cookie;//自己的headers属性在这里追加
//
// var request = http.request({
//     method: 'post',
//     host: 'ice97.cn',
//     path: '/uploadFile/',
//     headers: headers
// },function(res:any){
//     var str='';
//     res.on('data',function(buffer:any){
//             str+=buffer;//用字符串拼接
//         }
//     );
//     res.on('end',()=>{
//         var result = JSON.parse(str);
//         //上传之后result就是返回的结果
//     });
// });
// form.pipe(request);
