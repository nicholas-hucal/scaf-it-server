exports.server = (res) => {
    return res.status(500).json({message: "error with request"})
}

exports.badRequest = (res) => {
    return res.status(400).json({message: "improperly formatted request"})
}