import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Header() {
  const [showLoginModel, setShowLoginModel] = useState(false);
  const navigate = useNavigate(); 

  const handleOpenModal = () => setShowLoginModel(prev => !prev);

  const handleLogout = () => {
    
    navigate("/login");
  };

  return (
    <div className="header-container">
      <div className="tag">
        <p>Turn Leads into Loyalty with Leadnix.</p>
      </div>
      <div className="userid">
        <img src="/User-img.jpg" alt="Profile" className="profile-img" />
        <div className="user-info">
          <p className="user-name">Roger</p>
          <p className="user-role">Lead Manager</p>
        </div>
        <img
          src="/down-arrow.svg"
          alt="Dropdown"
          className="dropdown-icon"
          onClick={handleOpenModal}
        />
      </div>

      {showLoginModel && (
        <div className="logout-popup">
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>Log Out</span><img src="/Logout.svg" alt="logout" />
        </div>
      )}
    </div>
  );
}
