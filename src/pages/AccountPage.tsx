import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUser, setAvatar } from "../store/slices/userSlice";
import { FavoritesPage } from "./FavoritesPage";
import { Avatar, Grid2 } from "@mui/material";

const avatarOptions = [
  "https://data.chpic.su/stickers/j/JJKshits/JJKshits_028.webp",
  "https://data.chpic.su/stickers/f/FarforovayaKuklaStickermegapack/FarforovayaKuklaStickermegapack_043.webp",
  "https://data.chpic.su/stickers/s/Sjziejdia/Sjziejdia_009.webp",
  "https://data.chpic.su/stickers/d/Djdifjsjcxj/Djdifjsjcxj_014.webp",
];

export const AccountPage = () => {
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    }
  }, []);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("userAvatar", avatar);
    dispatch(setAvatar(avatar));
  };
  return (
    <div>
      <div className="account-wrapper">
        <h2>Выберите аватар</h2>
        <Grid2
          container
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
            gap: 2,
            marginBottom: 3,
          }}
        >
          {avatarOptions.map((avatar, index) => (
            <Grid2
              key={index}
              onClick={() => handleAvatarSelect(avatar)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                src={avatar}
                alt={`avatar-${index}`}
                sx={{
                  width: 60,
                  height: 60,
                  cursor: "pointer",
                  border:
                    selectedAvatar === avatar ? "2px solid #e91e63" : "none",
                }}
              />
            </Grid2>
          ))}
        </Grid2>
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
    </div>
  );
};
