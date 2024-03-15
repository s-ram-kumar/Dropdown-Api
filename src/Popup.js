import React from 'react';

function Popup({ showPopup, setShowPopup, children }) {
  return (
    <>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            {children}
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
