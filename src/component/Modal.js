import ReactModal from "react-modal";
import '../App.css'

function Modal({ isOpen, onClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button className="modal-close" onClick={onClose}>
        X
      </button>
      <div className="modal-content">{children}</div>
    </ReactModal>
  );
}

export default Modal;
