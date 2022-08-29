import React from 'react'



const Message = ({msg, color}) => {

    const styles ={
        color: color,
        padding: "0.5rem",
        borderRadius: "0.2rem",
    }

  return (
    <p style={styles}>{msg}</p>
  )
}

export default Message