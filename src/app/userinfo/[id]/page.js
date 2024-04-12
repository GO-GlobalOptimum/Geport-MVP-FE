"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Fira_Sans} from "next/dist/compiled/@next/font/dist/google";

export default function Userinfo(props){
    const [userInfo, setUserInfo] = useState({
        name: "",
        bio: "",
        mbti: "",
        age: "",
        gender: "",
        phone: ""
    });

    const [id_port, setIdPort] = useState(parseInt(props.params.id));
    const router = useRouter();
    const [paging, setPaging] = useState(0);
    const [isInfo, setIsInfo] = useState(true);
    const [answer, setAnswer] = useState([
        {id : 1, content: ""}, {id : 2, content: ""}, {id : 3, content: ""}, {id : 4, content: ""}, {id : 5, content: ""}, {id : 6, content: ""}
    ]);
    const [isVaild, setIsVaild] = useState(false);

    const handleGenerateGeport = () => {
        // 로컬 스토리지에 각각의 데이터를 별도의 키로 저장
        localStorage.setItem('name', answer.find(ans => ans.id === 1)?.content || "");
        localStorage.setItem('bio', answer.find(ans => ans.id === 2)?.content || "");
        localStorage.setItem('mbti', answer.find(ans => ans.id === 3)?.content || "");
        localStorage.setItem('age', answer.find(ans => ans.id === 4)?.content || "");
        localStorage.setItem('gender', answer.find(ans => ans.id === 5)?.content || "");
        localStorage.setItem('phone', answer.find(ans => ans.id === 6)?.content || "");

    }

    const initAnswer = ()=>{
        setAnswer([
            {id : 1, content: localStorage.getItem('name')},
            {id : 2, content: localStorage.getItem('bio')},
            {id : 3, content: localStorage.getItem('mbti')},
            {id : 4, content: localStorage.getItem('age')},
            {id : 5, content: localStorage.getItem('gender')},
            {id : 6, content: localStorage.getItem('phone')}
        ]);
    }

    useEffect(()=>{
        console.log(id_port)
        initAnswer();
        if (id_port === 1){ // geport : igeport 로그 삭제
            localStorage.removeItem("igeport-answer")
            localStorage.removeItem("igeport-link")
        }
        else{ // igeport : geport 로그 삭제
            localStorage.removeItem("geport-answer")
            localStorage.removeItem("geport-link")
        }


    },[]);

    useEffect(() => {
        const isPage = paging >= 1 && paging <= 6;
        setIsInfo(!isPage);
        const pageContent = answer.find(ans => ans.id === paging)?.content || "";
        const isContent = pageContent !== ""
        setIsVaild(isContent || !isPage);
        if (paging === 2) {
            setIsVaild(true);
        }
    }, [paging, answer]);

    const update = (id, newContent) => {
        let updatedContent = newContent;
        // 페이지가 6페이지(전화번호 입력 페이지)이면 전화번호를 정규화하여 저장
        if (id === 6) {
            updatedContent = newContent.replace(/\D/g, ""); // 숫자 이외의 문자는 제거
            console.log(updatedContent);
        }
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
            case 6:
                return (
                    <Six answer={answer} page={page} update={update}/>
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
                            router.push('/onboarding');
                        } else {
                            setPaging(prev => prev - 1)
                        }
                    }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 30L21 24L27 18" stroke="white" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            {pageComponent(paging)}

            {isInfo ? <div style={{display: 'flex', justifyContent: 'center', gap: '8px', margin: '25px 0'}}></div> :
                <div style={{display: 'flex', justifyContent: 'center', gap: '8px', margin: '20px 0'}}>
                    {Array.from({length: 6}, (_, index) => (
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
                     if (paging === 6) {
                         handleGenerateGeport();
                         if (id_port === 1) {
                             router.refresh();
                             router.push('/view/Geport_view'); // 다음 페이지로 이동하자
                         }
                         else {
                             router.refresh();
                             router.push('/view/iGeport_view');
                         }
                     }
                     else{
                         setPaging(prev => prev + 1)
                     }
                 }}>
                {paging === 6 ? "Geport 생성하기" : "다음으로"}
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
                마지막 단계입니다.<br/>
                당신의 기본 정보를 알려주세요.
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
                이름, 성격, 나이, 성별, 전화번호 등
                Geport에 들어갈 5가지 기본 정보를 입력해주세요.
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
                모두 작성하신 후 Geport가 완성되면 Geport를 열람할 수 있는 히든코드를 기재해주신 전화번호로 전달해드립니다.
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
                Geport가 당신을 어떻게 부르면 좋을까요?
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
                Geport 첫 페이지에 들어갈 이름입니다.
            </div>
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "7%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <input
                    type="text"
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"이름을 입력해주세요."}
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
                당신의 소개글을<br/>한 문장으로 알려주세요.
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
                Geport 첫 페이지에 들어갈 이름입니다.<br/>작성하지 않으셔도 괜찮습니다.
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "7%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <input
                    type="text"
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"예 : 성장하는 개발자"}
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
                당신의 MBTI는 무엇인가요?
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
                Geport를 작성하는 데 참고할 정보입니다.
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "7%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <input
                    type="text"
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"MBTI를 입력해주세요."}
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
                당신의 나이를 알려주세요.
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
                Geport를 작성하는 데 참고할 정보입니다.<br/>
                만 나이로 알려주세요.
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "7%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <input
                    type="text"
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"나이를 알려주세요."}
                    value={myContent}
                    onChange={(e) => update(page, e.target.value)}
                />
            </div>
        </div>
    )
}

export function Fifth({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";
    const options = ['남자','여자','밝히지 않음']
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
                당신의 성별은 무엇인가요?
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
                Geport를 작성하는 데 참고할 정보입니다.
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

export function Six({answer, page, update}){
    const myContent = answer.find(ans => ans.id === page)?.content || "";
    return (
        <div style={{
            height: '100vh'
        }}>
            <div style={{width: "100%", height: "10%", fontSize: "1.5em",
                marginBottom: "20px" , paddingLeft: "5%", paddingRight: "5%"}}>
                마지막 단계입니다.<br/>
                전화번호를 알려주세요.
            </div>
            <div style={{
                width: "100%",
                height: "10%",
                fontSize: "1em",
                marginBottom: "10%",
                color: "#C6C6C6",
                paddingLeft: "5%",
                paddingRight: "5%",
            }}>
                Geport가 생성되면 이 전화번호로 히든코드를 보내드릴거에요.<br/>
                정확한 정보를 입력했는지 꼼꼼하게 확인해 주세요.
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%", marginLeft: "5%", height: "7%",
                backgroundColor: "#363636",
                color: "black", borderRadius: "10px"
            }}>
                <input
                    type="text"
                    style={{
                        backgroundColor: "#363636",
                        color: "#C6C6C6", borderRadius: "10px",
                        width : "100%", height : "100%", padding : "2%"
                    }}
                    placeholder={"전화번호를 알려주세요."}
                    value={myContent}
                    onChange={(e) => update(page, e.target.value)}
                />
            </div>
        </div>
    )
}