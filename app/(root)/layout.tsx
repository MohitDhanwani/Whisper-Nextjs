import ParticleBackground from "@/components/ParticleBackground"

export default function Layout ({children} : Readonly<{children: React.ReactNode}>){
    return (
        <>
        <ParticleBackground/>
        {children}
        </>
    )
}