"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Question = (props) => {
    // 변경 사항을 로컬 스토리지에 저장하는 함수
    const handleChange = (e) => {
        const newContent = e.target.value;
        props.updateQuestionContent(props.question.id, newContent);
        localStorage.setItem(`blogLink-${props.question.id}`, newContent); // 로컬 스토리지에 저장
    };

    return (
        <div style={{
            borderStyle: "round",
            margin: "4.5%", width: "91%", height: "12%", borderRadius: "10px", display: "flex",
        }}>
            <input
                style={{
                    backgroundColor: "#363636", width: "100%", height: "100%",
                    borderRadius: "10px", fontSize: "1.0rem", padding: "10px"
                }}
                placeholder="이곳에 블로그 링크를 첨부해주세요"
                value={props.question.content}
                onChange={handleChange}
            />
        </div>
    );
};

export default function IGeportLink() {
    const router = useRouter();
    const [questionList, setQuestionList] = useState([]);
    const [green, setGreen]= useState(false);
    useEffect(() => {
        // 초기 로드 시 로컬 스토리지에서 데이터를 불러옵니다
        const loadedQuestions = [];
        for (let i = 1; i <= 4; i++) {
            const content = localStorage.getItem(`blogLink-${i}`) || "";
            loadedQuestions.push({ id: i, content });
            console.log(`Answer ${i}: ${content}`);
        }
        setQuestionList(loadedQuestions);
    }, []);

    useEffect(() => {
        // 모든 질문이 채워져 있고, 질문 수가 4개인지 확인합니다
        const allQuestionsFilled = questionList.every(question => question.content !== "");
        const isCountValid = questionList.length === 4;
        const isValid = allQuestionsFilled && isCountValid ;
        setGreen(isValid);

    }, [questionList]);

    const updateQuestionContent = (id, newContent) => {
        // 질문 내용을 업데이트하고 상태를 갱신합니다
        const updatedQuestions = questionList.map(question =>
            question.id === id ? { ...question, content: newContent } : question
        );
        setQuestionList(updatedQuestions);
    };

    return (
        <div style={{
            backgroundColor: "#181818",
            height: '100vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            weight: "100%"
        }}>
            <div style={{width: "100%", height: "10%", marginTop: "5%"}}>
                <div style={{width: "80%", height: "14%" }}>
                    <button style={{fontSize: "1.8em"}} onClick={() => router.push('/')}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 30L21 24L27 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div style={{
                width: "100%",
                height: "8%",
                fontSize: "1.6em",
                padding:"20px",
                paddingBottom:"20px"
            }}> <p>나의 블로그 게시물 링크<br/>4개를 첨부해주세요.</p></div>
            <div style={{
                width : "90%",
                height:"17%",
                padding:"20px",
                fontSize: "1em",
                color: "#C6C6C6",
                paddingBottom:"20px"
            }}> <br/>게시물 링크를 4개 첨부해주세요. <br/>첨부한 게시물을 바탕으로 iGeport를 만들어드립니다.
            </div>
            <div style={{width: "100%", height: "70%", overflowY: "auto"}}>
                {questionList.map((question) => (
                    <Question question={question} key={question.id} updateQuestionContent={updateQuestionContent} />
                ))}
            </div>
            <div style={{
                width: "91%",
                height: "7%",
                backgroundColor: green ? "#1AE57C":"#363636",
                borderRadius: "10px",
                margin: "4.5%",
                marginBottom: "15%",
                color: green ? "#363636":"#C6C6C6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
                opacity: 1,
                fontSize:"1.2em"
            }} onClick={() => {
                if (green) {
                    router.push("/igeport");
                    router.refresh();
                }
            }}>
                다음으로
            </div>
        </div>
    );
}
