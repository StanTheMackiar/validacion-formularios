import { useState, useEffect } from 'react';
import { helpHttp } from '../../helpers/helpHttp';

export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleChange = e => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }
        

    const handleSubmit = e => {
        e.preventDefault();
        handleChange(e);
        setErrors(validateForm(form));
        setIsSubmit(true)
    }

    useEffect(() => {
        if (isSubmit) {
            console.log(errors);
            if(Object.keys(errors).length === 0) {
                setLoading(true);
                helpHttp()
                .post(`https://formsubmit.co/ajax/callestanly@gmail.com`, {
                    body: form,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(res => {
                    if (res.success === "true") {
                        setResponse(true)
                    } else {
                        setResponse(false)
                    }
                    console.log(res);
                    setLoading(false);
                    setForm(initialForm)
                    setTimeout(()=> setResponse(null), 3000)
                })  
            }
            setIsSubmit(false);
        }
    }, [errors, form, initialForm, isSubmit]);
    

    return {
        form, errors, loading, response, handleChange, handleSubmit
    }
}

