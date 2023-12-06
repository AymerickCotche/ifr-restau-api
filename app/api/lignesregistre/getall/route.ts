import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

export const revalidate = 0

export async function GET(){
  try {

    const lignesRegistres = await prisma.lignesRegistre.findMany()
  
    if(lignesRegistres){
      return NextResponse.json({lignesRegistres}, {status: 200})
    } else {
      return NextResponse.json({"apimessage": "LignesRegistres not found"})
    }

  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}