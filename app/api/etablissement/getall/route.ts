import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

export const revalidate = 0

export async function GET(){
  try {

    const etablissements = await prisma.etablissement.findMany()
  
    if(etablissements){
      return NextResponse.json({etablissements}, {status: 200})
    } else {
      throw new Error('etablissement not found')
    }

  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}