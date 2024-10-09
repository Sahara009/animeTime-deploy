import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import { FavoritesPage } from "./FavoritesPage";

export const AccountPage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="account-wrapper">
        <h2>Избранное</h2>
        <FavoritesPage />
      </div>
      <button
        className="remove-account"
        onClick={() => {
          dispatch(removeUser());
        }}
      >
        Выйти из аккаунта
      </button>
    </>
  );
};
