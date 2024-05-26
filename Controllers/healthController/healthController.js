const healthController = (req, res)=>{
    try {
        return res.json({
            success: true,
            message: "Everything looks fine."
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Something is wrong."
        })
    }
}

module.exports = healthController