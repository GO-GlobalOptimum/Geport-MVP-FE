"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Fira_Sans} from "next/dist/compiled/@next/font/dist/google";
import Image from "next/image";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { Radar } from 'react-chartjs-2';

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
        const name = data['name'];

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
            <div style={{width: "100%", height: "15%", fontSize: "1.6em",
                marginBottom: "10%" , paddingLeft: "10%", paddingRight: "10%"}}>
                {bio}, {user_name} 님의 iGeport
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
                {user_name} 님의 블로그와 답변을 바탕으로 퍼스널 브랜딩에 필요한 심리 보고서를 준비했어요.
            </div>
        </div>
    )
}

export function First({ data, page, update}){
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
            }// 스크롤을 허용하는 부분
        }}>
            <div style={{
                width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "20px", paddingLeft: "10%", paddingRight: "10%"
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
                height: "15%",
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%"
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
                height: "15%",
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%"
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
                height: "15%",
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%"
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
                height: "15%",
                fontSize: "0.9em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "5%"
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

export function Second({data, page, update}) {
    const user_name = localStorage.getItem("name") || "Default User";

    // 'answer_2' 문자열을 JSON 객체로 파싱
    const blogData = JSON.parse(data["answer_2"]);

    // 정의된 감정별 키와 이에 대응하는 라벨
    const emotions = [
        { key: 'happiness', label: 'Happy' },
        { key: 'joy', label: 'Joy' },
        { key: 'anxiousness', label: 'Anxious' },
        { key: 'depression', label: 'Depressed' },
        { key: 'anger', label: 'Anger' },
        { key: 'sadness', label: 'Sadness' }
    ];

    // 각 감정별로 시간에 따른 변화 데이터 추출
    const emotionData = emotions.map(({ key, label }) => ({
        label: label,
        data: [
            blogData["blog_1"]["emotions"][key],
            blogData["blog_2"]["emotions"][key],
            blogData["blog_3"]["emotions"][key],
            blogData["blog_4"]["emotions"][key]
        ],
        borderColor: getRandomColor(),
        fill: false
    }));

    const chartData = {
        labels: ['Blog 1', 'Blog 2', 'Blog 3', 'Blog 4'], // 블로그 순서
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
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    afterBody: function(context) {
                        // Tooltip에 내용 추가
                        const blogIndex = context[0].dataIndex;
                        const contentTexts = [
                            blogData["blog_1"]["contents"],
                            blogData["blog_2"]["contents"],
                            blogData["blog_3"]["contents"],
                            blogData["blog_4"]["contents"]
                        ];
                        return contentTexts[blogIndex];
                    }
                }
            }
        }
    };

    // 색상을 무작위로 생성하는 함수
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div style={{height: '100vh', overflowY: 'auto'}}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em", marginBottom: "10%", paddingLeft: "10%", paddingRight: "10%"}}>
                이 기간 동안 {user_name} 님의 감정 변화를 보여드려요
            </div>
            <Line data={chartData} options={options} />
        </div>
    );
}

import { Chart, registerables } from 'chart.js';   // Chart.js와 registerables 가져오기
Chart.register(...registerables);                 // 모든 차트 유형, 스케일, 플러그인 등을 등록

import { Bar } from 'react-chartjs-2';            // Bar 차트 컴포넌트 가져오기
// Bar 차트를 사용하기 위해 import합니다.

export function Third({data, page, update}) {
    const user_name = localStorage.getItem("name") || "Default User";

    // answer_3 데이터 파싱
    const answer3Data = data.answer3 ? JSON.parse(data.answer3) : { emotions: { sadness: 0, anger: 0, depressed: 0, anxious: 0 }, explanation: "No data available." };

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
                position: 'top'
            }
        }
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div style={{height: '100vh', overflowY: 'auto'}}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em", marginBottom: "10%", paddingLeft: "10%", paddingRight: "10%"}}>
                이 기간 동안 {user_name} 님의 감정 변화를 보여드려요
            </div>
            <Bar data={emotionData} options={chartOptions} />
            <div style={{width: "100%", height: "10%", fontSize: "1em", marginBottom: "5%", color: "#C6C6C6", paddingLeft: "10%", paddingRight: "10%", marginTop:"5%"}}>
                {answer3Data.explanation}
            </div>
        </div>
    );
}

export function Fourth({data, page, update}) {
    const user_name = localStorage.getItem("name") || "Default User";

    // Big Five 데이터 집계
    const bigFiveData = {
        openness: [],
        conscientiousness: [],
        extroversion: [],
        agreeableness: [],
        neuroticism: []
    };

    // 모든 answer의 점수 합산
    Object.keys(data.big_5).forEach(answerKey => {
        const answer = data.big_5[answerKey];
        bigFiveData.openness.push(answer["openness"]);
        bigFiveData.conscientiousness.push(answer["sincerity"]); // sincerity를 conscientiousness의 대응값으로 가정
        bigFiveData.extroversion.push(answer["extroversion"]);
        bigFiveData.agreeableness.push(answer["friendliness"]); // friendliness를 agreeableness의 대응값으로 가정
        bigFiveData.neuroticism.push(answer["neuroticism"]);
    });

    // 점수 평균 계산
    const bigFiveAverages = Object.fromEntries(
        Object.entries(bigFiveData).map(([key, values]) => {
            const sum = values.reduce((a, b) => a + b, 0);
            return [key, sum / values.length];
        })
    );

    // 차트 데이터 설정
    const chartData = {
        labels: Object.keys(bigFiveAverages),
        datasets: [{
            label: `${user_name}의 Big Five 성격 특성`,
            data: Object.values(bigFiveAverages),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div style={{height: '100vh', overflowY: 'auto'}}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em", marginBottom: "10%", paddingLeft: "10%", paddingRight: "10%"}}>
                블로그를 작성할 당시 {user_name} 님은 이런 모습이었어요.
            </div>
            <Radar data={chartData} />
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
                Big 5 점수 설명 - 지피티 설명 값 필요
            </div>
        </div>
    );
}

export function Fifth({ data }) {
    const user_name = localStorage.getItem("name") || "Default User";
    const ref = useRef();

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const wordsMap = {};
        // 모든 answer 항목에서 단어 및 점수 집계
        Object.values(data.happy_keyword).forEach((item) => {
            Object.entries(item).forEach(([word, score]) => {
                if (wordsMap[word]) {
                    wordsMap[word] += score;
                } else {
                    wordsMap[word] = score;
                }
            });
        });

        // 워드 클라우드 라이브러리에 맞는 형태로 데이터 변환
        const words = Object.keys(wordsMap).map((text) => ({
            text,
            size: wordsMap[text], // 단어의 크기를 점수에 비례하게 설정
        }));

        // 워드 클라우드 레이아웃 설정 및 렌더링
        const layout = cloud()
            .size([800, 400])
            .words(words)
            .padding(5)
            .rotate(() => 0)
            .fontSize((d) => d.size)
            .on("end", (renderedWords) => {
                d3.select(ref.current)
                    .attr("viewBox", `0 0 800 400`)
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .append("g")
                    .attr("transform", "translate(400,200)")
                    .selectAll("text")
                    .data(renderedWords)
                    .enter()
                    .append("text")
                    .style("font-size", (d) => `${d.size}px`)
                    .style("fill", () => `hsl(${Math.random() * 360},100%,50%)`)
                    .attr("text-anchor", "middle")
                    .attr("transform", (d) => `translate(${[d.x, d.y]})`)
                    .text((d) => d.text);
            });

        layout.start();
    }, [data]); // data가 변경될 때마다 effect를 재실행

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
                width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "10%", paddingLeft: "10%", paddingRight: "10%"
            }}>
                이 기간 동안 {user_name} 님을 행복하게 만든 것을 모아봤어요
            </div>
            <svg ref={ref} />
        </div>
    );
}

export function Six({data, page, update}){
    const final_summary = data["answer_6"]
    const summary = final_summary["summary"]
    const advice = final_summary["advice"]
    const user_name =localStorage.getItem("name");
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
                {user_name} 님의
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
                {summary}
                <br/>
                {advice}
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