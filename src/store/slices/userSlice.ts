import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadUserFromStorage = (): UserState => {
  const savedUser = localStorage.getItem("user");
  return savedUser
    ? JSON.parse(savedUser)
    : { email: null, token: null, id: null };
};

export interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  selectedAvatar: null;
}

const initialState: UserState = loadUserFromStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        email: string | null;
        token: string | null;
        id: string | null;
      }>
    ) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem("user", JSON.stringify(state));
    },

    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      localStorage.removeItem("user");
    },
    setAvatar(state, action) {
      state.selectedAvatar = action.payload;
    },
  },
});

export const { setUser, removeUser, setAvatar } = userSlice.actions;
export default userSlice.reducer;
