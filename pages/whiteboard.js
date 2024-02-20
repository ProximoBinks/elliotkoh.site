import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const WhiteboardPage = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        const startDrawing = (e) => {
            const { offsetX, offsetY } = getEventPosition(canvas, e);
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            setIsDrawing(true);
        };

        const draw = (e) => {
            if (!isDrawing) return;
            const { offsetX, offsetY } = getEventPosition(canvas, e);
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        };

        const stopDrawing = () => {
            setIsDrawing(false);
        };

        const handleMouseLeave = () => {
            if (isDrawing) {
                stopDrawing();
                ctx.closePath();
            }
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', stopDrawing);
        };
    }, [isDrawing]);

    const getEventPosition = (canvas, e) => {
        if (e.touches && e.touches.length) {
            const { clientX, clientY } = e.touches[0];
            const { left, top } = canvas.getBoundingClientRect();
            return { offsetX: clientX - left, offsetY: clientY - top };
        } else {
            return { offsetX: e.offsetX, offsetY: e.offsetY };
        }
    };

    return (
        <>
            <Head>
                <title>White Board</title>
                <meta name="theme-color" content="#2121ff" />
            </Head>
            <div className="p-10 bg-white min-h-screen">
                <canvas ref={canvasRef} className="bg-gray-100 border-2 border-gray-300" />
            </div>
        </>
    );
};

export default WhiteboardPage;
