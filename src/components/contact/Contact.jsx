import React, { useState } from 'react'
import './contact.css'
import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import axios from 'axios';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const status = () => {
  toast.success('Message sent successfully!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
}

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = 'service_rn8gjum';
    const templateId = 'template_5k39wbo';
    const publicKey = 'sdjCu7Xr4WTle9KbE';

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        name: name,
        email: email,
        message: message,
        reply_to: 'noreply@hcmut.edu.vn',
      }
    };

    try {
      const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      console.log(res.data);
      setName('');
      setEmail('');
      setMessage('');
      status();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className='contact__option'>
            <MdOutlineEmail className='contact__option-icon' />
            <h4>Email</h4>
            <h5>tungnd.goat@gmail.com</h5>
            <a href="mailto:tungnd.goat@gmail.com" target="_blank" rel="noopener noreferrer">Send a message</a>
          </article>
          <article className='contact__option'>
            <RiMessengerLine className='contact__option-icon' />
            <h4>Messenger</h4>
            <h5>Nguyễn Duy Tùng</h5>
            <a href="https://m.me/nguyenduytung259" target="_blank" rel="noopener noreferrer">Send a message</a>
          </article>
          <article className='contact__option'>
            <BsWhatsapp className='contact__option-icon' />
            <h4>WhatsApp</h4>
            <h5>+84 354304095</h5>
            <a href="https://api.whatsapp.com/send?phone+84354304095" target="_blank" rel="noopener noreferrer">Send a message</a>
          </article>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Your Full Name' value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <textarea rows="7" placeholder='Your Message' value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          <button type="submit" className='btn btn-primary'>Send Message</button>
          <ToastContainer />
        </form>
      </div>
    </section>
  )
}

export default Contact