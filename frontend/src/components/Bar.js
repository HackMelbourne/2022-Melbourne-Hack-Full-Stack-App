import React from 'react'

export default function Bar({response, count}) {
  const barStyle = {
    width: "5rem",
    height: `${count}rem`,
    backgroundColor: "#04AA6D"
  }
  return (
    <div className="bar-container">
      <p>{response}</p>
      <div style={barStyle}></div>
    </div>
  )
}
