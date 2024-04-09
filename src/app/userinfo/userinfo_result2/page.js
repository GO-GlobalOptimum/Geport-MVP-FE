"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter의 import 경로 수정
import Image from "next/image";
import Link from "next/link";

export default function userinfo_result2() {
    const router = useRouter();
    const [nameCode, setNameCode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // 값이 입력되지 않아도 다음 페이지로 이동합니다.
        router.push(`/userinfo/userinfo_result3`);
    };

    return (
        <div style={{backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{marginBottom: '40px'}}>
                <div style={{marginTop:'100px'}}>
                    <h2 style={{color:'white', fontSize: '24px'}}>당신의 소개글을</h2>
                    <br/>
                    <h2 style={{color:'white', fontSize: '24px'}}>한 문장으로 알려주세요</h2>
                </div>
                <br/>
                <div>
                    <span style={{color: "#A8A8A8"}}>Geport 첫 페이지에 들어갈 이름입니다.</span>
                    <br />
                    <span style={{color: "#A8A8A8"}}>작성하지 않으셔도 됩니다.</span>
                </div>
            </div>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <input
                    type="text"
                    value={nameCode}
                    onChange={(e) => setNameCode(e.target.value)}
                    style={{background: '#363636', color : '#C6C6C6', padding: '10px', borderRadius: '5px', border: '1px solid #A8A8A8', marginBottom: '20px', width: '400px'}}
                    placeholder="소개글을 입력해주세요."
                />

                <div style={{marginTop:'250px'}}>
                    <button
                        type="submit"
                        style={{
                            color: '#0C0C0C',
                            backgroundColor: '#1AE57C',
                            padding: '10px 30px',
                            borderRadius: '15px',
                            border: 'none',
                            fontWeight: 'bold',
                            width: '400px',
                            cursor: 'pointer',
                            marginTop: 'auto'
                        }}
                    >
                        다음으로
                    </button>
                </div>
            </form>
        </div>
    );
}