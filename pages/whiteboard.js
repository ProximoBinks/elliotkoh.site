import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const WhiteboardPage = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const getEventPosition = (e) => {
        if (e.touches) {
            const { clientX, clientY } = e.touches[0];
            const { left, top } = canvasRef.current.getBoundingClientRect();
            return { offsetX: clientX - left, offsetY: clientY - top };
        } else {
            return { offsetX: e.offsetX, offsetY: e.offsetY };
        }
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { offsetX, offsetY } = getEventPosition(e);

        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { offsetX, offsetY } = getEventPosition(e);

        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.closePath();
        setIsDrawing(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth - 20;
        canvas.height = window.innerHeight - 20;

        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Adding both mouse and touch event listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseleave', stopDrawing);

            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', stopDrawing);
        };
    }, []);

    return (
        <>
            <Head>
                <title>White Board — Elliot Koh</title>
                <meta name="theme-color" content="#2121ff"/>
            </Head>
            <div className="p-10 bg-white min-h-screen">
                <canvas ref={canvasRef} className="bg-gray-100 border-2 border-gray-300" />
            </div>
        </>
    );
};

export default WhiteboardPage;
