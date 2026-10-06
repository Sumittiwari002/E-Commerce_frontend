import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: '',
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    shareCategroyId: (state, action) => {
     state.categoryId = action.payload;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { shareCategroyId} = categorySlice.actions

export default categorySlice.reducer