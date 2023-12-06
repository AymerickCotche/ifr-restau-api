import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

export const revalidate = 0

export async function GET(){
  try {

    const roles = await prisma.utilisateurRole.findMany()
  
    if(roles){
      return NextResponse.json({roles}, {status: 200})
    } else {
      return NextResponse.json({"apimessage": "Roles not found"})
    }


  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}