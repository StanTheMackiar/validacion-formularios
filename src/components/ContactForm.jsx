import { TextField, Button, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import './ContactForm.css'
import { useForm } from './hooks/useForm';
import Message from './Message';


const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
const regexSubject = /^.{1,50}$/;
const regexComments = /^.{1,255}$/;

const initialForm = {
    name: "",
    email: "",
    subject: "",
    comments: "",
};

const validateForm = (form) => {
    let errors = {}

    if(!form.name.trim()) errors.name = 'El campo "Nombre" es requerido';
    else if(!regexName.test(form.name.trim())) errors.name = 'Este campo solo acepta letras y espacios en blanco';

    if(!form.email.trim()) errors.email = 'El campo "Correo" es requerido';
    else if(!regexEmail.test(form.email.trim())) errors.email = 'Ingrese un email valido';

    if(!form.subject.trim()) errors.subject = 'El campo "Asunto" es requerido';
    else if(!regexSubject.test(form.subject.trim())) errors.subject = 'Este campo admite maximo 50 caracteres';

    if(!form.comments.trim()) errors.comments = 'El campo "Comentario" es requerido';
    else if(!regexComments.test(form.comments.trim())) errors.comments = 'Este campo admite maximo 255 caracteres';

    
    return errors
}


// Componente
const ContactForm = () => {

    const { 
        form, 
        errors, 
        loading, 
        response, 
        handleChange, 
        handleSubmit 
    } = useForm(initialForm, validateForm);

  return (
    <Box component="div">
        <h2>Formulario de contacto</h2>
        <Box component="form" onSubmit={handleSubmit} className='Form'>
            {/* Nombre */}
            <TextField
            label="Nombre"
            type="text" 
            name="name"
            variant="standard"
            onChange={handleChange}
            value={form.name}
            margin="dense"
            color='secondary'
            helperText={errors.name && errors.name}
            error={errors.name && true}
            />
            {/* Correo */}
            <TextField 
            type="text"
            name="email"
            label="Correo electronico" 
            variant="standard"
            onChange={handleChange}
            value={form.email}
            margin="dense"
            color='secondary'
            helperText={errors.email && errors.email}
            error={errors.email && true}

            />
            {/* Asunto */}
            <TextField 
            type="text"
            name="subject"
            label="Asunto" 
            variant="standard"
            onChange={handleChange}
            value={form.subject}
            margin="dense"
            color='secondary'
            helperText={errors.subject && errors.subject}
            error={errors.subject && true}
            />
            {/* Comentario */}
            <TextField 
            type="text"
            name="comments"
            label="Comentario" 
            placeholder="Escribe tu comentario..."
            variant="outlined"
            multiline
            rows={3}
            onChange={handleChange}
            value={form.comments}
            margin="normal"
            color='secondary'
            helperText={errors.comments && errors.comments}
            error={errors.comments && true}
            />
            {/* Boton Enviar */}
            <Button 
            type="submit" 
            variant='contained'
            margin="normal"
            color='secondary'
            >Enviar</Button>
            {loading && <LinearProgress color="secondary"  sx={{margin:"0.5rem"}}/>}
            {response === true && <Message color={"green"} msg={"Los datos fueron enviados exitosamente"}/>}
            {response === false && <Message color={"red"} msg={"No se pudo enviar el mensaje"}/>}
        </Box>
    </Box>
  )
}

export default ContactForm