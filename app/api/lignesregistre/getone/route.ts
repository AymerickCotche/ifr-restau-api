import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"


export async function GET(request:NextRequest){
  try {

    const searchParams = request.nextUrl.searchParams
    const lignesRegistreId = searchParams.get('lignesRegistreId')

    if (lignesRegistreId) {
      const lignesRegistre = await prisma.lignesRegistre.findFirst({
        where:{
          id: lignesRegistreId
        }
      })
    
      if(lignesRegistre){
        return NextResponse.json({lignesRegistre}, {status: 200})
      } else {
        return NextResponse.json({"apimessage": "lignesRegistre not found"})
      }

    } else {
      throw new Error('lignesRegistreId not found at url params')
    }
  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}