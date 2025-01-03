import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  image: "",
};

const employeeSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.fullName = action.payload.fullName;
      state.image = action.payload.image;
    },
  },
});

export const { setUserData } = employeeSlice.actions;

export default employeeSlice.reducer;
