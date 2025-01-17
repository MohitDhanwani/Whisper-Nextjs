import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        
        const messagesData = await req.json();
        
        if(!messagesData){
            return NextResponse.json({message: "No message data , user unauthenticated"});
        }

        if(!messagesData.checkbox){
            return NextResponse.json({message: "Sorry the user is not accepting message currently , try again later" , status: false});
        }

        const getUserId = await prisma.userDetails.findUnique({
            where:{RedirectId: messagesData.params.messages}
        })

        const saveMessageToDb = await prisma.messages.create({
            data:{
                messageBody: messagesData.recipientMessage,
                messageSentToShow: messagesData.recipientId,
                messageSentBy: messagesData.params.messages,
                userID: getUserId?.id,
            }
        })

        if(!saveMessageToDb) {
            console.error("some error")
        }

        return NextResponse.json({saveMessageToDb , Message: "Message Sent Successfully!"});

    } catch (error) {
        console.error("Error in sending messages " , error);
        return NextResponse.json({message: "Something went wrong in sending messages" , error: error});
    }
}