"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function Geport_result1() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const username = "Can";
    return (
        <div style={{backgroundColor: "#181818", height: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                <div style={{marginTop:'50px'}}>
                    <div>
                        <h2 style={{color:'white', fontSize: '24px'}}>{username} 님은</h2>
                        <h2 style={{color:'white', fontSize: '24px'}}>이런 사람이 되고 싶어해요</h2>
                    </div>
                </div>
                <div style={{marginTop:'50px'}}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '100%', left: 0, wordWrap: 'break-word', color: 'white', marginTop: '10px' }}>
                            Lorem ipsum dolor sit amet consectetur. Amet pharetra consequat diam nunc eget accumsan fermentum enim quam. Convallis scelerisque pellentesque mi commodo in. Nulla nunc cursus ullamcorper amet aliquam diam turpis tempus nunc. Faucibus venenatis neque morbi amet leo diam.
                        </div>
                    </div>
                </div>
                <div style={ {display : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '300px'}}>
                    <Link href={`/view/${id}/Geport_result2`} as={`/view/${id}/Geport_result2`}>
                        <button style={{color: '#0c0c0c', backgroundColor: '#1AE57C', padding: '10px 30px', borderRadius: '15px', width: '400px', fontWeight: 'bold', marginBottom:'30px'}}>다음으로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}