const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body)
        if (result.error) {
            const errormessage = result.error.details[0].message
            return res.json({
                message: errormessage
            })
        }
        next()
    }
}

module.exports=validate