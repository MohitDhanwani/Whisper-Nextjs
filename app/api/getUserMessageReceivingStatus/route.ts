import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const data = await req.json();
        
        const updateUserMessageStatus = await prisma.userDetails.update({
            where: { RedirectId: data.params.messages },
            data:{
                isReceivingMessages: !data.checkbox
            }
        })

        if(!updateUserMessageStatus){
            console.error({message : "Not Authenticated"});
        }

        return NextResponse.json({message: "Updated user Status" , newStatus : updateUserMessageStatus.isReceivingMessages})
    } catch (error) {
        console.error("Error getting user message receiving status " , error);
        return NextResponse.json({errorMessage: "Error in getting status"});
    }
}
