import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"


export async function GET(request:NextRequest){
  try {

    const searchParams = request.nextUrl.searchParams

    const etablissementId = searchParams.get('etablissementId')

    if (etablissementId) {
      const registres = await prisma.registre.findMany({
        where:{
          etablissementId: etablissementId
        },
        include: {
          lignesRegistres: true
        }
      })
    
      if(registres){
        return NextResponse.json({registres}, {status: 200})
      } else {
        return NextResponse.json({"apimessage": "Registres not found"})
      }

    } else {
      throw new Error('etablissementId not found at url params')
    }
  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}