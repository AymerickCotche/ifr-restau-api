import prisma from "@/lib/prisma"

interface RequestBody {
  utilisateurId: string
  etablissementId: string
}

export async function POST(request:Request) {
  const body: RequestBody = await request.json()

  const {utilisateurId, etablissementId} = body

    const user = await prisma.utilisateur.update({
      where: {
        id: utilisateurId
      },
      data: {
        etablissementId: etablissementId
      }
    })
    return new Response(JSON.stringify(user))

}