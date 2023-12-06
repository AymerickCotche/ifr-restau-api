import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

export const revalidate = 0

export async function GET(request:NextRequest){
  try {

    const searchParams = request.nextUrl.searchParams
    const utilisateurId = searchParams.get('utilisateurId')

    if (utilisateurId) {
      const utilisateur = await prisma.utilisateur.findFirst({
        where:{
          id: utilisateurId
        }
      })
    
      if(utilisateur){
        return NextResponse.json({utilisateur}, {status: 200})
      } else {
        return NextResponse.json({"apimessage": "utilisateurId not found"})
      }

    } else {
      throw new Error('utilisateurId not found at url params')
    }
  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}