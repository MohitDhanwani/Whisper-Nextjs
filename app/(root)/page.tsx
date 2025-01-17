'use client'
import { MessageCircle, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[rgb(10,10,15)] min-h-screen"> 

      <div className="flex justify-center items-center flex-col w-full h-screen font-spaceGrotesk">
      <h1 className="xl:text-8xl text-5xl text-gradient font-bold sm:text-6xl md:text-7xl text-center">Welcome to Whisper</h1>
      <h2 className="text-white text-lg sm:text-xl md:text-2xl  mt-6 text-center">Share your thoughts freely. Stay anonymous. Make connections.</h2>
      <button className="text-white bg-gradient-to-r from-[#6E3CBC] to-[#00F5FF] p-2 px-6 rounded-xl mt-6 text-lg sm:text-xl md:text-2xl">Get Started</button>
      </div>

      <div className='text-white flex flex-wrap justify-center gap-10 -mt-10 items-center ml-5 mr-5'>

        <div className='h-auto w-full sm:w-5/12 md:w-3/12 glass-morphism p-5 rounded-xl hover:scale-105 transition-transform duration-300'>
          <MessageCircle size={50}/>
          <h1 className='font-jetbrains text-xl mt-5'>Anonymous Messaging</h1>
          <p className='mt-5 font-spaceGrotesk'>Express yourself freely without revealing your identity</p>
        </div>

        <div className='h-auto glass-morphism w-full sm:w-5/12 md:w-3/12 p-5 rounded-xl hover:scale-105 transition-transform duration-300'>
          <Zap size={50}/>
        <h1 className='font-jetbrains text-xl mt-5'>Instant Delivery</h1>
        <p className='mt-5 font-spaceGrotesk'>Messages are delivered in real-time with live notifications</p>
        </div>

        <div className='h-auto glass-morphism w-full sm:w-5/12 md:w-3/12 p-5 rounded-xl hover:scale-105 transition-transform duration-300'>
          <Shield size={50}/>
        <h1 className='font-jetbrains text-xl mt-5'>Secure by Design</h1>
        <p className='mt-5 font-spaceGrotesk'>Your privacy is our top priority with end-to-end encryption</p>
        </div>
      </div>


      <div className='text-white mt-40 pb-20 ml-5 mr-5'>
        <h1 className='text-center text-gradient text-4xl font-jetbrains font-bold sm:text-3xl md:text-4xl '>See What Others Are Sharing</h1>

        <div className='mt-16 flex flex-wrap justify-center gap-10'>

          <div className='glass-morphism glow w-full sm:w-4/12 md:w-5/12 lg:w-5/12 xl:w-5/12 p-6 rounded-xl animate-moveUp'>
            <h1 className='font-jetbrains'>Anonymous #1</h1>
            <p className='mt-5 font-spaceGrotesk'>Just launched my first startup! Nervous but excited about the journey ahead... 🚀</p>
          </div>

          <div className='glass-morphism glow  w-full sm:w-4/12 md:w-5/12 lg:w-5/12 xl:w-5/12 p-6 rounded-xl animate-moveUp'>
            <h1 className='font-jetbrains'>Anonymous #2</h1>
            <p className='font-spaceGrotesk mt-5'>Sometimes the quietest voices have the most powerful messages to share.</p>
          </div>

          <div className='glass-morphism glow  w-full sm:w-4/12 md:w-5/12 lg:w-5/12 xl:w-5/12 p-6 rounded-xl animate-moveUp'>
            <h1 className='font-jetbrains'>Anonymous #3</h1>
            <p className='font-spaceGrotesk mt-5'>Found an amazing coffee shop today that nobody seems to know about! Its like a hidden gem in the city.</p>
          </div>

          <div className='glass-morphism glow  w-full sm:w-4/12 md:w-5/12 lg:w-5/12 xl:w-5/12 p-6 rounded-xl animate-moveUp'>
            <h1 className='font-jetbrains'>Anonymous #4</h1>
            <p className='font-spaceGrotesk mt-5'>Working on a secret project that could change everything. Cant wait to reveal it soon!</p>
          </div>

        </div>
      </div>

    </div>
  );
}
