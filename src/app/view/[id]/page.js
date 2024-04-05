"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import {white} from "next/dist/lib/picocolors";

export default function UserviewPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const username = "Can";
    const intro_sentence = "잠은 죽어서 자..!";
    // 페이지의 디자인 상태를 관리하는 상태 변수
    const [showAlternateDesign, setShowAlternateDesign] = useState(false);

    useEffect(() => {
        // 3초 후에 다른 디자인을 보여주도록 타이머 설정
        const timer = setTimeout(() => {
            setShowAlternateDesign(true);
        }, 3000);
        // 컴포넌트가 언마운트되면 타이머를 정리하여 메모리 누수를 방지합니다.
        return () => clearTimeout(timer);
    }, []); // useEffect는 컴포넌트가 렌더링될 때 한 번만 실행됩니다.

    return (
        <div style={{ backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* 조건부 렌더링을 사용하여 디자인을 변경 */}
            {showAlternateDesign ? (
                <div>
                <div style={{
                    backgroundColor: "#1AE57C",
                    height: '50vh',
                    width:'55vh',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}>
                    <div>
                    <h2 style={{color:'black', fontSize: '24px'}}>{intro_sentence}</h2>
                    <h2 style={{color:'black', fontSize: '24px'}}>{username}님의 iGeport</h2>
                        <span style={{color: "gray"}}>{username}님의 블로그와 답변을 바탕으로</span>
                        <br />
                        <span style={{color: "gray"}}>퍼스널브랜딩에 필요한 심리 보고서를 준비했어요.</span>
                    </div>
                </div>
                    <div style={ {display : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Link href="/">
                            <button style={{color: '#0c0c0c', backgroundColor: '#1AE57C', padding: '10px 30px', borderRadius: '15px', width: '400px', fontWeight: 'bold', marginTop: '150px'}}>다음으로</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div style={{ backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ marginTop: '30px' }}>
                        <Image src={"/image/logo.svg"} width={120} height={120} alt="Logo" />
                    </div>
                    <h2 style={{ color: 'white', fontSize: '24px', padding: '40px' }}>iGeport 결과 보고서</h2>
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <span style={{ color: "#A8A8A8" }}>iGeport는 총 여섯 단계로</span>
                        <br />
                        <span style={{ color: "#A8A8A8" }}>블로그에 드러난 당신의 심리를 분석합니다.</span>
                    </div>
                </div>
            )}
        </div>
    );
    }
    //