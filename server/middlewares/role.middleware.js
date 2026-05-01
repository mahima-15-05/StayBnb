const authorize = (role)=>{

    const roleMiddleware = async(req,res,next)=>{
        if(req.user.role !== role){
            return res.status(403).json({message:"Forbidden"});
            
        }
        next();
    }
    return roleMiddleware;

}
module.exports = authorize;