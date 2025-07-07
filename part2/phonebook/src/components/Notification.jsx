const Notification = ({ successMessage, errorMessage }) => {
  if (!successMessage && !errorMessage) return null
  
  return (
    <div className={successMessage ? 'success' : 'error'}>
      {successMessage || errorMessage}
    </div>
  )
}

export default Notification