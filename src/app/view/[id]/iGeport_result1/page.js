"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
export default function iGeport_result1() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const username = "Can";

    return (
        <div style={{backgroundColor: "#181818", color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{}}>
                <div style={{marginTop:'50px'}}>
                    <div>
                        <h2 style={{color:'white', fontSize: '24px'}}>{username} 님의 블로그를</h2>
                        <h2 style={{color:'white', fontSize: '24px'}}>분석했어요</h2>
                    </div>
                </div>
                <div style={{marginTop:'50px'}}>
                    <div>
                        <Image src={"/image/gc_sky.jpg"} width={400} height={100} alt={"logo"}/>
                        <br/>
                        <span style={{color : 'white'}}>하늘을 바라보며 가끔식은</span>
                    </div>
                    <div style={{marginTop:'50px'}}>
                        <Image src={"/image/거북이랑 수영을.png"} width={400} height={100} alt={"logo"}/>
                        <br/>
                        <span style={{color : 'white'}}>추억을 돌아보며 지친 마음을 </span>
                    </div>
                    <div style={{marginTop:'50px'}}>
                        <Image src={"/image/양자컴퓨터란...png"} width={400} height={100} alt={"logo"}/>
                        <br/>
                        <span style={{color : 'white'}}>너무 복잡한 인생이라 생각말고</span>
                    </div>
                    <div style={{marginTop:'50px'}}>
                        <Image src={"/image/울어라 지옥참마도...!.png"} width={400} height={100} alt={"logo"}/>
                        <br/>
                        <span style={{color : 'white'}}>이겨낼 수 있기를 바랍니다.</span>
                    </div>
                </div>
                <div style={ {display : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
                    <Link href={`/view/${id}/iGeport_result2`} as={`/view/${id}/iGeport_result2`}>
                        <button style={{color: '#0c0c0c', backgroundColor: '#1AE57C', padding: '10px 30px', borderRadius: '15px', width: '400px', fontWeight: 'bold', marginBottom:'30px'}}>다음으로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}