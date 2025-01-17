import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

    try {
        
        const data = req.nextUrl.searchParams.get('id');

        const getUserId = await prisma.userDetails.findUnique({
            where:{RedirectId: data ?? ""}
        })

        if(!getUserId){
            console.error("Unauthenticated please login");
            return;
        }
        
        return NextResponse.json(getUserId.isReceivingMessages);        

    } catch (error) {
        console.error("Error in GET method" , error);
        return NextResponse.json({errorMessage: "Something went wrong" , error});
    }

}