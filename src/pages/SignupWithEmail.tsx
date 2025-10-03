import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './SignupWithEmail.css'; 

const SignupWithEmail: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7111/api/auth/register', {
        email,
        password
      });
      alert('Inscription réussie. Tu peux maintenant te connecter.');
      navigate('/login'); // Navigate to the login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      alert("Erreur lors de l'inscription.");
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="signup-container">
      <div className="left-panel">
        <div className="header">
          <img src="/path/to/tannit-logo.png" alt="Tannit Logo" className="logo" /> {/* Replace with actual logo path */}
        </div>

        <div className="signup-form-section">
          <button onClick={handleGoBack} className="go-back-button">
            <span className="arrow-icon">←</span> Go back
          </button>
          <h2>Sign up with your e-mail</h2>

          <form onSubmit={handleSubmit} className="email-signup-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <span className="input-icon">📧</span> {/* Email icon */}
                <input
                  type="email"
                  id="email"
                  placeholder="demo@moon.tn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Choose password</label>
              <div className="input-with-icon">
                <span className="input-icon">🔒</span> {/* Lock icon */}
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Minimum 8 characters..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8} // Enforce minimum length for the password
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'} {/* Eye icon to toggle visibility */}
                </span>
              </div>
              {password.length > 0 && password.length < 8 && (
                <p className="password-hint">Minimum 8 characters...</p>
              )}
            </div>

            <button type="submit" className="send-verification-button">
              Send verification code
            </button>
          </form>
        </div>
      </div>

      <div className="right-panel">
        {/* Re-using the ImageGallery component from the previous response */}
        <ImageGallery />
      </div>
    </div>
  );
};

// Re-using the ImageGallery component as it appears to be consistent across pages
const ImageGallery: React.FC = () => {
  return (
    <div className="image-gallery">
      <div className="gallery-item main-item">
        <img src="/path/to/business-people-image.jpg" alt="Business people" />
        <div className="overlay-card top-left">
          <span className="icon">📈</span>
          <span className="value">$B 10.78</span>
        </div>
      </div>
      <div className="gallery-item">
        <img src="/path/to/house-1.jpg" alt="House 1" />
      </div>
      <div className="gallery-item">
        <img src="/path/to/city-street.jpg" alt="City Street" />
      </div>
      <div className="gallery-item">
        <img src="/path/to/modern-building.jpg" alt="Modern Building" />
      </div>
      <div className="gallery-item">
        <img src="/path/to/apartment-building.jpg" alt="Apartment Building" />
        <div className="overlay-card bottom-right">
          <span className="icon">🌿</span>
          <span className="value">24.6 %</span>
        </div>
      </div>
      <div className="gallery-item">
        <img src="/path/to/woman-on-phone.jpg" alt="Woman on phone" />
      </div>
      <div className="gallery-item">
        <img src="/path/to/roof-top.jpg" alt="Roof top" />
      </div>
    </div>
  );
};

export default SignupWithEmail;