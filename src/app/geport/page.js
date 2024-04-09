"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Fira_Sans} from "next/dist/compiled/@next/font/dist/google";

export default function Geport(){
    const router = useRouter();
    const [paging, setPaging] = useState(0);
    const [isInfo, setIsInfo] = useState(true);
    const [answer, setAnswer] = useState([
        {id : 1, content: ""}, {id : 2, content: ""}, {id : 3, content: ""}, {id : 4, content: ""}, {id : 5, content: ""}
    ]);
    const [isVaild, setIsVaild] = useState(false);

    useEffect(() => {
        const isPage = paging >= 1 && paging <= 5;
        setIsInfo(!isPage);
        const pageContent = answer.find(ans => ans.id === paging)?.content || "";
        const isContent = pageContent !== ""
        setIsVaild(isContent || !isPage);
    }, [paging, answer]);

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
    return(
        <div style={{
            backgroundColor: "#181818",
            height: '100vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            weight: "100%"
        }}>
            <div style={{width: "100%", height: "10%", marginTop: "5%"}}>
                <div style={{width: "15%", height: "100%"}}>
                    <button style={{fontSize: "1.8em"}} onClick={() => {
                        if (paging < 1) {
                            router.refresh();
                            router.push('/geport/link');
                        } else {
                            setPaging(prev => prev - 1)
                        }
                    }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 30L21 24L27 18" stroke="white" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            {pageComponent(paging)}

            {isInfo ? <div style={{display: 'flex', justifyContent: 'center', gap: '8px', margin: '25px 0'}}></div> :
                <div style={{display: 'flex', justifyContent: 'center', gap: '8px', margin: '20px 0'}}>
                    {Array.from({length: 5}, (_, index) => (
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
                backgroundColor: isVaild ? "#1AE57C" : "#363636",
                borderRadius: "10px",
                margin: "5%",
                marginBottom: "6%",
                color: isVaild ? "black" : "#C6C6C6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: isVaild ? "auto" : "none",
                opacity: isVaild ? 1 : 0.5
            }}
                 onClick={() => {
                     if (paging > 4) {
                         router.refresh();
                         router.push('/user-info'); // 다음 페이지로 이동하자
                     }
                     else{
                         setPaging(prev => prev + 1)
                     }
                 }}>
                다음으로
            </div>
        </div>
    )
}

export function Information() {
    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "15%", fontSize: "1.6em",
                marginBottom: "5%", paddingLeft: "5%", paddingRight: "5%"}}>
                다음 질문에 가능한 상쇄하게
                답변해주세요
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                color: "#C6C6C6",
                marginBottom: "2%",
                paddingLeft: "5%",
                paddingRight: "5%"
            }}>
                다음 질문의 답변과 첨부해주신 블로그의 내용을 바탕으로
                Geport를 작성합니다.
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%"
            }}>
                답변은 반드시 블로그에 작성된 내용과 일치할 필요는 없습니다.
                자유롭게 작성해주세요.
            </div>
        </div>
    )
}

export function First({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                당신은 어떤 사람이 되고 싶나요?
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%",
            }}>
                답변은 반드시 블로그에 작성된 내용과 일치할 필요는 없습니다.
                자유롭게 작성해주세요.
            </div>
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "40%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <textarea
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"예시: 스트리밍 서비스를 한눈에 볼 수 없다는 문제를 해결했습니다. " +
                        "이러한 경험을 통해서 세상의 불편한 문제가 있으면 " +
                        "문제를 이해하고 해결하는 개발자가 되고 싶습니다."}
                    value={myContent}
                    onChange={(e) => update(page, e.target.value)}
                />
            </div>
        </div>
    )
}

export function Second({answer, page, update}) {
    const myContent = answer.find(ans => ans.id === page)?.content || "";

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                당신의 좌우명은 무엇인가요?
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%"
            }}>
                답변은 반드시 블로그에 작성된 내용과 일치할 필요는 없습니다.
                자유롭게 작성해주세요.
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "40%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <textarea
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"명으로 삼고자 합니다. " +
                        "소프트콘 뷰어십 프로젝트를 진행하며 스트리밍 서비스에 대한 " +
                        "새로운 해결책을 제시할 수 있었던 경험은 제게 어떤 상황에서도 " +
                        "포기하지 않고 도전하는 가치를 깊이 깨닫게 해주었습니다. " +
                        "이러한 신념을 바탕으로, 앞으로도 더 나은 서비스를 제공하기 위해 노력하고자 합니다."}
                    value={myContent}
                    onChange={(e) => update(page, e.target.value)}
                />
            </div>
        </div>
    )
}

export function Third({answer, page, update}) {
    const myContent = answer.find(ans => ans.id === page)?.content || "";

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                당신이 좋아하는 것은 무엇인가요?
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%"
            }}>
                답변은 반드시 블로그에 작성된 내용과 일치할 필요는 없습니다.
                자유롭게 작성해주세요.
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "40%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <textarea
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"문제를 정확하게 분석하여 해결하는 것을 좋아합니다. " +
                        "그래서 문제의 근본 원인을 파악하여 문제를 정의하기 위해 노력합니다."}
                    value={myContent}
                    onChange={(e) => update(page, e.target.value)}
                />
            </div>
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
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                당신이 잘하는 건 무엇인가요?
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%"
            }}>
                답변은 반드시 블로그에 작성된 내용과 일치할 필요는 없습니다.
                자유롭게 작성해주세요.
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "40%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <textarea
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"소셜리스닝을 잘 합니다. " +
                        "다양한 분야에 관심이 많아서 많은 사람의 의견에 귀를 기울이고, " +
                        "저만의 의견을 정립하려고 노력합니다."}
                    value={myContent}
                    onChange={(e) => update(page, e.target.value)}
                />
            </div>
        </div>
    )
}

export function Fifth({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "15%", fontSize: "1.5em",
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                인생의 변곡점은 무엇인가요?
                힘들었지만 극복했던 경험을 알려주세요
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%"
            }}>
                답변은 반드시 블로그에 작성된 내용과 일치할 필요는 없습니다.
                자유롭게 작성해주세요.
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "40%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <textarea
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"대학교 2학년 때, 학교 생활에 흥미를 느끼지 못하고 많이 방황했던 경험이 있습니다. " +
                        "하지만 서비스를 제작하는 과제를 진행하면서 몇날 며칠 밤을 세워가며 프로젝트를 완성했고," +
                        " 그 결과로 성공적으로 프로젝트를 마무리했습니다. 이 과정 덕분에 학교 생활에 대한 흥미를 되찾았습니다."}
                    value={myContent}
                    onChange={(e) => update(page, e.target.value)}
                />
            </div>
        </div>
    )
}