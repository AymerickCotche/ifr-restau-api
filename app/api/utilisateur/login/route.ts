import { signJwtAccessToken } from "@/lib/jwt"
import prisma from "@/lib/prisma"
import * as bcrypt from 'bcrypt'

interface RequestBody {
  email: string
  motdepasse: string
}

export async function POST(request:Request){
  try {
    const body:RequestBody = await request.json();

    const user = await prisma.utilisateur.findFirst({
      where:{
        email:body.email
      }
    })
    
    if(user && (await bcrypt.compare(body.motdepasse, user.motdepasse))){
      const {motdepasse, ... userWithoutPass} = user
      const accessToken = signJwtAccessToken(userWithoutPass)
      const result = {
        ...userWithoutPass,
        accessToken
      }
      return new Response(JSON.stringify(result))
    } else {
      throw new Error('email ou mot de passe incorrect')
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {status: 400})
  }
  
}