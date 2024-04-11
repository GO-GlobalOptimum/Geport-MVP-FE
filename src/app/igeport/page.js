"use client"
import {useRouter} from "next/navigation";
import {Fira_Sans} from "next/dist/compiled/@next/font/dist/google";
import { useEffect, useState } from "react";

export default function iGeport() {
    const router = useRouter();
    const [paging, setPaging] = useState(0);
    const [isInfo, setIsInfo] = useState(true);
    const [answer, setAnswer] = useState([]);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const loadedAnswers = [];
        for (let i = 1; i <= 5; i++) {
            const content = localStorage.getItem(`iGeport-answer-${i}`) || "";
            loadedAnswers.push({ id: i, content });
        }
        setAnswer(loadedAnswers);
        console.log("Answers loaded:", loadedAnswers);
    }, []);

    useEffect(() => {
        const isPage = paging >= 1 && paging <= 5;
        setIsInfo(!isPage);
        const pageContent = answer.find(ans => ans.id === paging)?.content || "";
        setIsValid(pageContent !== "" || !isPage);
        console.log(`Current page: ${paging}, Is valid: ${isValid}`);
    }, [paging, answer, isValid]);

    const update = (id, newContent) => {
        const updatedAnswers = answer.map(ans =>
            ans.id === id ? { ...ans, content: newContent } : ans
        );
        setAnswer(updatedAnswers);
        localStorage.setItem(`iGeport-answer-${id}`, newContent);
        console.log(`Updated answer ${id}: ${newContent}`);
    };

    const pageComponent = (page) => {
        switch (page) {
            case 1:
                return <First answer={answer} page={page} update={update} />;
            case 2:
                return <Second answer={answer} page={page} update={update} />;
            case 3:
                return <Third answer={answer} page={page} update={update} />;
            case 4:
                return <Fourth answer={answer} page={page} update={update} />;
            case 5:
                return <Fifth answer={answer} page={page} update={update} />;
            default:
                return <Information />;
        }
    };

    const nextButtonHandler = () => {
        if (paging > 4) {
            for (let i = 1; i <= 5; i++) {
                const storedAnswer = localStorage.getItem(`iGeport-answer-${i}`);
                console.log(`Answer ${i}: ${storedAnswer}`);
            }
            router.refresh();
            router.push('/user-info');
        } else {
            setPaging(prev => prev + 1);
        }
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
            <div style={{ width: "100%", height: "10%", marginTop: "5%" }}>
                <div style={{ width: "15%", height: "100%" }}>
                    <button style={{ fontSize: "1.8em" }} onClick={() => {
                        if (paging < 1) {
                            router.refresh();
                            router.push('/igeport/link');
                        } else {
                            setPaging(prev => prev - 1)
                        }
                    }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 30L21 24L27 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                                height: '9px',
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
                width: "91%",
                height: "7.5%",
                backgroundColor: isValid ? "#1AE57C" : "#363636",
                borderRadius: "10px",
                margin: "4.5%",
                marginBottom: "15%",
                color: isValid ? "black" : "#C6C6C6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: isValid ? "auto" : "none",
                opacity: isValid ? 1 : 0.5,
                fontSize: "1.2em"
            }}
                 onClick={nextButtonHandler}>
                다음으로
            </div>
        </div>
    );
}
// Component definitions for First, Second, Third, Fourth, and Fifth remain the same

export function Information() {
    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "15%", fontSize: "1.6em",
                marginBottom: "5%", paddingLeft: "5%", paddingRight: "5%"}}>
                다음 질문은 당신의 성향을 파악하기 위한 질문입니다.
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
                다음 질문의 답변과 첨부해주신 블로그의 내용을 바탕으로 iGeport를 작성합니다.
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
                제시해드리는 선지 중 자신과 가장 가까운 것을 선택해주세요.
            </div>
        </div>
    )
}

export function First({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";
    const options = ['나는 상상력이 풍부하다.', '나는 예술적 경험을 중요하게 생각한다.','나는 아이디어를 떠올리는 일을 즐긴다.']

    // 라디오 버튼 하나의 높이 (픽셀 단위)
    const radioButtonHeight = 80;

    // 라디오 버튼 그룹 전체의 높이 계산
    const radioGroupHeight = options.length * radioButtonHeight;

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.4em",
                marginBottom: "20px" , paddingLeft: "4%", paddingRight: "4%"}}>
                다음 중 자신과 가장 가까운 것을 <br/>선택해주세요
            </div>
            <div style={{
                width: "96%",
                height: "12.5%",
                fontSize: "0.9rem",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "4%",
                paddingRight: "4%",
                paddingBottom:"4%"
            }}>
                iGeport는 당신의 심리를 심층적으로 분석합니다.<br/>
                몇 가지 질문에 대답해주세요<br/>
            </div>
            <div style={{
                justifyContent: "center",
                width: "90%",
                marginLeft: "5%",
                height: `${radioGroupHeight}px`, // 여기에서 컨테이너의 높이를 조절합니다.
                backgroundColor: "#363636",
                color: "#C6C6C6",
                borderRadius: "10px",
                padding: "2%",
                display: 'flex',
                flexDirection: 'column',
                fontSize: '20px'
            }}>
                <span style={{fontSize: '1.0rem'}}>
                    {options.map((option, index) => (
                        <label key={index}
                               style={{height: `${radioButtonHeight}px`, display: 'flex', alignItems: 'center'}}>
                            <input
                                type="radio"
                                name="myRadioGroup"
                                value={option}
                                checked={myContent === option}
                                onChange={(e) => update(page, e.target.value)}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    accentColor: '#C6C6C6',
                                    marginRight: '10px',
                                    marginLeft: '10px'
                                }}
                            />
                            {option}
                        </label>
                    ))}
                </span>
            </div>
        </div>
)
}

export function Second({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";
    const options = ['나는 목표를 달성하기 위해 노력하고, 포기하지 않는다.', '나는 업무나 과제를 미루는 경향이 있다.']

    // 라디오 버튼 하나의 높이 (픽셀 단위)
    const radioButtonHeight = 65;

    // 라디오 버튼 그룹 전체의 높이 계산
    const radioGroupHeight = options.length * radioButtonHeight;

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.4rem",
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                다음 중 자신과 가장 가까운 것을 선택해주세요
            </div>
            <div style={{
                width: "96%",
                height: "12.5%",
                fontSize: "1.0rem",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingBottom:"5%"
            }}>
                iGeport는 당신의 심리를 집중적으로 분석합니다. <br/>
                몇 가지 질문에 대답해주세요<br/>
            </div>
            <div style={{
                justifyContent: "center",
                width: "90%",
                marginLeft: "5%",
                height: `${radioGroupHeight}px`, // 여기에서 컨테이너의 높이를 조절합니다.
                backgroundColor: "#363636",
                color: "#C6C6C6",
                borderRadius: "10px",
                padding: "2%",
                display: 'flex',
                flexDirection: 'column',
            }}>
                <span style={{fontSize:'1.0rem'}}>
                {options.map((option, index) => (
                    <label key={index} style={{ height: `${radioButtonHeight}px`, display: 'flex', alignItems: 'center'}}>
                        <input
                            type="radio"
                            name="myRadioGroup"
                            value={option}
                            checked={myContent === option}
                            onChange={(e) => update(page, e.target.value)}
                            style={{ width:'20px', height:'20px',accentColor: '#C6C6C6', marginRight: '10px', marginLeft: '10px'}}
                        />
                        {option}
                    </label>
                ))}
                </span>
            </div>
        </div>
    )
}


export function Third({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";
  //  const options = ['나는 상상력이 풍부하다.', '나는 예술적 경험을 중요하게 생각한다.','나는 아이디어를 떠올리는 일을 즐긴다.']
    const options = ['나는 사회적 활동에 참여하는 것을 피하곤 한다.','나는 타인과의 상호작용에서 활력을 얻는다.']
    // 라디오 버튼 하나의 높이 (픽셀 단위)
    const radioButtonHeight = 80;

    // 라디오 버튼 그룹 전체의 높이 계산
    const radioGroupHeight = options.length * radioButtonHeight;

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.4rem",
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                다음 중 자신과 가장 가까운 것을 선택해주세요
            </div>
            <div style={{
                width: "96%",
                height: "12.5%",
                fontSize: "1.0rem",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingBottom:"5%"
            }}>
                iGeport는 당신의 심리를 집중적으로 분석합니다. <br/>
                몇 가지 질문에 대답해주세요<br/>
            </div>
            <div style={{
                justifyContent: "center",
                width: "90%",
                marginLeft: "5%",
                height: `${radioGroupHeight}px`, // 여기에서 컨테이너의 높이를 조절합니다.
                backgroundColor: "#363636",
                color: "#C6C6C6",
                borderRadius: "10px",
                padding: "2%",
                display: 'flex',
                flexDirection: 'column',
                fontSize:'20px'
            }}>
                <span style={{fontSize:'1.0rem'}}>
                {options.map((option, index) => (
                    <label key={index} style={{ height: `${radioButtonHeight}px`, display: 'flex', alignItems: 'center'}}>
                        <input
                            type="radio"
                            name="myRadioGroup"
                            value={option}
                            checked={myContent === option}
                            onChange={(e) => update(page, e.target.value)}
                            style={{ width:'20px', height:'20px',accentColor: '#C6C6C6', marginRight: '10px', marginLeft: '10px'}}
                        />
                        {option}
                    </label>
                ))}
                </span>
            </div>
        </div>
    )
}

export function Fifth({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";
   // const options = ['', '나는 예술적 경험을 중요하게 생각한다.','나는 아이디어를 떠올리는 일을 즐긴다.']
    const options = ['나는 종종 스트레스나 불안을 느낀다.','나는 감정 상태가 자주 바뀌는 편이다.']
    // 라디오 버튼 하나의 높이 (픽셀 단위)
    const radioButtonHeight = 65;

    // 라디오 버튼 그룹 전체의 높이 계산
    const radioGroupHeight = options.length * radioButtonHeight;

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.4rem",
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                다음 중 자신과 가장 가까운 것을 선택해주세요
            </div>
            <div style={{
                width: "96%",
                height: "12.5%",
                fontSize: "1.0rem",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingBottom:"5%"
            }}>
                iGeport는 당신의 심리를 집중적으로 분석합니다. <br/>
                몇 가지 질문에 대답해주세요<br/>
            </div>
            <div style={{
                justifyContent: "center",
                width: "91%",
                marginLeft: "4.5%",
            //    margin: "4.5%",
                height: `${radioGroupHeight}px`, // 여기에서 컨테이너의 높이를 조절합니다.
                backgroundColor: "#363636",
                color: "#C6C6C6",
                borderRadius: "10px",
                padding: "2%",
                display: 'flex',
                flexDirection: 'column',
                fontSize:'20px'
            }}>
                <span style={{fontSize:'1.0rem'}}>
                {options.map((option, index) => (
                    <label key={index} style={{ height: `${radioButtonHeight}px`, display: 'flex', alignItems: 'center'}}>
                        <input
                            type="radio"
                            name="myRadioGroup"
                            value={option}
                            checked={myContent === option}
                            onChange={(e) => update(page, e.target.value)}
                            style={{ width:'20px', height:'20px',accentColor: '#C6C6C6', marginRight: '10px', marginLeft: '10px'}}
                        />
                        {option}
                    </label>
                ))}
                </span>
            </div>
        </div>
    )
}

export function Fourth({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";
    //  const options = ['나는 상상력이 풍부하다.', '나는 예술적 경험을 중요하게 생각한다.','나는 아이디어를 떠올리는 일을 즐긴다.']
    const options = ['나는 타인과의 관계에서 양보하는 편이다.', '나는 다른 사람과의 관계에 있어서 타인을 많이 생각하는 편이다.',
        '나는 아이디어를 떠올리는 일을 즐긴다. ']
    // 라디오 버튼 하나의 높이 (픽셀 단위)
    const radioButtonHeight = 80;

    // 라디오 버튼 그룹 전체의 높이 계산
    const radioGroupHeight = options.length * radioButtonHeight;

    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.4rem",
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                다음 중 자신과 가장 가까운 것을 선택해주세요
            </div>
            <div style={{
                width: "96%",
                height: "12.5%",
                fontSize: "1.0rem",
                marginBottom: "5%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingBottom:"5%"
            }}>
                iGeport는 당신의 심리를 집중적으로 분석합니다. <br/>
                몇 가지 질문에 대답해주세요<br/>
            </div>
            <div style={{
                justifyContent: "center",
                width: "90%",
                marginLeft: "5%",
                height: `${radioGroupHeight}px`, // 여기에서 컨테이너의 높이를 조절합니다.
                backgroundColor: "#363636",
                color: "#C6C6C6",
                borderRadius: "10px",
                padding: "2%",
                display: 'flex',
                flexDirection: 'column',
                fontSize:'20px'
            }}>
                <span style={{fontSize:'1.0rem'}}>
                {options.map((option, index) => (
                    <label key={index} style={{ height: `${radioButtonHeight}px`, display: 'flex', alignItems: 'center'}}>
                        <input
                            type="radio"
                            name="myRadioGroup"
                            value={option}
                            checked={myContent === option}
                            onChange={(e) => update(page, e.target.value)}
                            style={{ width:'20px', height:'20px',accentColor: '#C6C6C6', marginRight: '10px', marginLeft: '10px'}}
                        />
                        {option}
                    </label>
                ))}
                </span>
            </div>
        </div>
    )
}