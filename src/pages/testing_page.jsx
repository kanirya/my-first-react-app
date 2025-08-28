import React, {useEffect, useState} from 'react'



export default function Contact() {

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
            <h2>Press any key on your keyboard</h2>
            <p style={{ fontSize: "24px", color: "blue" }}>{keyPressed}</p>
        </div>
    );
}


