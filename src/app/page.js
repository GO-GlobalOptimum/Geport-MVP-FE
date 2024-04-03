import Image from "next/image";

export default function Home() {
  return (
    <div style={{backgroundColor: "#1AE57C", height: '100vh'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column'}}>
            <Image src={"image/logo.svg"} width={120} height={120}/>
            <Image src={"image/geport_font.svg"} width={100} height={16.8}/>
        </div>
    </div>
  );
}
