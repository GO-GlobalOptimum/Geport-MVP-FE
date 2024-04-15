"use client"
import {useRouter} from "next/navigation";
import {useEffect, useRef,useState} from "react";
import {Fira_Sans} from "next/dist/compiled/@next/font/dist/google";
import Image from "next/image";
import Chart from 'chart.js/auto';

export default function Geport_view(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [paging, setPaging] = useState(0);
    const [isInfo, setIsInfo] = useState(true);
    const [answer, setAnswer] = useState([
        {id : 1, content: ""}, {id : 2, content: ""}, {id : 3, content: ""}, {id : 4, content: ""}, {id : 5, content: ""}
    ]);
    const [data, setData] = useState({});

    useEffect(() => {
        const data = {
            "name": localStorage.getItem("name") || "",
            "bio": localStorage.getItem("bio") || "",
            "phone": localStorage.getItem("phone") || "",
            "mbti": localStorage.getItem("mbti") || "",
            "age": parseInt((localStorage.getItem("age"))) || 0,
            "gender": localStorage.getItem("gender"),
            "blog_links": JSON.parse(localStorage.getItem("geport-link")),
            "questions": JSON.parse(localStorage.getItem("geport-answer"))
        }

        console.log(data)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(`/api/geport/create`, options)
            .then(res => {
                console.log('Server response:', res);
                return res.json();
            })
            .then(result => {
                console.log('Processed result:', result);

            fetch(`/api/geport/generate-test/${result.encrypted_id}`, {method:"GET"})
                    .then(res=>{
                        return res.json()
                    })
                    .then(result=>{
                        console.log(result)
                        setData(result);
                        setLoading(false);
                    })
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
                    <First data={data}/>
                )
            case 2:
                return (
                    <Second data={data}/>
                )
            case 3:
                return (
                    <Third data={data}/>
                )
            case 4:
                return (
                    <Fourth data={data}/>
                )
            case 5:
                return (
                    <Fifth data={data}/>
                )
            default:
                return(
                    <Information data={data}/>
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
                                    router.push(`/userinfo/1`);
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

export function Information({data}) {
    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "15%", fontSize: "1.6em",
                marginBottom: "10%" , paddingLeft: "10%", paddingRight: "10%"}}>
                {localStorage.getItem('bio')}, {localStorage.getItem('name')} 님의 Geport
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
                {localStorage.getItem('name')} 님의 블로글와 답변을 바탕으로
                퍼스널 브랜딩에 필요한 분석 솔루션을 준비했어요
            </div>
        </div>
    )
}

export function First({data}){

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
                {localStorage.getItem('name')} 님은 이런 사람이 되고 싶어해요
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
                {data.result["저는 이런 사람이 되고싶어요"]}
            </div>
        </div>
    )
}

export function Second({data}) {

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
                {localStorage.getItem('name')} 님의 좌우명을
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
                {data.result["저의 좌우명은 다음과 같습니다 "]}
            </div>
        </div>
    )
}

export function Third({data}) {

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
                {localStorage.getItem('name')} 님의
                인생의 변곡접은 이겁니다.
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
                {data.result["제 인생의 변곡점은 다음과 같아요"]}
            </div>
        </div>
    )
}

export function Fourth({ data }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current && data) {  // 차트 생성 조건 확인
            const ctx = chartRef.current.getContext('2d');
            if (chartInstance.current) {
                chartInstance.current.destroy();  // 기존 차트 인스턴스 제거
            }
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 21}, (_, i) => i - 10),
                    datasets: [{
                        label: data.result["이것이 재 인생 함수입니다"]["equation"],
                        data: Array.from({length: 21}, (_, i) => -(i - 10)),
                        borderColor: 'red',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }

        // 컴포넌트 언마운트 시 차트 인스턴스 제거
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]); // data가 변경될 때마다 차트 업데이트

    return (
        <div style={{ height: '100vh' }}>
            <div style={{
                width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "10%", paddingLeft: "10%", paddingRight: "10%"
            }}>
                {localStorage.getItem('name')} 님의 삶을 그래프로 표현했어요
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <canvas ref={chartRef} width="50%" height="50%"></canvas>
            </div>
            <div style={{
                width: "100%", height: "10%", fontSize: "1em", marginBottom: "5%", color: "#C6C6C6",
                paddingLeft: "10%", paddingRight: "10%", marginTop: "5%"
            }}>
                {data.result["이것이 재 인생 함수입니다"]}
            </div>
        </div>
    );
}


export function Fifth({data}){

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
                {localStorage.getItem('name')} 님의 Geport 퍼스널 브랜딩 솔루션은
                다음과 같습니다.
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
                {data.result["Geport Solution"]}
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
                <span style={{ color: "#A8A8A8" }}>퍼스널 브랜딩 솔루션을 만들고 있습니다...</span>
            </div>
        </div>
    )
}