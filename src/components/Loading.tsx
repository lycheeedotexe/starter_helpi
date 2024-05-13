import React from 'react';
import { Spinner } from 'react-bootstrap';

export const LoadingPage = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner animation="border" role="status">
                
            </Spinner>
            <p style={{ marginTop: '20px' }}>Loading...</p> {/* Static text */}
        </div>
    );
};


