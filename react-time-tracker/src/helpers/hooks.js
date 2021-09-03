import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setWindowDimensions]);

    return windowDimensions;
}


export function useFormFields(init={}) {
    const [formData, setFormData] = useState(init);
    const handleChange = evt => setFormData(data => {
        return { ...data, [evt.target.name]: evt.target.value }
    });
    const resetForm = () => setFormData(init);
    return [formData, handleChange, resetForm];
}