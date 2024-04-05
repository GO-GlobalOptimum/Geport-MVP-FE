"use client"
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Question = (props) => {
    return (
        <div style={{borderStyle: "round",
            margin: "3%", width: "94%", height : "12%", borderRadius: "10px", display: "flex"}}>
            <input
                style={{backgroundColor: "#363636", width: "95%", height: "100%", borderRadius: "10px", paddingLeft: "1%"}}
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
        {id : 1, content: ""}, {id : 2, content: ""}, {id : 3, content: ""}
    ]);
    const [count, setCount] = useState(4);

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
            <div style={{width: "100%", height: "10%"}}>
                <div style={{width: "15%", height: "100%", marginLeft:"2%"}}>
                    <button onClick={() => {
                        router.push('/');
                    }}>뒤로가기
                    </button>
                </div>
            </div>
            <div style={{width: "100%", height: "10%", fontSize: "1.6em", marginBottom:"3%", marginLeft: "1%"}}>
                나의 블로그 게시물 링크를 <br/>
                최대 10개까지 첨부해주세요
            </div>
            <div style={{width: "100%", height: "10%", fontSize: "1em", marginBottom:"5%", color:"#C6C6C6", marginLeft: "1%"}}>
                게시물 링크를 최소 5개, 최대 10개 첨부해주세요 <br/>
                첨부한 게시물을 바탕으로 Geport를 만들어드립니다.
            </div>
            <div style={{width: "100%", height: "50%", overflowY: "auto"}}>
                {
                    questionList.map((question) => {
                        return <Question question={question} key={question.id}
                                         updateQuestionContent={updateQuestionContent}
                                         removeItem={removeItem}/>
                    })
                }
                <div style={{ width: "94%", height: "10%", borderStyle: "round", borderWidth: "4px", borderColor: "#363636",
                    margin: "3%", borderRadius: "10px", display: "flex",
                    alignItems: "center", justifyContent: "center", color: "#C6C6C6"}}

                    onClick={()=>{
                        addItem({id : count, content: ""})
                    }}>
                    +
                </div>
            </div>
            <div style={{
                width: "96%", height: "7%", backgroundColor: "#363636", borderRadius: "10px",
                margin: "2%", marginBottom : "6%", color: "#C6C6C6", display: "flex",
                        alignItems: "center", justifyContent: "center"}}
                onClick={()=>{
                    router.push("/geport");
                }}>
                다음으로
            </div>
        </div>
    );

}

