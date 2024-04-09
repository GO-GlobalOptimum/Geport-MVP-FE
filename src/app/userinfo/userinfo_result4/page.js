"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter의 import 경로 수정
import Image from "next/image";
import Link from "next/link";

export default function userinfo_result4() {
    const router = useRouter();
    const [hiddenCode, setHiddenCode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // 서버로 hiddenCode를 전송
        // 서버로 전송하는 부분을 주석 처리합니다.
        // try {
        //     const response = await fetch('/api/submitHiddenCode', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ hiddenCode }), // hiddenCode를 JSON 형식으로 전송
        //     });

        //     if (response.ok) {
        //         // 서버에서 응답을 받으면 result2 페이지로 이동
        //         router.push(`/view/${hiddenCode}/iGeport_result2`);
        //     } else {
        //         console.error('서버 응답 실패');
        //     }
        // } catch (error) {
        //     console.error('서버 통신 에러', error);
        // }

        // 이름이 입력되면 결과 페이지로 이동합니다.
        if (hiddenCode.trim() !== '') {
            router.push(`/userinfo/userinfo_result5`);
        } else {
            console.error('MBTI를 입력하세요.');
        }
    };

    const isButtonDisabled = hiddenCode.trim() === '' || /^\s*$/.test(hiddenCode);

    return (
        <div style={{backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{marginBottom: '40px'}}>
                <div style={{marginTop:'100px'}}>
                    <h2 style={{color:'white', fontSize: '24px'}}>당신의 나이를 알려주세요</h2>
                </div>
                <br/>
                <div>
                    <span style={{color: "#A8A8A8"}}>Geport를 작성하는 데 참고할 정보입니다.</span>
                    <br/>
                    <span style={{color: "#A8A8A8"}}>만 나이로 알려주세요.</span>
                </div>
            </div>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <input
                    type="text"
                    value={hiddenCode}
                    onChange={(e) => setHiddenCode(e.target.value)}
                    style={{background: '#363636', color : '#C6C6C6', padding: '10px', borderRadius: '5px', border: '1px solid #A8A8A8', marginBottom: '20px', width: '400px'}}
                    placeholder="나이를 알려주세요."
                />

                <div style={{marginTop:'250px'}}>
                    <button
                        type="submit"
                        style={{
                            color: isButtonDisabled ? '#8D8D8D':'#0C0C0C',
                            backgroundColor: isButtonDisabled ? '#525252' : '#1AE57C',
                            padding: '10px 30px',
                            borderRadius: '15px',
                            border: 'none',
                            fontWeight: 'bold',
                            width: '400px',
                            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                            marginTop: 'auto'
                        }}
                        disabled={isButtonDisabled}
                    >
                        다음으로
                    </button>
                </div>
            </form>
        </div>
    );
}