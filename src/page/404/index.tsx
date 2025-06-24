import { useEffect, useState } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import './index.scss';

function NotFound() {
    const error = useRouteError();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const [auto, setAuto] = useState(true);

    // 倒數自動跳轉
    useEffect(() => {
        if (!auto) return;
        if (countdown <= 0) {
            navigate('/');
            return;
        }
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, auto, navigate]);

    let title = '發生錯誤';
    let message = '';

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;
        message = error.data?.message || '';
    } else if (error instanceof Error) {
        message = error.message;
    }

    return (
        <div className="errorWrapper">
            <div className="errorCard">
                <h1 className="errorTitle">{title}</h1>
                {message && <p className="errorMessage">{message}</p>}
                <p className="errorCountdown">
                    若 {countdown} 秒內未操作，將自動回到首頁。
                </p>
                <div className="errorActions">
                    <button onClick={() => navigate(-1)} className="btnSecondary">
                        回上一頁
                    </button>
                    <button onClick={() => navigate('/')} className="btnPrimary">
                        回首頁
                    </button>
                    {auto && (
                        <button onClick={() => setAuto(false)} className="btnCancel">
                            取消自動跳轉
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}


export default NotFound
