import React from 'react';
import { Spinner } from 'react-bootstrap';
import mascot from "../image assets/mascot ponder 2 2.png";

//loading animation
export const LoadingPage = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={mascot} alt="Mascot pondering" style={{ width: '200px', marginBottom: '20px' }} />
            <Spinner animation="border" role="status">
                
            </Spinner>
            <p style={{ marginTop: '20px',  fontFamily: 'Comic Sans MS, cursive' }}>The computer is computing</p> {/* Static text */}
        </div>
    );
};


