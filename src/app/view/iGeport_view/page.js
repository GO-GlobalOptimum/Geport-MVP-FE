"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { Text } from '@visx/text';
import { scaleSqrt } from '@visx/scale'; // Make sure this import is included



export default function iGeport_view(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);//3초 로딩 해보자
    const [paging, setPaging] = useState(0);
    const [isInfo, setIsInfo] = useState(true);
    const [answer, setAnswer] = useState([
        {id : 1, content: ""}, {id : 2, content: ""}, {id : 3, content: ""}, {id : 4, content: ""}, {id : 5, content: ""}, {id : 6, content: ""}
    ]);
    const [data, setData]=useState({});

    useEffect(() => {
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

        console.log(data)
        const options = {
            method: 'POST',
            headers: { // get 할때 빼버리면됨
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };



        fetch('/api/igeport/create', options)
            .then(res => {
                console.log('Server response:', res);
                return res.json();
            })
            .then(result => {
                console.log('Processed result:', result); // result 변수에 json형태의 encrypted_id 가 저장되어 있음
                // igeport/generate-dummy/result

                fetch(`/api/igeport/generate-test/${result.encrypted_id}`, {method:'GET'})
                    .then(res=>{
                        return res.json()
                    })
                    .then(data=>{
                        console.log(data)
                        setData(data);
                        setLoading(false);
                        console.log("000", data);
                    }).catch(error =>
                     {
                        console.error('Error handling in promise:', error);
                     })
            }).catch(error => {
            console.error('Error handling in promise:', error);
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
                    <First data={data} page={page} update={update}/>
                )
            case 2:
                return (
                    <Second data={data} page={page} update={update}/>
                )
            case 3:
                return (
                    <Third data={data} page={page} update={update}/>
                )
            case 4:
                return (
                    <Fourth data={data} page={page} update={update}/>
                )
            case 5:
                return (
                    <Fifth data={data} page={page} update={update}/>
                )
            case 6:
                return (
                    <Six data={data} page={page} update={update}/>
                )
            default:
                return(
                    <Information />
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
    const user_name = localStorage.getItem("name")
    const bio = localStorage.getItem("bio")
    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "15%", fontSize: "1.4em",
                marginBottom: "10%" , paddingLeft: "10%", paddingRight: "10%"}}>
                {bio}, {user_name} 님의 iGeport
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1.2em",
                color: "#C6C6C6",
                marginBottom: "2%",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop:"5%"
            }}>
                {user_name} 님의 블로그와 답변을 바탕으로 퍼스널 브랜딩에 필요한 심리 보고서를 준비했어요.
            </div>
        </div>
    )
}

export function First({data}){
    // data 객체에서 바로 필요한 부분에 접근
    if (!data) {
        return <div>Loading or data not available...</div>; // 데이터 확인 로직 추가
    }

    const user_name = localStorage.getItem("name") || "Default User"; // 사용자 이름 가져오기, 기본값 설정
    const blogData = JSON.parse(data["answer_1"]);

// 파싱된 객체에서 각 블로그 데이터에 접근
    const day1 = blogData["blog_1"];
    const day2 = blogData["blog_2"];
    const day3 = blogData["blog_3"];
    const day4 = blogData["blog_4"];

    return (
        <div style={{
            height: '100vh',
            overflowY: 'auto', // 수직 스크롤바만 표시되도록 설정
            scrollbarWidth: 'none', // Firefox에서 스크롤바를 숨기기 위한 설정
            '-ms-overflow-style': 'none', // IE에서 스크롤바를 숨기기 위한 설정
            '&::-webkit-scrollbar': { // Webkit 엔진 기반 브라우저에서 스크롤바를 숨기기 위한 설정
                display: 'none'
            }
        }}>
            <div style={{
                width: "100%", height: "10%", fontSize: "1.4em",
                marginBottom: "12px", paddingLeft: "10%", paddingRight: "10%"
            }}>
                {user_name} 님의 블로그를 분석했어요
            </div>
            <div style={{
                width: "100%", height: "1.2em", fontSize: "1.2em",
                marginBottom: "20px", paddingLeft: "10%", paddingRight: "10%"
            }}>
                1일차
            </div>
            <div style={{
                width: "100%",
                height: "12%",
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%",overflowY:"auto"
            }}>
                {day1}
            </div>
            <div style={{
                width: "100%", height: "1.2em", fontSize: "1.2em",
                marginBottom: "20px", paddingLeft: "10%", paddingRight: "10%"
            }}>
                2일차
            </div>
            <div style={{
                width: "100%",
                height: "12%",
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%", overflowY:"auto"
            }}>
                {day2}
            </div>
            <div style={{
                width: "100%", height: "1.2em", fontSize: "1.2em",
                marginBottom: "20px", paddingLeft: "10%", paddingRight: "10%"
            }}>
                3일차
            </div>
            <div style={{
                width: "100%",
                height: "12%",
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%", overflowY:"auto"
            }}>
                {day3}
            </div>
            <div style={{
                width: "100%", height: "1.2em", fontSize: "1.2em",
                marginBottom: "20px", paddingLeft: "10%", paddingRight: "10%"
            }}>
                4일차
            </div>
            <div style={{
                width: "100%",
                height: "12%",
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%", overflowY:"auto"
            }}>
                {day4}
            </div>
        </div>
    )
}

// Chart.js 라이브러리에 필요한 컴포넌트를 등록합니다.
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function getRandomColor() {
    // Pastel colors are often represented with high saturation and lightness
    const hue = Math.floor(Math.random() * 360); // Random hue from 0 to 359
    const saturation = Math.floor(Math.random() * 26) + 70; // Saturation between 70% and 95%
    const lightness = Math.floor(Math.random() * 16) + 75; // Lightness between 75% and 90%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function Second({data}) {
    const user_name = localStorage.getItem("name") || "Default User";
    const blogData = JSON.parse(data["answer_2"]);

    const emotions = [
        { key: 'happiness', label: 'Happy' },
        { key: 'joy', label: 'Joy' },
        { key: 'anxiousness', label: 'Anxious' },
        { key: 'depression', label: 'Depressed' },
        { key: 'anger', label: 'Anger' },
        { key: 'sadness', label: 'Sadness' }
    ];

    const emotionData = emotions.map(({ key, label }) => ({
        label: label,
        data: [
            blogData["blog_1"]["emotions"][key],
            blogData["blog_2"]["emotions"][key],
            blogData["blog_3"]["emotions"][key],
            blogData["blog_4"]["emotions"][key]
        ],
        borderColor: getRandomColor(),
        tension: 0.1
    }));

    const chartData = {
        labels: ['Blog 1', 'Blog 2', 'Blog 3', 'Blog 4'],
        datasets: emotionData
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    afterBody: function(context) {
                        const blogIndex = context[0].dataIndex;
                        return [
                            blogData["blog_1"]["contents"],
                            blogData["blog_2"]["contents"],
                            blogData["blog_3"]["contents"],
                            blogData["blog_4"]["contents"],
                        ][blogIndex];
                    }
                }
            }
        }
    };

    return (
        <div style={{
            height: '100vh',
            overflowY: 'auto', // 수직 스크롤바만 표시되도록 설정
            scrollbarWidth: 'none', // Firefox에서 스크롤바를 숨기기 위한 설정
            '-ms-overflow-style': 'none', // IE에서 스크롤바를 숨기기 위한 설정
            '&::-webkit-scrollbar': { // Webkit 엔진 기반 브라우저에서 스크롤바를 숨기기 위한 설정
                display: 'none'
            }}}>
            <div style={{
                width: "100%", height: "10%", fontSize: "1.4em",
                marginBottom: "12px", paddingLeft: "10%", paddingRight: "10%"}}>
                이 기간 동안 {user_name} 님의 감정 변화를 보여드려요
            </div>
            <Line data={chartData} options={options} style={{width: "80%", height: "40%"}} />
            <div style={{
                width: "100%", height: "10%", fontSize: "0.9em",
                marginBottom:"3.5%", paddingLeft: "10%", paddingRight: "10%", color:"#C6C6C6"}}>
                <div style={{fontSize: "1.2rem",fontWeight:"600",color: 'white' }}>1일차</div>
                {blogData["blog_1"]["contents"]}
                <div style={{fontSize: "1.2rem",fontWeight:"600",color: 'white',marginTop:"3%" }}>2일차</div>
                {blogData["blog_2"]["contents"]}
                <div style={{fontSize: "1.2rem",fontWeight:"600",color: 'white',marginTop:"3%" }}>3일차</div>
                {blogData["blog_3"]["contents"]}
                <div style={{fontSize: "1.2rem",fontWeight:"600",color: 'white',marginTop:"3%" }}>4일차</div>
                {blogData["blog_4"]["contents"]}
            </div>
        </div>
    );
}

import {Chart, registerables} from 'chart.js';   // Chart.js와 registerables 가져오기
Chart.register(...registerables);                 // 모든 차트 유형, 스케일, 플러그인 등을 등록
          // Bar 차트 컴포넌트 가져오기


export function Third({data}) {
    const user_name = localStorage.getItem("name") || "Default User";

    // answer_3 데이터 파싱
    const answer3Data = data ? JSON.parse(data["answer_3"]) : {
        emotions: { sadness: 0, anger: 0, depressed: 0, anxious: 0 },
        contents: "No data available." // 기본값 설정을 추가
    };

    // 감정 데이터와 설명 추출
    const emotions = ['sadness', 'anger', 'depressed', 'anxious'];
    const emotionValues = emotions.map(emotion => answer3Data.emotions[emotion]);
    const emotionData = {
        labels: emotions,
        datasets: [{
            label: 'Emotion Levels',
            data: emotionValues,
            backgroundColor: emotions.map(() => getRandomColor()), // 각 감정별 다른 색상
            borderColor: emotions.map(() => '#000000'), // 검은색 테두리
            borderWidth: 1
        }]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };

    return (
        <div style={{
                height: '100vh',
                overflowY: 'auto', // 수직 스크롤바만 표시되도록 설정
                scrollbarWidth: 'none', // Firefox에서 스크롤바를 숨기기 위한 설정
                '-ms-overflow-style': 'none', // IE에서 스크롤바를 숨기기 위한 설정
                '&::-webkit-scrollbar': { // Webkit 엔진 기반 브라우저에서 스크롤바를 숨기기 위한 설정
                    display: 'none'}}}>
            <div style={{
                width: "100%", height: "10%", fontSize: "1.4em",
                marginBottom: "12px", paddingLeft: "10%", paddingRight: "10%"}}>
                이 기간 동안 {user_name} 님의 감정 SOS를 알려드려요
            </div>
            <Bar data={emotionData} options={chartOptions} style={{width:"85%"}} />
            <div style={{
                width: "100%", height: "10%", fontSize: "1em", marginTop:"5%",
                marginBottom: "12px", paddingLeft: "10%", paddingRight: "10%", color: "#C6C6C6"}}>
                {answer3Data["contents"]}
            </div>
        </div>
    );
}
export function Fourth({data}) {
    const user_name = localStorage.getItem("name") || "Default User";
    const containerRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    let happinessData = {};
    try {
        happinessData = JSON.parse(data["answer_4"]);
    } catch (e) {
        console.error("Parsing error:", e);
        return <div>Error loading data.</div>;
    }

    const words = Object.entries(happinessData).map(([key, value]) => ({
        text: key,
        value: value
    }));

    // Adjust the font scaling to emphasize larger values more
    const fontScale = scaleSqrt({
        domain: [1, Math.max(...words.map(word => word.value))],
        range: [16, 80]
    });

    const fontSizeSetter = word => fontScale(word.value);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setSize({ width: width * 0.85, height: height * 0.5 }); // Sizing relative to parent
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div ref={containerRef} style={{ height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: "100%", textAlign: "center", fontSize: "1.4em", marginBottom: "20px" }}>
                {user_name} 님을 행복하게 만든 것들을 모아봤어요.
            </div>
            {size.width && size.height && (
                <Wordcloud
                    words={words}
                    width={size.width}
                    height={size.height}
                    fontSize={fontSizeSetter}
                    font="Arial"
                    padding={5}
                    rotate={() => 0}
                    spiral="archimedean"
                    random={() => 0.5}
                >
                    {cloudWords => cloudWords.map((word, i) => (
                        <Text
                            key={word.text}
                            fill="#1AE57C"
                            textAnchor="middle"
                            transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
                            fontSize={word.size}
                            fontFamily="Arial"
                        >
                            {word.text}
                        </Text>
                    ))}
                </Wordcloud>
            )}
        </div>
    );
}


export function Fifth({data}) {
    const user_name = localStorage.getItem("name") || "Default User";

    // Parse the 'answer_5' data
    const personalityData = JSON.parse(data["answer_5"]);

    // Map the personality traits data
    const traits = [
        { key: 'openness', label: 'Openness' },
        { key: 'sincerity', label: 'Conscientiousness' },
        { key: 'extroversion', label: 'Extroversion' },
        { key: 'friendliness', label: 'Agreeableness' },
        { key: 'neuroticism', label: 'Neuroticism' }
    ];

    const scores = traits.map(trait => personalityData[trait.key].score);
    const descriptions = traits.map(trait => personalityData[trait.key].description);

    const chartData = {
        labels: traits.map(trait => trait.label),
        datasets: [{
            label: `${user_name} 님의 Big 5`,
            data: scores,
            borderColor: getRandomColor(),
            tension: 0.1
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 0, // Ensure labels are not tilted
                    minRotation: 0
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    afterBody: function(context) {
                        return descriptions[context.dataIndex];  // Display personality trait descriptions
                    }
                }
            }
        }
    };

    return (
        <div style={{
            height: '100vh',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }}>
            <div style={{
                width: "100%", height: "10%", fontSize: "1.4em",
                marginBottom: "12px", paddingLeft: "10%", paddingRight: "10%"
            }}>
                이 기간 동안 {user_name} 님의 성격 특성을 분석합니다
            </div>
            <Line data={chartData} options={options} style={{width:"80%", height:"40%"}}/>
            <div style={{
                width: "100%", height: "10%", fontSize: "0.9em", color:"#C6C6C6",
                marginBottom: "12px", paddingLeft: "10%", paddingRight: "10%"
            }}>
                {traits.map((trait, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "1.2rem", fontWeight:"600",color: 'white'  }}>{trait.key}</div>
                        {personalityData[trait.key].description}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Six({data}) {
    const user_name = localStorage.getItem("name") || "Default User";

    // 'answer_5' 데이터 파싱
    const finalData = JSON.parse(data["answer_6"]);
    const summary = finalData["summary"];
    const advice = finalData["advice"];

    return (
        <div style={{
            height: '100vh',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }}>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1.4em",
                marginBottom: "20px",
                paddingLeft: "10%",
                paddingRight: "10%"
            }}>
                {user_name} 님의 iGeport 감정 분석 솔루션은
            </div>
            <div style={{width: "90%", margin:"5%", height: "auto", fontWeight:"600",color: 'white' ,fontSize: "1.2em"}}>
                Summary
            </div>
            <div style={{
                width: "85%",
                height: "auto", // Adjust height as needed
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                margin:"5%",
              //  backgroundColor: "#f0f0f0", // Use a light background color for sections
                borderRadius: '8px' // Optional: rounded corners
            }}>
                {summary}
            </div>
            <div style={{width: "90%", margin:"5%", fontWeight:"600",color: 'white' , height: "auto",fontSize: "1.2em"}}>
                Advice
            </div>
            <div style={{
                width: "85%",
                height: "auto", // Adjust height as needed
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                margin:"5%",
             //   backgroundColor: "#e9e9e9", // A different background color for contrast
                borderRadius: '8px' // Optional: rounded corners
            }}>
                {advice}
            </div>
        </div>
    );
}


export function LoadingScreen() {
    return (
        <div style={{backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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