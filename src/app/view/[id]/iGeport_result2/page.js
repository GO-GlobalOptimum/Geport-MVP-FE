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
                        <h2 style={{color:'white', fontSize: '24px'}}>감정곡선을 보여드려요</h2>
                    </div>
                </div>
                <div style={{marginTop:'50px'}}>
                    <div style={{ position: 'relative' }}>
                        <Image src={"/image/gc_sky.jpg"} width={400} height={100} alt={"logo"}/>
                        <div style={{ position: 'absolute', top: '100%', left: 0, wordWrap: 'break-word', color: 'white', marginTop: '10px' }}>
                            {username} 님은 여행 일자에 따라 행복, 만족감, 기쁨의 지수가 점차 증가합니다.
                            반면 우울감 지수는 낮아지며, 이는 여행이 긍정적인 경험 이었음을 시사합니다.
                        </div>
                    </div>
                </div>
                <div style={ {display : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '200px'}}>
                    <Link href={`/view/${id}/iGeport_result3`} as={`/view/${id}/iGeport_result3`}>
                        <button style={{color: '#0c0c0c', backgroundColor: '#1AE57C', padding: '10px 30px', borderRadius: '15px', width: '400px', fontWeight: 'bold', marginBottom:'30px'}}>다음으로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}