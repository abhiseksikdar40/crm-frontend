export default function SuccessPopup({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="close-btn" onClick={onClose}>X</button>
        <p className="success-message">✅ {message}</p>
      </div>
    </div>
  );
}
