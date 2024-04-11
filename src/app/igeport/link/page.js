"use client"
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Question = (props) => {
    return (
        <div style={{borderStyle: "round",
            margin: "3%", width: "90%", height : "12%", borderRadius: "10px", display: "flex"}}>
            <input
                style={{backgroundColor: "#363636", width: "100%", height: "100%", borderRadius: "10px", fontSize:"1.2em", padding:"10px"}}
                placeholder = "이곳에 블로그 링크를 첨부해주세요" value={props.question.content}
                onChange={(e) => props.updateQuestionContent(props.question.id, e.target.value)}/>
        </div>
    )
};
export default function iGeportLink(){
    const router = useRouter();
    const [questionList, setQuestionList] = useState([
        {id : 1, content: ""}, {id : 2, content: ""}, {id : 3, content: ""}, {id : 4, content: ""}
    ]);
    const [count, setCount] = useState(4);
    const [green, setGreen] = useState(false);
    const [isValidCount, setIsValidCount] = useState(false);

    useEffect(() => {
        // questionList의 모든 question.content가 비어 있지 않은 경우에만 true를 반환합니다.
        const allQuestionsFilled = questionList.every(question => question.content !== "");
        const isCountValid =questionList.length==4;

        // 모든 질문이 채워져 있으면 true, 하나라도 비어 있으면 false를 setGreen에 설정합니다.
        setGreen(allQuestionsFilled);
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
                <div style={{width: "80%", height: "14%", marginLeft: "3%"}}>
                    <button style={{fontSize: "1.8em"}} onClick={() => {
                        router.push('/'); // 375 811
                    }}><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27 30L21 24L27 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
            }}> <p>나의 블로그 게시물 링크<br/> 4개를 첨부해주세요.</p></div>
            <div style={{
                width : "90%",
                height:"17%",
                padding:"20px",
                fontSize: "1em",
                color: "#C6C6C6",
                paddingBottom:"20px"
                //  overflow :"flex"
            }}> <br/>게시물 링크를 4개 첨부해주세요. <br/>첨부한 게시물을 바탕으로 iGeport를 만들어드립니다.
            </div>
            <div style={{width: "100%", height: "70%", overflowY: "auto"}}>
                {
                    questionList.map((question) => {
                        return <Question question={question} key={question.id}
                                         updateQuestionContent={updateQuestionContent}
                                         />
                    })
                }
            </div>
            <div style={{
                width: "96%",
                height: "7%",
                backgroundColor: green && isValidCount ? "#1AE57C" : "#363636",
                borderRadius: "10px",
                margin: "2%",
                marginBottom: "15%",
                color: green && isValidCount ? "black" : "#C6C6C6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: green && isValidCount ? "auto" : "none",
                opacity: green && isValidCount ? 1 : 0.5,
                fontSize:"1.2em"
            }}
                 onClick={() => {
                     if (green && isValidCount) {
                         router.push("/igeport");
                         router.refresh();
                     }
                 }}>
                다음으로
            </div>
        </div>

    );

}