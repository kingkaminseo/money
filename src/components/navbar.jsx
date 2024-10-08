import { useState } from "react";
import Modal from 'react-modal';

function Navber() {


    const [close, setClose] = useState("none");
    const [open, setOpen] = useState(false);
    const [home, setHome] = useState(false);

    function oopen(e) {
        e.preventDefault();
        setClose(close === "none" ? "block" : "none");
    }

    function toggleModal() {
        setOpen(prevOpen => !prevOpen);
    }

    function homeModal() {
        setHome(prevHome => !prevHome);
    }

    function logOut() {
        localStorage.clear();
        window.location.href = './sign';
    }

    return (
        <div className="header">
            <h1>F-Money Manager</h1>
            <p>친구들과의 돈 관리를 간편하게
                <div style={{position: 'fixed', right: '100px', top: '60px', cursor: 'pointer', backgroundColor: 'white', marginBottom: '10px',
                    boxShadow: '0px 5px 10px 0.1px #e0e0e0', padding: '10px', borderRadius: '15px', zIndex: '99'}}>
                    <i style={{textAlign: 'right'}}><a href="#" onClick={oopen} >{localStorage.getItem('userName') + `님`} ▿</a></i>
                    <div style={{display: close, borderRadius: '10px', cursor: 'pointer', marginTop: '10px'}}>
                        <div style={{border: '0.5px solid black', marginBottom: '10px'}}></div>
                        <a href="#" onClick={homeModal} style={{color: 'black', textDecoration: 'none', color: '#3f3f3f', fontSize: '18px'}}>
                            홈으로
                        </a>
                    </div>
                    <div style={{display: close, borderRadius: '10px', cursor: 'pointer', marginTop: '10px'}}>
                        <div style={{border: '0.5px solid black', marginTop: '10px', marginBottom: '15px'}}></div>
                        <a href="#" onClick={toggleModal} style={{color: 'black', textDecoration: 'none', color: '#3f3f3f', fontSize: '18px', marginBottom: '10px'}}>
                            로그아웃
                        </a>
                    </div>
                </div>
            </p>
            <Modal
                isOpen={home}
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
                onRequestClose={homeModal}
            >
                <div className="modal-header">
                    홈으로
                </div>
                <div className="modal-body">
                    <p>홈으로 이동하시겠습니까?</p>
                </div>
                <div className="modal-footer">
                    <button className="close-button" onClick={() => window.location.href = './'}>확인</button>
                    <button className="open-button" onClick={homeModal}>닫기</button>
                </div>
            </Modal>
            <Modal
                isOpen={open}
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
                onRequestClose={toggleModal}
            >
                <div className="modal-header">
                    로그아웃
                </div>
                <div className="modal-body">
                    <p>로그아웃을 진행하시겠습니까?</p>
                </div>
                <div className="modal-footer">
                    <button className="close-button" onClick={logOut}>확인</button>
                    <button className="open-button" onClick={toggleModal}>닫기</button>
                </div>
            </Modal>
        </div>
    );
}

export default Navber;
