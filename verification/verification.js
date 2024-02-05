import { User } from "../registeration/userSchema.js";

export const verification = async (req,res) => {
    
    const tokenFromRequest = req.params.verificationToken;
    
    const userWithToken = await User.find({verificationToken: tokenFromRequest})
    
    if (userWithToken.length === 0) {
       return ' ERROR 404 User not found'
    }
    
   else {
    await User.updateOne({verificationToken:tokenFromRequest},{verificationToken:null,verify:true})
    return 'Verification successful' 
    }

 
    
}