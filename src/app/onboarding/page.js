"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Fira_Sans} from "next/dist/compiled/@next/font/dist/google";

export default function onboarding(){
    const router = useRouter();
    const [paging, setPaging] = useState(1);
    const [lastPage, setLastPage] = useState(false);
    const [firstPage, setFirstPage] = useState(false);

    useEffect(() => {
        const isLastPage = paging === 3
        setLastPage(isLastPage);
        const isFirstPage = paging === 1
        setFirstPage(isFirstPage);
    }, [paging]);

    const NormalButton = () => {
        return (
            <div style={{
                width: "90%",
                height: "60px",
                backgroundColor: "#1AE57C",
                borderRadius: "10px",
                margin: "5%",
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
        )
    }

    const LastButton = () => {
        return (
            <div style={{
                width: "90%",
                height: "50px",
                margin: "5%",
                marginBottom: "6%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{width: "48%", height: "40px", padding: "5%", color: "#1AE57C",
                    borderRadius: "10px", marginRight : "4%", borderColor: "#1AE57C",
                    borderStyle: "solid", borderWidth: "2px",
                    display: "flex", alignItems: "center", justifyContent: "center"}}
                    onClick={()=>{
                        router.refresh()
                        router.push('/igeport/link')
                    }}>
                    iGeport 만들기
                </div>
                <div style={{width: "48%", height: "40px", padding: "5%", color: "#1AE57C",
                    borderRadius: "10px", borderColor: "#1AE57C",
                    borderStyle: "solid", borderWidth: "2px",
                    display: "flex", alignItems: "center", justifyContent: "center"}}
                     onClick={()=>{
                         router.refresh()
                         router.push('/geport/link')
                     }}>
                    Geport 만들기
                </div>
            </div>
        )
    }
    const pageComponent = (page) => {
        switch (page) {
            case 1:
                return (
                    <First/>
                )
            case 2:
                return (
                    <Second/>
                )
            case 3:
                return (
                    <Third/>
                )
        }
    }
    return (
        <div style={{
            backgroundColor: "#181818",
            height: '100vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            weight: "100%"
        }}>

            {pageComponent(paging)}

            <div style={{display: 'flex', justifyContent: 'center', gap: '8px', margin: '20px 0'}}>
                {Array.from({length: 3}, (_, index) => (
                    <span
                        key={index}
                        style={{
                            height: '10px',
                            width: '10px',
                            backgroundColor: paging === index + 1 ? '#1AE57C' : '#C6C6C6',
                            borderRadius: '50%',
                            display: 'inline-block',
                        }}
                    ></span>
                ))}
            </div>

            {
                lastPage ? <LastButton/> : <NormalButton/>
            }

            {firstPage ? <div style={{marginBottom: "13%"}}/> :
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: "7%"}}>
                    <div onClick={() => {
                        router.refresh()
                        router.push('/')
                    }}>
                        취소하기
                    </div>
                </div>}
        </div>
    )
}

export function First() {
    return (
        <div style={{
            height: '100vh',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1031_6372)">
                    <path
                        d="M58.814 13.149C59.8543 13.606 57.0352 10.4148 53.1133 7.32849C50.827 5.53088 46.9661 3.27495 44.3753 2.30366C36.7567 -0.542862 29.4403 0.186103 24.0324 1.69589C20.2892 2.74149 17.4559 4.16294 16.0774 5.02411C12.3715 7.34521 5.17995 12.4024 1.8001 22.8511C-1.63319 33.468 1.37696 46.7963 7.5604 53.8833C16.8402 64.5208 31.5439 65.9419 42.2174 62.2317C44.8247 61.3233 55.4439 57.4343 60.6315 45.8855C64.4344 37.4245 63.2245 29.526 62.5288 26.3446C62.4665 26.0533 62.2156 25.8489 61.9203 25.8456C58.8689 25.8114 42.6184 25.6292 39.3045 25.592C38.9671 25.5882 38.6736 25.8381 38.6182 26.1797L38.2301 28.6036C37.5147 33.0349 34.2415 39.4111 27.4936 41.2809C20.4259 43.2362 13.2429 39.1664 11.3067 32.488C10.2913 28.9795 10.6342 25.1581 11.5641 22.0793C12.7911 18.0006 15.0232 15.0067 16.3508 13.6715C23.0505 6.90239 31.2226 6.79244 34.1681 6.6567C46.0298 6.09588 56.8828 12.3023 58.8186 13.1538L58.814 13.149Z"
                        fill="#1AE57C"/>
                </g>
                <defs>
                    <clipPath id="clip0_1031_6372">
                        <rect width="62.9297" height="63.7453" fill="white"
                              transform="translate(0.714844) rotate(0.642309)"/>
                    </clipPath>
                </defs>
            </svg>

            <div style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6em",
                marginTop: "5%"
            }}>
                AI 파트너 Geport와 함께
            </div>
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6em"
            }}>
                내 블로그를 브랜드로 만들어보세요
            </div>
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                width: "90%",
                color: "#C6C6C6",
                marginTop: "3%",
                textAlign: "center"
            }}>
                퍼스널 브랜딩이란 ‘나만의 개성과 매력, 재능을 브랜드화하여 스스로의 가치를 높이는 행위’입니다. 이런 차별화를 통해 스스로의 가치를 높이는 게 퍼스널 브랜딩의
                목적입니다.<br/><br/>
                점점 자신의 성장 과정을 기록하는 사람들이 많아지고, 그 활동을 통해 퍼스널 브랜딩을 하려는 수요가 꾸준히 증가하고 있습니다. 하지만, 게시물이 많아지면 한눈에 들어오지 않아 오히려
                브랜딩에 방해가 될 수 있다는 문제가 있습니다.<br/><br/>
                <sapn style={{fontWeight: "bold", fontSize: "1.0rem"}}>“블로그로 시작하는 나만의 퍼스널 브랜딩, Geport”</sapn><br/><br/>
                저희 서비스에서는 이러한 문제를 해결하기 위해 AI로 자신의 블로그 게시물을 바탕으로 생성한 Geport를 제공합니다.
            </div>
        </div>
    )
}

export function Second() {
    return (
        <div style={{
            height: '100vh',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1031_6372)">
                    <path
                        d="M58.814 13.149C59.8543 13.606 57.0352 10.4148 53.1133 7.32849C50.827 5.53088 46.9661 3.27495 44.3753 2.30366C36.7567 -0.542862 29.4403 0.186103 24.0324 1.69589C20.2892 2.74149 17.4559 4.16294 16.0774 5.02411C12.3715 7.34521 5.17995 12.4024 1.8001 22.8511C-1.63319 33.468 1.37696 46.7963 7.5604 53.8833C16.8402 64.5208 31.5439 65.9419 42.2174 62.2317C44.8247 61.3233 55.4439 57.4343 60.6315 45.8855C64.4344 37.4245 63.2245 29.526 62.5288 26.3446C62.4665 26.0533 62.2156 25.8489 61.9203 25.8456C58.8689 25.8114 42.6184 25.6292 39.3045 25.592C38.9671 25.5882 38.6736 25.8381 38.6182 26.1797L38.2301 28.6036C37.5147 33.0349 34.2415 39.4111 27.4936 41.2809C20.4259 43.2362 13.2429 39.1664 11.3067 32.488C10.2913 28.9795 10.6342 25.1581 11.5641 22.0793C12.7911 18.0006 15.0232 15.0067 16.3508 13.6715C23.0505 6.90239 31.2226 6.79244 34.1681 6.6567C46.0298 6.09588 56.8828 12.3023 58.8186 13.1538L58.814 13.149Z"
                        fill="#1AE57C"/>
                </g>
                <defs>
                    <clipPath id="clip0_1031_6372">
                        <rect width="62.9297" height="63.7453" fill="white"
                              transform="translate(0.714844) rotate(0.642309)"/>
                    </clipPath>
                </defs>
            </svg>

            <div style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6em",
                marginTop: "5%"
            }}>
                원할한 서비스 이용을 위해
            </div>
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6em"
            }}>
                이용약관에 동의해주세요
            </div>
            <div style={{
                alignItems: "center",
                width: "90%",
                justifyContent: "center",
                fontSize: "0.9rem",
                color: "#C6C6C6",
                marginTop: "3%"
            }}>
                <br/>Geport를 사용함으로써 귀하는 아래 사용자 동의서에 동의하는 것으로 간주됩니다.<br/><br/>
                1. 책임: Geport의 개발자는 이 시스템의 신뢰성을 보장하지 않으며 사용으로 인해 발생하는 어떠한 손해에 대해서도 책임을 지지 않습니다.<br/><br/>
                2. 콘텐츠: Geportp은 OpenAI chatgpt API를 사용하므로 대화하는 내용은 OpenAI로 보내지고 각각 API사용약관에 따라 이 콘텐츠는 서비스 개선을 위해 사용될 수
                있습니다. 즉 사용자가 Geport 및 OpenAI에 콘텐츠 사용 라이선스를 부여합니다.
            </div>
        </div>
    )
}

export function Third() {
    return (
        <div style={{
            height: '100vh',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1031_6372)">
                    <path
                        d="M58.814 13.149C59.8543 13.606 57.0352 10.4148 53.1133 7.32849C50.827 5.53088 46.9661 3.27495 44.3753 2.30366C36.7567 -0.542862 29.4403 0.186103 24.0324 1.69589C20.2892 2.74149 17.4559 4.16294 16.0774 5.02411C12.3715 7.34521 5.17995 12.4024 1.8001 22.8511C-1.63319 33.468 1.37696 46.7963 7.5604 53.8833C16.8402 64.5208 31.5439 65.9419 42.2174 62.2317C44.8247 61.3233 55.4439 57.4343 60.6315 45.8855C64.4344 37.4245 63.2245 29.526 62.5288 26.3446C62.4665 26.0533 62.2156 25.8489 61.9203 25.8456C58.8689 25.8114 42.6184 25.6292 39.3045 25.592C38.9671 25.5882 38.6736 25.8381 38.6182 26.1797L38.2301 28.6036C37.5147 33.0349 34.2415 39.4111 27.4936 41.2809C20.4259 43.2362 13.2429 39.1664 11.3067 32.488C10.2913 28.9795 10.6342 25.1581 11.5641 22.0793C12.7911 18.0006 15.0232 15.0067 16.3508 13.6715C23.0505 6.90239 31.2226 6.79244 34.1681 6.6567C46.0298 6.09588 56.8828 12.3023 58.8186 13.1538L58.814 13.149Z"
                        fill="#1AE57C"/>
                </g>
                <defs>
                    <clipPath id="clip0_1031_6372">
                        <rect width="62.9297" height="63.7453" fill="white"
                              transform="translate(0.714844) rotate(0.642309)"/>
                    </clipPath>
                </defs>
            </svg>

            <div style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6em",
                marginTop: "5%"
            }}>
                원하시는 AI 보고서를
            </div>
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6em"
            }}>
                선택해주세요
            </div>
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1em",
                color: "#C6C6C6",
                marginTop: "4%",
                width: "90%",
                textAlign: "center"

            }}>
                Geport는 퍼스널 브랜딩을 도와주는 보고서입니다. 사용자의 입장에서 대신 퍼스널 브랜딩을 구축합니다.<br/>
            </div>
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1em",
                color: "#C6C6C6",
                marginTop: "4%",
                width: "90%",
                textAlign: "center"
            }}>
                iGeport는 사용자의 심리 상태를 분석한 보고서입니다. 사용자 스스로가 누구인지 알아보는데 도움을 줍니다.
            </div>
        </div>
    )
}
