"use client"
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Question = (props) => {
    return (
        <div style={{borderStyle: "round",
            marginLeft: "5%", marginRight: "5%", marginBottom: "2%", width: "90%", height : "50px", borderRadius: "10px", display: "flex"}}>
            <input
                style={{backgroundColor: "#363636", width: "95%", height: "100%", borderRadius: "10px", paddingLeft: "3%"}}
                placeholder = "이곳에 블로그 링크를 첨부해주세요" value={props.question.content}
                onChange={(e) => props.updateQuestionContent(props.question.id, e.target.value)}/>
            <button style={{width:"5%", height:"100%"}}
                    onClick={()=>(props.removeItem(props.question))}> - </button>
        </div>
    )
};
export default function GeportLink(){
    const router = useRouter();
    const [questionList, setQuestionList] = useState([
        {id : 1, content: ""}, {id : 2, content: ""}, {id : 3, content: ""}, {id : 4, content: ""}, {id : 5, content: ""}
    ]);
    const [count, setCount] = useState(6);
    const [green, setGreen] = useState(false);
    const [isValidCount, setIsValidCount] = useState(false);

    useEffect(() => {
        // questionList의 모든 question.content가 비어 있지 않은 경우에만 true를 반환합니다.
        const allQuestionsFilled = questionList.every(question => question.content !== "");
        const isCountValid = questionList.length >= 5 && questionList.length <= 10;

        // 모든 질문이 채워져 있으면 true, 하나라도 비어 있으면 false를 setGreen에 설정합니다.
        setGreen(allQuestionsFilled);
        setIsValidCount(allQuestionsFilled && isCountValid);
    }, [questionList]);

    // id가 2인 요소를 제거하는 함수
    const removeItem = (props) => {
        setQuestionList(currentList => currentList.filter(item => item.id !== props.id));
    };

// id가 2인 요소를 다시 추가하는 함수
    const addItem = (props) => {
        setQuestionList(currentList => [...currentList, props]);
        setCount(prevCount => prevCount + 1);
    };

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
                            <path d="M27 30L21 24L27 18" stroke="white" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div style={{width: "100%", height: "10%", fontSize: "1.6em", marginBottom: "3%", paddingLeft: "5%"}}>
                나의 블로그 게시물 링크를 <br/>
                최대 10개까지 첨부해주세요
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%"
            }}>
                게시물 링크를 최소 5개, 최대 10개 첨부해주세요 <br/>
                첨부한 게시물을 바탕으로 Geport를 만들어드립니다.
            </div>
            <div style={{width: "100%", height: "55%", overflowY: "auto"}}>
                {
                    questionList.map((question) => {
                        return <Question question={question} key={question.id}
                                         updateQuestionContent={updateQuestionContent}
                                         removeItem={removeItem}/>
                    })
                }
                <div style={{
                    width: "90%", height: "10%", borderStyle: "round", borderWidth: "4px", borderColor: "#363636",
                    margin: "5%", borderRadius: "10px", display: "flex",
                    alignItems: "center", justifyContent: "center", color: "#C6C6C6"
                }}

                     onClick={() => {
                         addItem({id: count, content: ""})
                     }}>
                    +
                </div>
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
                     if (green && isValidCount) {
                         const content = questionList.map((question) => {
                             return question.content;
                         });
                         // 배열을 문자열 형태로 변환
                         const contentString = JSON.stringify(content);
                         localStorage.setItem('geport-link', contentString);
                         router.push("/geport");
                         router.refresh();
                     }
                 }}>
                다음으로
            </div>
        </div>
    );

}

