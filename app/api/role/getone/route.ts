import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"


export async function GET(request:NextRequest){
  try {

    const searchParams = request.nextUrl.searchParams
    const roleId = searchParams.get('rolesId')

    if (roleId) {
      const role = await prisma.utilisateurRole.findFirst({
        where:{
          id: roleId
        }
      })
    
      if(role){
        return NextResponse.json({role}, {status: 200})
      } else {
        return NextResponse.json({"apimessage": "Role not found"})
      }

    } else {
      throw new Error('roleId not found at url params')
    }
  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}