const jwt = require('jsonwebtoken')
const Artist = require('../models/ArtistsModel')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewtoken')
        const author = await Artist.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!author) {
            throw new Error()
        }

        req.token = token
        req.author = author

        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.', })
    }
}

module.exports = auth