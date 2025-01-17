import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    try {
    const data = await req.json();

    const userDetails = await prisma.userDetails.findFirst({
        where:{
            userEmail: data.userEmail,
        }
    })

    if(!userDetails){
        console.error("Please sign in before continuing!");
    }

    return NextResponse.json({userID: userDetails?.RedirectId});

    } catch (error) {
        console.error("Error" , error);
        return NextResponse.json({message: "Something went Wrong!"});
    }
}