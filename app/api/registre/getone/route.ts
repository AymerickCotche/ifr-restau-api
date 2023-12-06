import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

export const revalidate = 0

export async function GET(request:NextRequest){
  try {

    const searchParams = request.nextUrl.searchParams
    const registreId = searchParams.get('rolesId')

    if (registreId) {
      const registre = await prisma.registre.findFirst({
        where:{
          id: registreId
        }
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