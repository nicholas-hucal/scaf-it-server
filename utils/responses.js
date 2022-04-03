exports.server = (res) => {
    return res.status(500).json({message: "error with request"})
}

exports.badRequest = (res) => {
    return res.status(400).json({message: "improperly formatted request"})
}

exports.notAuthorized = (res) => {
    return res.status(401).json({message: "not authorized"})
}