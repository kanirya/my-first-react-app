import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";


export default function Contact() {
    const{id}=useParams();

    const [keyPressed, setKeyPressed] = useState("");

    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeyPressed(`You pressed: ${e.key}`);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 className="text-white">Id  is: {id}</h2>
            <h2>Press any key on your keyboard</h2>
            <p style={{ fontSize: "24px", color: "blue" }}>{keyPressed}</p>
        </div>
    );
}


