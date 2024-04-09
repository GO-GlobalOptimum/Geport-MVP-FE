"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function Userinfo_result0() {
    const router = useRouter();
    const params = useParams();
    return (
        <div style={{backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                <div style={{marginTop:'50px'}}>
                    <div>
                        <h2 style={{color:'white', fontSize: '24px'}}>마지막 단계입니다.</h2>
                        <h2 style={{color:'white', fontSize: '24px'}}>당신의 기본 정보를 알려주세요.</h2>
                    </div>
                </div>
                <div style={{marginTop:'50px'}}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '100%', left: 0, wordWrap: 'break-word', color: 'white', marginTop: '10px' }}>
                            이름, 성격, 나이, 성별, 전화번호 등<br/>Geport에 들어갈 5가지 기본 정보를 입력해주세요.<br/><br/>
                            모두 작성하신 후 Geport가 완성되면 Geport를 열람할 수 있는 히든 코드를 기재해 주신 전화번호로 전달드립니다.
                        </div>
                    </div>
                </div>
                <div style={ {display : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '300px'}}>
                    <Link href={`/userinfo/userinfo_result1`} as={`/userinfo/userinfo_result1`}>
                        <button style={{color: '#0c0c0c', backgroundColor: '#1AE57C', padding: '10px 30px', borderRadius: '15px', width: '400px', fontWeight: 'bold', marginBottom:'30px'}}>다음으로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}