import React, { useEffect, useState } from 'react'

import Notification from '../ui/notification'

import classes from './contact-form.module.css'

const sendContantData = async (contactDetails) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      email: contactDetails.email,
      name: contactDetails.name,
      message: contactDetails.message
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }
}

const ContactForm = () => {

  const [ enteredEmail, setEnteredEmail ] = useState('')
  const [ enteredName, setEnteredName ] = useState('')
  const [ enteredMessage, setEnteredMessage ] = useState('')
  const [ requestStatus, setRequestStatus ] = useState()
  const [ requestError, setRequestError ] = useState('')

  useEffect(() => {

    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setRequestError(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  const sendMessageHandler = async (event) => {

    event.preventDefault();

    // optional: add client-side validation

    setRequestStatus('pending')

    try {
      await sendContantData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage
      })
      setRequestStatus('success')
      setEnteredName('')
      setEnteredEmail('')
      setEnteredMessage('')
    } catch(error) {
      setRequestStatus('error')
      setRequestError(error.message)
    }
  }

  let notification

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!'
    }
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message successfully sent!'
    }
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='name'
              id='name'
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Message</label>
            <textarea
              rows='5'
              id='message'
              value={enteredMessage}
              onChange={(event) => setEnteredMessage(event.target.value)}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </div>
      </form>
      {notification && <Notification {...notification} /> }
    </section>
  )
}

export default ContactForm
