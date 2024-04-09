"use client"
import Image from "next/image";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/onboarding'); // 이동하고자 하는 경로
        }, 500); // 0.5초 후에 실행

        return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 제거
    }, [router]);

  return (
    <div style={{backgroundColor: "#1AE57C", height: '100vh'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column'}}>
            <Image src={"/image/logo.svg"} width={120} height={120} alt={"logo"}/>
            <Image src={"/image/geport_font.svg"} width={100} height={16.8} alt={"geport"}/>
        </div>
    </div>
  );
}
