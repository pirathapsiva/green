module.exports = (req,res,next)=>{
    if(req.headers.role === 'admin'){
        next()
    } else {
        res.status(403).json({
            message : "You have no access"
        })
    }
}