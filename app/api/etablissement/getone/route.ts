import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"


export async function GET(request:NextRequest){
  try {

    const searchParams = request.nextUrl.searchParams
    const etablissementId = searchParams.get('etablissementId')

    if (etablissementId) {
      const etablissement = await prisma.etablissement.findFirst({
        where:{
          id: etablissementId
        }
      })
    
      if(etablissement){
        return NextResponse.json({etablissement}, {status: 200})
      } else {
        return NextResponse.json({"apimessage": "Etablissement not found"})
      }

    } else {
      throw new Error('etablissementId not found at url params')
    }
  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}