"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function HiddenCodePage() {
    const router = useRouter();
    const [hiddenCode, setHiddenCode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기에 히든코드 검증 및 처리 로직을 추가할 수 있습니다.
        // 예를 들어, 서버에 히든코드를 전송하고 유효한 코드인지 확인하는 등의 로직을 수행할 수 있습니다.
        // 이 예시에서는 히든코드가 유효하다고 가정하고 "/" 경로로 이동합니다.

        // 입력값이 '1'이면 해당 값을 id로 설정하여 view/[id] 페이지로 이동
        if (hiddenCode.trim() === '1') {
            //router.push(`/view/${hiddenCode}/iGeport_result0`);
            router.push(`/view/${hiddenCode}/iGeport_result0`);
        }
        else if(hiddenCode.trim() === '2') {
            router.push(`/view/${hiddenCode}/Geport_result0`);
        }
        else {
            // 다른 경우에는 기본 경로인 '/'로 이동
            router.push('/');
        }
    };

    const isButtonDisabled = hiddenCode.trim() === ''; // 입력값이 비어있으면 버튼 비활성화

    return (
        <div style={{backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{marginBottom: '40px'}}>
                <div style={{marginTop:'100px'}}>
                    <h2 style={{color:'white', fontSize: '24px'}}>히든코드를 입력해주세요</h2>
                </div>
                <br/>
                <div>
                    <span style={{color: "#A8A8A8"}}>모든 문항에 응답하셨다면 Geport를 열람할 수 있는</span>
                    <br />
                    <span style={{color: "#A8A8A8"}}>히든코드를 메시지로 보내드립니다.</span>
                </div>
            </div>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <input
                    type="text"
                    value={hiddenCode}
                    onChange={(e) => setHiddenCode(e.target.value)}
                    style={{background: '#363636', color : '#C6C6C6', padding: '10px', borderRadius: '5px', border: '1px solid #A8A8A8', marginBottom: '20px', width: '400px'}}
                    placeholder="히든코드를 입력해주세요."
                />

                <div style={{marginTop:'250px'}}>
                    <button
                        type="submit"
                        style={{
                            color: isButtonDisabled ? '#8D8D8D':'#0C0C0C',
                            backgroundColor: isButtonDisabled ? '#525252' : '#1AE57C', // 버튼 비활성화 상태일 때와 활성화 상태일 때의 배경색 변경
                            padding: '10px 30px',
                            borderRadius: '15px',
                            border: 'none',
                            fontWeight: 'bold',
                            width: '400px',
                            cursor: isButtonDisabled ? 'not-allowed' : 'pointer', // 버튼 비활성화 상태일 때와 활성화 상태일 때의 커서 변경
                            marginTop: 'auto' // 버튼을 하단으로 이동
                        }}
                        disabled={isButtonDisabled} // 버튼 활성화/비활성화
                    >
                        히든코드로 Geport 조회하기
                    </button>
                </div>
            </form>
        </div>
    );
}