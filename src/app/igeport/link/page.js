"use client"
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Question = (props) => {
    return (
        <div style={{
            borderStyle: "round",
            marginLeft: "5%",
            marginRight: "5%",
            marginBottom: "2%",
            width: "90%",
            height: "50px",
            borderRadius: "10px",
            display: "flex"
        }}>
            <input
                style={{
                    backgroundColor: "#363636",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    paddingLeft: "3%"
                }}
                placeholder="이곳에 블로그 링크를 첨부해주세요" value={props.question.content}
                onChange={(e) => props.updateQuestionContent(props.question.id, e.target.value)}/>
        </div>
    )
};
export default function IgeportLink() {
    const router = useRouter();
    const [questionList, setQuestionList] = useState([
        {id: 1, content: ""}, {id: 2, content: ""}, {id: 3, content: ""}, {id: 4, content: ""}
    ]);
    const [green, setGreen] = useState(false);
    const [isValidCount, setIsValidCount] = useState(false);
    const [isUrl, setIsUrl] = useState(false);
    const pattern = new RegExp('^(https?:\\/\\/)?' + // 프로토콜
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // 도메인명
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // 혹은 ip (v4) 주소
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // 포트번호와 경로
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // 쿼리 파라미터
        '(\\#[-a-z\\d_]*)?$','i'); // 해시 태그들을 허용

    useEffect(() => {
        const content = localStorage.getItem('igeport-link') || "";
        const loadedQuestionsText = content ? JSON.parse(content) : ["","","",""];
        const loadedQuestions = loadedQuestionsText.map((question, index) => {
            // index는 0부터 시작하므로, 1을 더해줍니다.
            return { id: index + 1, content: question };
        });
        setQuestionList(loadedQuestions);
    }, []);

    useEffect(() => {
        // questionList의 모든 question.content가 비어 있지 않은 경우에만 true를 반환합니다.
        const allQuestionsFilled = questionList.every(question => question.content !== "");
        const isCountValid = 4;
        const isUrlValid = questionList.every(question => pattern.test(question.content));

        // 모든 질문이 채워져 있으면 true, 하나라도 비어 있으면 false를 setGreen에 설정합니다.
        setGreen(allQuestionsFilled);
        setIsUrl(isUrlValid);
        setIsValidCount(allQuestionsFilled && isCountValid);
    }, [questionList]);

    const updateQuestionContent = (id, newContent) => {
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
            <div style={{width: "100%", height: "7%", marginTop: "5%"}}>
                <div style={{width: "15%", height: "100%"}}>
                    <button style={{fontSize: "1.8em"}} onClick={() => {
                        router.push('/onboarding');
                    }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 30L21 24L27 18" stroke="white" strokewidth="2" strokelinecap="round"
                                  strokelinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div style={{width: "100%", height: "10%", fontSize: "1.6em", marginBottom: "3%", paddingLeft: "5%"}}>
                나의 블로그 게시물 링크<br/>4개를 첨부해주세요.
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%"
            }}>
                게시물 링크를 4개 첨부해주세요. <br/>첨부한 게시물을 바탕으로 iGeport를 만들어드립니다.
            </div>
            <div style={{width: "100%", height: "55%", overflowY: "auto"}}>
                {
                    questionList.map((question) => {
                        return <Question question={question} key={question.id}
                                         updateQuestionContent={updateQuestionContent}
                                         />
                    })
                }
            </div>
            <div style={{
                width: "90%",
                height: "50px",
                backgroundColor: green && isValidCount ? "#1AE57C" : "#363636",
                borderRadius: "10px",
                margin: "5%",
                marginBottom: "6%",
                color: green && isValidCount ? "black" : "#C6C6C6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: green && isValidCount ? "auto" : "none",
                opacity: green && isValidCount ? 1 : 0.5
            }}
                 onClick={() => {
                     if(!isUrl) {
                        alert("입력한 값이 url인지 확인해주세요.")
                     }
                     if (green && isValidCount&&isUrl) {
                         const content = questionList.map((question) => {
                             return question.content;
                         });
                         // 배열을 문자열 형태로 변환
                         const contentString = JSON.stringify(content);
                         localStorage.setItem('igeport-link', contentString);
                         router.push("/igeport");
                         router.refresh();
                     }
                 }}>
                다음으로
            </div>
        </div>
    );

}

