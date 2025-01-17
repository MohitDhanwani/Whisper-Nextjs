'use client'
import React, { useEffect, useState } from 'react'
import { X, Copy } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Page() {
    interface messageDetails {
        messageId: string,
        messageBody: string,
        messageSentBy: string,
        messageSentToShow: string,
        userID: number
    }

    const params = useParams();
    const session = useSession();
    const router = useRouter();

    const [checkbox, setCheckBox] = useState<boolean>()
    const [sendMessageButton, setSendMessageButton] = useState<boolean>(false)
    const [recipientId, setRecipientId] = useState<string>("")
    const [recipientMessage, setRecipientMessage] = useState<string>("")
    const [messageDetails, setMessageDetails] = useState<messageDetails[]>([])

    const HandleSendMessageVisibility = () => {

        if(!session.data?.user){
            alert("Please signin to message!");
            router.push("/");
            return;
        }

        setSendMessageButton(true)
    }

    const HandleCloseForm = () => {
        setSendMessageButton(false)
    }

    useEffect(() => {
        const getUserStatus = async () => {
            const response = await fetch(`/api/userStatusEffect?id=${params.messages}`, {
                method: "GET",
            })

            if (!response.ok) {
                console.error("something went wrong in getting status")
                return
            }

            const messageStatus = await response.json()
            setCheckBox(messageStatus)
        }

        getUserStatus();
    }, [params.messages])

    useEffect(() => {
        const allMessages = async () => {
            const allMessageResposne = await fetch(`/api/getAllMessages?id=${params.messages}`, {
                method: "GET",
            })

            if (!allMessageResposne.ok) {
                console.error("Error in getting all messages")
                return
            }

            const messageJsonResponse = await allMessageResposne.json();
            const filres : messageDetails[] = messageJsonResponse.filter((message: messageDetails) => message.messageSentToShow === params.messages)
            setMessageDetails(filres)
        }

        allMessages();
    }, [params.messages]);

    const HandleReceiveMessageCheckBox = async () => {

        if(!session.data?.user){
            alert("Please signin to continue further");
            router.push("/");
            return;
        }

        const newCheckboxState = !checkbox
        setCheckBox(newCheckboxState)

        const getUserMessageStatus = await fetch("/api/getUserMessageReceivingStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ checkbox, params })
        })

        if (!getUserMessageStatus.ok) {
            console.error("something went wrong")
            return
        }
    }

    const HandleSendMessageToUser = async () => {

        if (recipientId === params.messages) {
            alert("You cannot send message to youself!");
            HandleCloseForm();
            return;
        }

        const sendAndReceiveMessageDbCall = await fetch("/api/sendAndReceiveMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ checkbox, recipientId, recipientMessage, params })
        })

        if (!sendAndReceiveMessageDbCall) {
            console.error("Cannot send messages, something went wrong!")
            return
        }

        const messageResponse = await sendAndReceiveMessageDbCall.json()

        if (!messageResponse.ok) {
            alert(messageResponse.message)
            HandleCloseForm()
        }

        alert(messageResponse.Message)
        HandleCloseForm()
    }

    const HandleCopyID = () => {
        if (typeof params.messages === 'string') {
            navigator.clipboard.writeText(params.messages)
                .then(() => alert('Copied to clipboard!'))
                .catch((err) => console.error('Failed to copy text: ', err))
        } else {
            console.error('Failed to copy text: userID is not a string')
        }
    }

    return (
        <div className='bg-[rgb(10,10,15)] min-h-screen px-4 sm:px-6 lg:px-8'>
            <div className='py-8 sm:py-12 flex flex-col sm:flex-row justify-between items-center gap-4'>
                <h1 className='text-gradient font-semibold font-jetbrains text-2xl sm:text-3xl lg:text-4xl w-full sm:w-6/12'>Messages</h1>

                <div className='flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto'>
                    <div className='flex items-center'>
                        <div
                            className={`h-4 w-4 rounded-full z-10 cursor-pointer ${checkbox ? 'bg-green-600' : 'bg-red-600'}`}
                            onClick={HandleReceiveMessageCheckBox}
                        ></div>
                        <span className='text-white font-jetbrains ml-2 text-sm sm:text-base'>
                            {checkbox ? "Receiving Messages" : "Not Receiving Messages"}
                        </span>
                    </div>

                    <button
                        className='font-jetbrains text-white cursor-pointer bg-gradient-to-r from-[#6E3CBC] to-[#00F5FF] 
                        p-2 px-4 rounded-lg w-full sm:w-auto text-sm sm:text-base z-10'
                        onClick={HandleSendMessageVisibility}
                    >
                        Send Messages
                    </button>
                </div>
            </div>

            <div className='flex items-center mb-8'>
                <h1 className='text-white font-jetbrains font-semibold text-sm sm:text-base'>UserID: {params.messages}</h1>
                <Copy className='ml-4 cursor-pointer z-10' color='white' size={18} onClick={HandleCopyID} />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6'>
                {messageDetails.length > 0 ? (
                    messageDetails.map((message, index) => (
                        <div key={index} className='p-4 rounded-lg glass-morphism'>
                            <div className='flex items-center'>
                                <h3 className='font-spaceGrotesk font-semibold text-white text-sm sm:text-base'>{message.messageSentBy}</h3>
                            </div>
                            <p className='mt-4 font-spaceGrotesk text-white text-xs sm:text-sm md:text-base'>{message.messageBody}</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-white font-inter text-sm sm:text-base">No messages found.</div>
                )}
            </div>

            {sendMessageButton && (
                <div className='fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-20 p-4'>
                    <div className='text-white flex flex-col border rounded-xl w-full max-w-2xl p-4 sm:p-6'>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className='font-inter text-purple-400 font-bold text-lg sm:text-xl'>Send New Message</h1>
                            <X className='cursor-pointer' onClick={HandleCloseForm} />
                        </div>

                        <input
                            type="text"
                            placeholder='Recipients User ID'
                            className='text-white mt-2 p-3 rounded-lg glass-morphism focus:ring-2 focus:ring-purple-800
                            focus:border-purple-800 w-full'
                            onChange={(e) => setRecipientId(e.target.value)}
                        />

                        <textarea
                            placeholder='Type your Message...'
                            className='h-52 text-white mt-4 p-3 rounded-lg glass-morphism focus:ring-2 focus:ring-purple-800
                            focus:border-purple-800 w-full resize-none'
                            onChange={(e) => setRecipientMessage(e.target.value)}
                        />

                        <button
                            className='font-jetbrains text-white cursor-pointer bg-gradient-to-r from-[#6E3CBC] to-[#00F5FF] 
                            p-2 px-4 rounded-lg mt-4 w-full sm:w-auto self-end z-10'
                            onClick={HandleSendMessageToUser}
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page