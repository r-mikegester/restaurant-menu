import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';

const ToastNotifications: React.FC = () => {
    return (
        <ToastContainer
        position="bottom-center"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Slide}
        />
    );
};

export default ToastNotifications;
