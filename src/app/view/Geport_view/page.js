"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Fira_Sans} from "next/dist/compiled/@next/font/dist/google";
import Image from "next/image";

export default function Geport_view(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [paging, setPaging] = useState(0);
    const [isInfo, setIsInfo] = useState(true);
    const [answer, setAnswer] = useState([
        {id : 1, content: ""}, {id : 2, content: ""}, {id : 3, content: ""}, {id : 4, content: ""}, {id : 5, content: ""}
    ]);

    useEffect(() => {
        // Simulate loading for 3 seconds
        // const timer = setTimeout(() => {
        //     setLoading(false); // After 3 seconds, hide the loading screen
        // }, 2000);
        //
        // return () => clearTimeout(timer); // Cleanup function to clear the timer

        // const data = {
        //     "name": localStorage.getItem("name") || "",
        //     "bio": localStorage.getItem("bio") || "",
        //     "phone": localStorage.getItem("phone") || "",
        //     "mbti": localStorage.getItem("mbti") || "",
        //     "age": parseInt((localStorage.getItem("age"))) || 0,
        //     "gender": localStorage.getItem("gender"),
        //     "blog_links": JSON.parse(localStorage.getItem("geport-link")),
        //     "questions": JSON.parse(localStorage.getItem("geport-answer"))
        // }

        const demo = {
            "name": "string",
            "bio": "string",
            "phone": "string",
            "mbti": "string",
            "age": 0,
            "gender": "string",
            "blog_links": [
                "https://example.com/"
            ],
            "questions": [
                "string"
            ]
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(demo)
        };

        fetch('/api/geport/create', options)
            .then(res => {
                console.log('Server response:', res);
                return res.json();
            })
            .then(result => {
                console.log('Processed result:', result);
                setLoading(false);
            }).catch(error => {
            console.error('Error handling in promise:', error);
        });



    }, []); // This effect runs only once when the component mounts

    useEffect(() => {
        const isPage = paging >= 1 && paging <= 5;
        setIsInfo(!isPage);
    }, [paging]);

    const update = (id, newContent) => {
        const updatedAnswers = answer.map(ans =>
            ans.id === id ? { ...ans, content: newContent } : ans
        );
        setAnswer(updatedAnswers);
    };

    const pageComponent = (page) => {
        switch (page){
            case 1:
                return (
                    <First answer={answer} page={page} update={update}/>
                )
            case 2:
                return (
                    <Second answer={answer} page={page} update={update}/>
                )
            case 3:
                return (
                    <Third answer={answer} page={page} update={update}/>
                )
            case 4:
                return (
                    <Fourth answer={answer} page={page} update={update}/>
                )
            case 5:
                return (
                    <Fifth answer={answer} page={page} update={update}/>
                )
            default:
                return(
                    <Information/>
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
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    <div style={{ width: "100%", height: "10%", marginTop: "5%" }}>
                        <div style={{ width: "15%", height: "100%" }}>
                            <button style={{ fontSize: "1.8em" }} onClick={() => {
                                if (paging < 1) {
                                    router.refresh();
                                    router.push('/hidden-code');
                                } else {
                                    setPaging(prev => prev - 1)
                                }
                            }}>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27 30L21 24L27 18" stroke="white" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {pageComponent(paging)}
                    {isInfo ? <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '25px 0' }}></div> :
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '20px 0' }}>
                            {Array.from({ length: 5 }, (_, index) => (
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
                    }
                    <div style={{
                        width: "90%",
                        height: "50px",
                        backgroundColor: "#1AE57C",
                        borderRadius: "10px",
                        margin: "5%",
                        marginBottom: "6%",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "auto",
                        opacity: 1
                    }}
                         onClick={() => {
                             if (paging > 4) {
                                 router.refresh();
                                 router.push('/hidden-code');
                             }
                             else {
                                 setPaging(prev => prev + 1)
                             }
                         }}>
                        {paging === 5 ? "Geport 다운받기" : "다음으로"}
                    </div>
                </>
            )}
        </div>
    )
}

export function Information() {
    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "15%", fontSize: "1.6em",
                marginBottom: "10%" , paddingLeft: "10%", paddingRight: "10%"}}>
                (소개글 한 문장), Username 님의 Geport
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                color: "#C6C6C6",
                marginBottom: "2%",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop:"5%"
            }}>
                Username 님의 블로글와 답변을 바탕으로
                퍼스널 브랜딩에 필요한 분석 솔루션을 준비했어요
            </div>
        </div>
    )
}

export function First({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";

    return (
        <div style={{
            height: '100vh',
            overflowY: 'auto', // 수직 스크롤바만 표시되도록 설정
            scrollbarWidth: 'none', // Firefox에서 스크롤바를 숨기기 위한 설정
            '-ms-overflow-style': 'none', // IE에서 스크롤바를 숨기기 위한 설정
            '&::-webkit-scrollbar': { // Webkit 엔진 기반 브라우저에서 스크롤바를 숨기기 위한 설정
                display: 'none'
            }// 스크롤을 허용하는 부분
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "10%" , paddingLeft: "10%", paddingRight: "10%"}}>
                Username 님은 이런 사람이 되고 싶어해요
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop:"5%"
            }}>
                Lorem ipsum dolor sit amet consectetur. Amet pharetra consequat diam nunc eget accumsan fermentum enim quam. Convallis scelerisque pellentesque mi commodo in. Nulla nunc cursus ullamcorper amet aliquam diam turpis tempus nunc. Faucibus venenatis neque morbi amet leo diam.
            </div>
        </div>
    )
}

export function Second({answer, page, update}) {
    const myContent = answer.find(ans => ans.id === page)?.content || "";

    return (
        <div style={{
            height: '100vh',
            overflowY: 'auto', // 수직 스크롤바만 표시되도록 설정
            scrollbarWidth: 'none', // Firefox에서 스크롤바를 숨기기 위한 설정
            '-ms-overflow-style': 'none', // IE에서 스크롤바를 숨기기 위한 설정
            '&::-webkit-scrollbar': { // Webkit 엔진 기반 브라우저에서 스크롤바를 숨기기 위한 설정
                display: 'none'
            }// 스크롤을 허용하는 부분
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "10%" , paddingLeft: "10%", paddingRight: "10%"}}>
                Username 님의 좌우명을
                Geport가 분석했어요
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop:"5%"
            }}>
                Lorem ipsum dolor sit amet consectetur. Amet pharetra consequat diam nunc eget accumsan fermentum enim quam. Convallis scelerisque pellentesque mi commodo in. Nulla nunc cursus ullamcorper amet aliquam diam turpis tempus nunc. Faucibus venenatis neque morbi amet leo diam.
            </div>
        </div>
    )
}

export function Third({answer, page, update}) {
    const myContent = answer.find(ans => ans.id === page)?.content || "";

    return (
        <div style={{
            height: '100vh',
            overflowY: 'auto', // 수직 스크롤바만 표시되도록 설정
            scrollbarWidth: 'none', // Firefox에서 스크롤바를 숨기기 위한 설정
            '-ms-overflow-style': 'none', // IE에서 스크롤바를 숨기기 위한 설정
            '&::-webkit-scrollbar': { // Webkit 엔진 기반 브라우저에서 스크롤바를 숨기기 위한 설정
                display: 'none'
            }// 스크롤을 허용하는 부분
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "10%" , paddingLeft: "10%", paddingRight: "10%"}}>
                이 기간 동안 username 님의
                감정 SOS를 알려드려요
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop:"5%"
            }}>
                Lorem ipsum dolor sit amet consectetur. Amet pharetra consequat diam nunc eget accumsan fermentum enim quam. Convallis scelerisque pellentesque mi commodo in. Nulla nunc cursus ullamcorper amet aliquam diam turpis tempus nunc. Faucibus venenatis neque morbi amet leo diam.</div>
        </div>
    )
}

export function Fourth({answer, page, update}) {
    const myContent = answer.find(ans => ans.id === page)?.content || "";

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "10%" , paddingLeft: "10%", paddingRight: "10%"}}>
                Username 님의 삶을 그래프로 표현했어요
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image src={"/image/거북이랑 수영을.png"} width={400} height={100} alt={"logo"}/>
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop:"5%"
            }}>
                Lorem ipsum dolor sit amet consectetur. Amet pharetra consequat diam nunc eget accumsan fermentum enim quam.
            </div>
        </div>
    )
}

export function Fifth({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";

    return (
        <div style={{
            height: '100vh',
            overflowY: 'auto', // 수직 스크롤바만 표시되도록 설정
            scrollbarWidth: 'none', // Firefox에서 스크롤바를 숨기기 위한 설정
            '-ms-overflow-style': 'none', // IE에서 스크롤바를 숨기기 위한 설정
            '&::-webkit-scrollbar': { // Webkit 엔진 기반 브라우저에서 스크롤바를 숨기기 위한 설정
                display: 'none'
            }// 스크롤을 허용하는 부분
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "10%" , paddingLeft: "10%", paddingRight: "10%"}}>
                Username 님의 Geport 퍼스널 브랜딩 솔루션은
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop:"5%"
            }}>
                Lorem ipsum dolor sit amet consectetur. Amet pharetra consequat diam nunc eget accumsan fermentum enim quam. Convallis scelerisque pellentesque mi commodo in. Nulla nunc cursus ullamcorper amet aliquam diam turpis tempus nunc. Faucibus venenatis neque morbi amet leo diam.
            </div>
        </div>
    )
}

export function LoadingScreen() {
    return (
        <div style={{ backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ marginTop: '30px' }}>
                <Image src={"/image/logo3.svg"} width={120} height={120} alt="Logo" />
            </div>
            <h2 style={{ color: 'white', fontSize: '24px', padding: '40px' }}>Geport 결과 보고서</h2>
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <span style={{ color: "#A8A8A8" }}>작성하신 블로그를 바탕으로</span>
                <br />
                <span style={{ color: "#A8A8A8" }}>퍼스널 브랜딩 솔루션을 만들어 드립니다.</span>
            </div>
        </div>
    )
}