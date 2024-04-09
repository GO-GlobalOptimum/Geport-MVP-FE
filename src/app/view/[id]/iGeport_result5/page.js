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
                        <h2 style={{color:'white', fontSize: '24px'}}>이 기간 동안 {username} 님을</h2>
                        <h2 style={{color:'white', fontSize: '24px'}}>행복하게 만든 것을 모아봤어요.</h2>
                    </div>
                </div>
                <div style={{marginTop:'50px'}}>
                    <div style={{ position: 'relative' }}>
                        <Image src={"/image/울어라 지옥참마도...!.png"} width={400} height={100} alt={"logo"}/>

                    </div>
                </div>
                <div style={ {display : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '180px'}}>
                    <Link href={`/view/${id}/iGeport_result6`} as={`/view/${id}/iGeport_result6`}>
                        <button style={{color: '#0c0c0c', backgroundColor: '#1AE57C', padding: '10px 30px', borderRadius: '15px', width: '400px', fontWeight: 'bold', marginBottom:'30px'}}>다음으로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}