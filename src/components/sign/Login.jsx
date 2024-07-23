import React, { useEffect } from 'react';
import './Login.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

function Login() {
    const firebaseConfig = {
        apiKey: "AIzaSyDIIMXKdc0TSdBqSf1PlDsMAHC97Nbhxmw",
        authDomain: "f-money-8a633.firebaseapp.com",
        projectId: "f-money-8a633",
        storageBucket: "f-money-8a633.appspot.com",
        messagingSenderId: "379252633035",
        appId: "1:379252633035:web:ceaa239b534e003b9cda4e",
        measurementId: "G-91BPGENQZG"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
        const signupForm = document.getElementById("signup-form");

        const handleSubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const name = document.getElementById("name").value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email: email,
                    name: name
                });

                console.log("회원가입 성공", userCredential.user);
                document.getElementById('succes').innerText = '회원가입 성공!'
                document.getElementById('error').innerText = "";
                const inputs = document.getElementsByClassName('sginInput');
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].style.border = 'none'; // 원하는 스타일 속성 설정
                }
                setTimeout(() => {
                    window.location.href = './Sign'
                }, 2000);

            } catch (error) {
                console.error("회원가입 실패", error.message);
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                    document.getElementById('error').innerText = "이미 사용중인 아이디 입니다.";
                    const inputs = document.getElementsByClassName('sginInput');
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].style.border = '1px solid red'; // 원하는 스타일 속성 설정
                    }

                } else {
                    document.getElementById('error').innerText = "안타깝습니다. 회원가입이 안됩니다.";
                }

            }
        };

        signupForm.addEventListener("submit", handleSubmit);

        return () => {
            signupForm.removeEventListener("submit", handleSubmit);
        };
    }, [auth, db]);

    return (
        <div className="container">
            <h1 className='signHeader'>F-Money manager</h1>
            <form id='signup-form'>
                <h1>sign up</h1>
                <label htmlFor="email">이메일</label>
                <input type="email" placeholder='아이디' id='email' className='sginInput'/>
                <label htmlFor="password">비밀번호</label>
                <input type="password" placeholder='비밀번호' id='password' className='sginInput'/>
                <label htmlFor="name">이름</label>
                <input type="text" placeholder='이름' id='name' className='sginInput'/>
                <button type="submit" id='submit'>회원가입</button>
                <p id='error' style={{color:'red'}}></p>
                <p id='succes' style={{color: 'green'}}></p>
            </form>
        </div>
    );
}

export default Login;