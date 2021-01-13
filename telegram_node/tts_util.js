const googleTTS = require('google-tts-api');
const audioLoader = require('audio-loader')
// var ffmpeg = require('ffmpeg');
// var ffmpeg = require('fluent-ffmpeg');
const fs = require("fs");
const {Readable} = require('stream')
// const {getAudioDurationInSeconds} = require('get-audio-duration');
const audioDecode = require('./su-audio-decode')
// var command = new FfmpegCommand();

// get audio URL
module.exports = new class {
    option = {
        lang: 'ja-JP',
        slow: false,
        host: 'https://translate.google.cn',
    }

    getUrl(text) {
        return googleTTS.getAudioUrl(text, this.option)
    }

    getVoiceDuration(buf) {
        /* 因为从translate.google 上获取的音频是 audio/mpeg.
        *  audio-decode 中不支持对其的判断, 所以clone了一份, 讲其中的类型判断部分去掉了.
        * */
        return audioLoader(buf, {decode: audioDecode})
            .then(res => res.duration)
    }

    getVoice(text) {
        return (async () => {
            let base = await googleTTS.getAudioBase64(text, this.option)
            let data = Buffer.from(base, 'base64')
            // console.log(data)
            // fs.writeFileSync("test.mp3", data)
            //     .then(console.log)f
            // var stream = bufferToStream(data)
            // var file = "C:\\Users\\User\\Documents\\PROGRAM\\FlinkTest\\telegram\\telegram-node\\good\\test.mp3"
            // var stream = await fs.createReadStream(file)
            // var time = await getAudioDurationInSeconds()
            let duration = parseFloat(await this.getVoiceDuration(data))
            return {voice: data, duration: duration}
            // console.log(time)
            // var res = new ffmpeg('test.mp3')
            //     .inputOption(['-i'])
            //     .then((a) => {
            //     console.log(a)
            // })
            // console.log(res)

        })()
    }
}

function bufferToStream(binary) {

    const readableInstanceStream = new Readable({
        read() {
            this.push(binary);
            this.push(null);
        }
    });

    return readableInstanceStream;
}

// getVoice("僕の肋骨を蹴ってください")
//     .then(voice => console.log(voice))