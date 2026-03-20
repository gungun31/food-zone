import React from 'react'

const Popup = ({ show, message, type }) => {
  if (!show) return null;

  const styles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: type === 'remove' ? '#ff4444' : '#4CAF50',
    color: 'white',
    padding: '15px',
    borderRadius: '5px',
    zIndex: 1000
  };

  return (
    <div style={styles}>
      {message}
    </div>
  )
}

export default Popup