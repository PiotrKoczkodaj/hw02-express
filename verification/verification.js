import { User } from "../registeration/userSchema.js";

export const verification = async (req,res,next) => {
    
    const tokenFromRequest = req.params.verificationToken;
    console.log(tokenFromRequest)

    const userWithToken = await User.find({verificationToken: tokenFromRequest})
    
    if (userWithToken.length === 0) {
       res.status(404).send('User not found')
    }

     await User.updateOne({verificationToken:tokenFromRequest},{verificationToken:null,verify:true})

    return res.status(200).send('Verification Succesfull')
}