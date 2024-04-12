"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Fira_Sans} from "next/dist/compiled/@next/font/dist/google";
import Image from "next/image";

export default function iGeport_view(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);//3초 로딩 해보자
    const [paging, setPaging] = useState(0);
    const [isInfo, setIsInfo] = useState(true);
    const [answer, setAnswer] = useState([
        {id : 1, content: ""}, {id : 2, content: ""}, {id : 3, content: ""}, {id : 4, content: ""}, {id : 5, content: ""}, {id : 6, content: ""}
    ]);

    useEffect(() => {
        // Simulate loading for 3 seconds
        // const timer = setTimeout(() => {
        //     setLoading(false); // After 3 seconds, hide the loading screen
        // }, 2000);
        //
        // return () => clearTimeout(timer); // Cleanup function to clear the timer

        const data = {
            "name": localStorage.getItem("name") || "",
            "bio": localStorage.getItem("bio") || "",
            "phone": localStorage.getItem("phone") || "",
            "mbti": localStorage.getItem("mbti") || "",
            "age": parseInt((localStorage.getItem("age"))) || 0,
            "gender": localStorage.getItem("gender"),
            "blog_links": JSON.parse(localStorage.getItem("igeport-link")),
            "questions": JSON.parse(localStorage.getItem("igeport-answer"))
        }

        const demo = {
            "name": "의진",
            "bio": "투지",
            "phone": "01052672383",
            "mbti": "INFJ",
            "age": 23,
            "gender": "남자",
            "blog_links": JSON.parse(localStorage.getItem("igeport-link")),
            "questions": JSON.parse(localStorage.getItem("igeport-answer"))
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(demo)
        };

        fetch('/api/igeport/create', options)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                setLoading(false);
            });
    }, []); // This effect runs only once when the component mounts

    useEffect(() => {
        const isPage = paging >= 1 && paging <= 6;
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
            case 6:
                return (
                    <Six answer={answer} page={page} update={update}/>
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
            {loading ? ( // Display loading screen for 3 seconds
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
                            {Array.from({ length: 6 }, (_, index) => (
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
                             if (paging > 5) {
                                 router.refresh();
                                 router.push('/hidden-code'); // 다음 페이지로 이동하자
                             }
                             else {
                                 setPaging(prev => prev + 1)
                             }
                         }}>
                        {paging === 6 ? "iGeport 다운받기" : "다음으로"}
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
                (소개글 한문장), Uswername 님의 iGeport
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
                Username 님의 블로그와 답변을 바탕으로 퍼스널 브랜딩에 필요한 심리 보고서를 준비했어요.
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
                marginBottom: "20px" , paddingLeft: "10%", paddingRight: "10%"}}>
                Username 님의 블로그를 분석했어요
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
                그저 예시문
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image src={"/image/gc_sky.jpg"} width={400} height={100} alt={"logo"}/>
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
                그저 예시문
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
                그저 예시문
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image src={"/image/gc_sky.jpg"} width={400} height={100} alt={"logo"}/>
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
                그저 예시문
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
                이 기간 동안 username 님의
                감정곡선을 보여드려요
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
                username 님은 여행 일자에 따라 행복, 만족감, 기쁨의 지수가 점차 증가합니다.
                반면 우울감 지수는 낮아지며, 이는 여행이 긍정적인 경험 이었음을 시사합니다.
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
                이 그래프는 username 님의 부정적 감정 상태를 나타냅니다.
                스트레스, 불안, 슬픔, 피로와 같은 감정들이 정상 범위 기준선인 200점 아래이며, 이는 여행이 username 님께 긍정적인 영향을 미쳤음을 시사합니다.
            </div>
        </div>
    )
}

export function Fourth({answer, page, update}) {
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
                블로그를 작성할 당시
                username 님은 이런 모습이었어요.
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
                Big 5 점수 설명
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
                이 기간 동안 username 님을
                행복하게 만든 것을 모아봤어요
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
                </div>
        </div>
    )
}
export function Six({answer, page, update}){
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
                username 님의
                iGeport 감정 분석 솔루션은
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
                Lorem ipsum dolor sit amet consectetur. Amet pharetra consequat diam numc eget accumsan fermentum enim quam.
                Convallis scelerisque pellentesque mi commodo in.
                Nulla nunc cursus ullamcorper amet aliquam diam turpis tempus nunc. Faucibus venenatis neque morbi amet leo diam.

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
            <h2 style={{ color: 'white', fontSize: '24px', padding: '40px' }}>iGeport 결과 보고서</h2>
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <span style={{ color: "#A8A8A8" }}>iGeport는 총 여섯 단계로</span>
                <br />
                <span style={{ color: "#A8A8A8" }}>블로그에 드러난 당신의 심리를 분석합니다.</span>
            </div>
        </div>
    )
}