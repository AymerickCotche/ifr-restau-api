import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"


export async function GET(){
  try {

    const utilisateurs = await prisma.utilisateur.findMany()
  
    if(utilisateurs){
      return NextResponse.json({utilisateurs}, {status: 200})
    } else {
      return NextResponse.json({"apimessage": "Utilsiateurs not found"})
    }

  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}