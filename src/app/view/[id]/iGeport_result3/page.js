"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
export default function iGeport_result1() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const username = "Can";
    return (
        <div style={{backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                <div style={{marginTop:'50px'}}>
                    <div>
                        <h2 style={{color:'white', fontSize: '24px'}}>이 기간 동안 {username} 님의</h2>
                        <h2 style={{color:'white', fontSize: '24px'}}>감정 SOS를 알려드려요</h2>
                    </div>
                </div>
                <div style={{marginTop:'50px'}}>
                    <div style={{ position: 'relative' }}>
                        <Image src={"/image/거북이랑 수영을.png"} width={400} height={100} alt={"logo"}/>
                        <div style={{ position: 'absolute', top: '100%', left: 0, wordWrap: 'break-word', color: 'white', marginTop: '10px' }}>
                            이 그래프는 {username} 님의 부정적 감정 상태를 나타냅니다.
                            스트레스, 불안, 슬픔, 피로와 같은 감정들이 정상 범위 기준선인 200점 아래이며, 이는 여행이 {username} 님께 긍정적인 영향을 미쳤음을 시사합니다.
                        </div>
                    </div>
                </div>
                <div style={ {display : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '200px'}}>
                    <Link href={`/view/${id}/iGeport_result4`} as={`/view/${id}/iGeport_result4`}>
                        <button style={{color: '#0c0c0c', backgroundColor: '#1AE57C', padding: '10px 30px', borderRadius: '15px', width: '400px', fontWeight: 'bold', marginBottom:'30px'}}>다음으로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}