// pages/LoginCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";
import { fetchAccountMe } from "../store/accountSlice";
import { useAppDispatch } from "../store/hooks";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // <-- typé AppDispatch

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');
      
      if (error) {
        console.error('Erreur de connexion :', error);
        navigate('/login');
        return;
      }
      
      if (!code) {
        console.error('Pas de code trouvé dans les paramètres.');
        navigate('/login');
        return;
      }

      try {
        // Appel au backend pour échanger le code contre un accessToken
        const response = await axios.post("http://localhost:7111/connect/token", {
          code,
          state,
          redirectUri: 'http://localhost:3000/callback' // doit matcher avec le registered redirect_uri côté IdentityServer
        });

        const { token, isNew } = response.data;

        if (token) {
          dispatch(setToken(token));
          //dispatch(fetchAccountMe());
          navigate("/ProfileCreatedPage");
        } else {
          console.error('Pas de accessToken reçu');
          navigate('/login');
        }
      } catch (err) {
        console.error('Erreur lors de l’appel au backend :', err);
        navigate('/login');
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Connexion en cours...</p>
    </div>
  );
};

export default Callback;
