const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const cors = require("cors")
const multer = require('multer')
const path = require('path')

const app = express()
const port = process.env.PORT
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('File must be image format'))
        cb(undefined, true)
    }
})

pathDirectory = path.join(__dirname, '../public')
app.use(cors())
app.use(express.static(pathDirectory))
app.use(express.json())

app.post('/users', upload.single('upload'), (req, res) => {
    const user = new User(req.body)
    //user.profilePicture = req.file.buffer.toString('base64')
    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/users', (req, res) => {
    User.find({}).sort({status: 1}).sort({date: 1}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})