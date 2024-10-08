import { Form } from "../components/Form";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        user.getIdToken().then((token) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: token,
            })
          );
          navigate("/");
        });
      })
      .catch(() => {
        alert("Неправильный email или пароль");
      });
  };
  return (
    <div>
      <Form title="Войти" handleSubmit={handleLogin} />
    </div>
  );
};
