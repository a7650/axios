const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')


const app = express()
const compiler = webpack(WebpackConfig)

const router = express.Router()

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    if (req.method.toLowerCase() == 'options') {
        res.sendStatus(200);
    } else {
        next();
    }
})

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.get('/simple/get', function (req, res) {
    res.json({
        msg: `hello world`
    })
})
router.post('/simple/post', function (req, res) {
    // console.log(req)
    res.json(req.body)
})
router.get('/ip', function (req, res) {
    console.log("getIP")
    axios.get("https://whois.pconline.com.cn/ipJson.jsp", {
        headers: {
            referer: "https://whois.pconline.com.cn/"
        }
    }).final(res => {
        console.log(res)
        res.json(res)
    })
})

app.use(router)


const port = process.env.PORT || 9000
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://192.168.0.103:${port}, Ctrl+C to stop`)
})