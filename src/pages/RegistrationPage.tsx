import { Form } from "../components/Form";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegistration = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
      .catch((error) => {
        console.error("Ошибка регистрации:", error);
      });
  };

  return (
    <div>
      <Form title="Создать аккаунт" handleSubmit={handleRegistration} />
    </div>
  );
};
