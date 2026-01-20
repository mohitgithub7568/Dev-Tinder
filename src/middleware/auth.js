const isAuth=(req,res,next)=>{
    const token="xyz";
    const isAuth= token==="xyz";
    if(!isAuth){
        res.status(401).send("sorry you are unauthorised");
    }
    else next();
}
const UserAuth=(req,res,next)=>{
    const token="xyz";
    const isAuth= token==="xyz";
    if(!isAuth){
        res.status(401).send("sorry you are unauthorised");
    }
    else next();
}

module.exports={isAuth,UserAuth};