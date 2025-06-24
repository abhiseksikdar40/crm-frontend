import { useNavigate } from "react-router-dom"

export default function LoginPage() {

    const navigate = useNavigate()

    const loginHandler = () => {
        navigate('/dashboard');
    }
  return (
    <div className="login-container">
        <div className="login-bar">
                <h1 className="login-company-name">LeadNix.</h1>
        </div>
      <div className="login-left">
        <h1>Nothing converts <span className="highlight">alone</span>.</h1>
        <p>LeadNix brings your sales team together to close more deals efficiently.</p>
        <button onClick={loginHandler} >Login to your dashboard</button>
      </div>
    </div>
  );
}
