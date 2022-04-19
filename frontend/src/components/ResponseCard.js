import React from 'react'

export default function ResponseCard({response, count}) {
  return (
    <div className='response-card'>
      <h3>{response}</h3>
      <p>{count}</p>
    </div>
  )
}
