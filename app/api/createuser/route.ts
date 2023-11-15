import prisma from "@/lib/prisma"
import * as bcrypt from 'bcrypt'

interface RequestBody {
  email: string
  motdepasse: string
  nom: string
  roleId: string
  etablissementId: string
}

export async function POST(request:Request) {
  const body: RequestBody = await request.json()

  if (body.etablissementId) {

    const user = await prisma.utilisateur.create({
      data: {
        email: body.email,
        motdepasse: await bcrypt.hash(body.motdepasse, 10),
        nom: body.nom,
        roleId: body.roleId,
        etablissementId: body.etablissementId
      }
    })
    const { motdepasse, ...result} = user
    return new Response(JSON.stringify(result))
  } else {
    
    const user = await prisma.utilisateur.create({
      data: {
        email: body.email,
        motdepasse: await bcrypt.hash(body.motdepasse, 10),
        nom: body.nom,
        roleId: body.roleId
      }
    })
    const { motdepasse, ...result} = user
    return new Response(JSON.stringify(result))
  }

}