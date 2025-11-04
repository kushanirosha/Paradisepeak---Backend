import jwt from "jsonwebtoken";

const generateToken = (userId,userRole,res)=>{
    const accessToken = jwt.sign({userId,userRole},process.env.JWT_SECRET,{
        expiresIn :"15d"
    });
    const refreshToken = jwt.sign(
        {userId,userRole},
        process.env.REFRESH_TOKEN_PRIVATE_KEY,
        { expiresIn: "30d" }
    );
    res.cookie("refreshToken",refreshToken,{

        maxAge:15*24*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !=="development" 

    })
    .header('Authorization', accessToken)
    // console.log(refreshToken)
    return accessToken;
}


export default generateToken;