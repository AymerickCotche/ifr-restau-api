import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

interface LignesRegistre {
  repas: string
  quantite: string
  temperature: string
  registreId: string
}

interface RequestBody {
  utilisateurId: string
  nom: string
  etablissementId: string
  lignesResgistres: LignesRegistre[]
}

export async function POST(request:NextRequest){
  try {

    const body: RequestBody = await request.json()
    const {nom, utilisateurId, etablissementId, lignesResgistres} = body

    if (nom && utilisateurId && etablissementId && lignesResgistres) {
      const registre = await prisma.registre.create({
        data:{
          nom: nom,
          utilisateurId: utilisateurId,
          etablissementId: etablissementId,
        }
      })

      const lignesAvecRegistre = lignesResgistres.map(lignesResgistre => ({...lignesResgistre, registreId: registre.id}))
      
      await prisma.lignesRegistre.createMany({
        data: lignesAvecRegistre
      })

      if(registre){
        return NextResponse.json({registre}, {status: 200})
      } else {
        return NextResponse.json({"apimessage": "Registre not found"})
      }

    } else {
      throw new Error('registreId not found at url params')
    }
  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}