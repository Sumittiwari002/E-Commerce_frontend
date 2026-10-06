import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice'
const ecomstore = configureStore({
  reducer: {
    category: categoryReducer,
  },
})
export default ecomstore;