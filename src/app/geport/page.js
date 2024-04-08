"use client"
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Geport(){
    const router = useRouter();
    const [paging, setPaging] = useState(1);

    return(
        <div style={{
            backgroundColor: "#181818",
            height: '100vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            weight: "100%"
        }}>
            <div style={{width: "100%", height: "10%", marginTop:"5%"}}>
                <div style={{width: "15%", height: "100%", marginLeft: "3%"}}>
                    <button style={{fontSize: "1.8em"}} onClick={() => {
                        router.refresh();
                        router.push('/geport/link');
                    }}> ◀︎
                    </button>
                </div>
            </div>
            {<FirstInformation/>}

            <div style={{
                width: "96%",
                height: "7%",
                backgroundColor: "#1AE57C",
                borderRadius: "10px",
                margin: "2%",
                marginBottom: "6%",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
                 onClick={() => {
                     setPaging(prev => prev + 1)
                 }}>
                다음으로
            </div>
        </div>
    )
}

export function FirstInformation() {
    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.6em", marginBottom: "5%", marginLeft: "5%"}}>
                다음 질문에 가능한 상쇄하게 <br/>
                답변해주세요
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                color: "#C6C6C6",
                marginLeft: "5%"
            }}>
                다음 질문의 답변과 첨부해주신 블로그의 내용을 바탕으로 <br/>
                Geport를 작성합니다.
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                marginLeft: "5%"
            }}>
                답변은 반드시 블로그에 작성된 내용과 일치할 필요는 없습니다. <br/>
                자유롭게 작성해주세요.
            </div>
        </div>
    )
}