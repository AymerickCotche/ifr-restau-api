import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

export const revalidate = 0

export async function GET(){
  try {

    const registres = await prisma.registre.findMany()
  
    if(registres){
      return NextResponse.json({registres}, {status: 200})
    } else {
      return NextResponse.json({"apimessage": "Registres not found"})
    }

  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}