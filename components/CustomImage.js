import Image from 'next/image'

export default function CustomImage({src}){
    return(
        <Image src={src} width={1920} height={1080} className="opacity-100 grayscale" />
    )
}