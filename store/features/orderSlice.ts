import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TitleResult } from "../../utils/converter";

type Product = {
  id: number;
  isCompleted: boolean;
  price: bigint;
  uri: string;
};

interface IOrderState {
  isHidden: boolean;
  bookIframe: boolean;
  previewIframe: boolean;
  isChecked: number | null;
  products: Product[];
}

// Define the initial state using that type
const initialState: IOrderState = {
  isHidden: true,
  previewIframe: false,
  bookIframe: false,
  isChecked: null,
  products: [{ id: 1, isCompleted: false, price: BigInt(0), uri: "" }],
};

export const counterSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<number>) => {
      state.isHidden = false;
      state.isChecked = action.payload;
    },
    openPreviewIframe: (state, action: PayloadAction<number>) => {
      state.previewIframe = true;
      state.isChecked = action.payload;
    },
    openBookIframe: (state, action: PayloadAction<number>) => {
      state.bookIframe = true;
      state.isChecked = action.payload;
    },
    close: (state) => {
      state.isHidden = true;
    },
    closePreviewIframe: (state) => {
      state.previewIframe = false;
    },
    closeBookIframe: (state) => {
      state.bookIframe = false;
    },
    setCompleted: (state, action: PayloadAction<number>) => {
      const product = state.products.find((el) => el.id === action.payload);
      if (product) {
        product.isCompleted = true;
      }
    },
    setProducts: (state, action: PayloadAction<TitleResult[]>) => {
      state.products = action.payload.map((result, index) => ({
        id: index + 1,
        isCompleted: false,
        price: result?.price,
        uri: result?.uri,
      }));
    },
    setCompletedIds: (state, action: PayloadAction<number[]>) => {
      state.products = state.products.map((el) => {
        if (action.payload.includes(el.id)) {
          el.isCompleted = true;
        } else el.isCompleted = false;
        return el;
      });
    },
    setAllProductsToNotCompleted: (state) => {
      state.products = state.products.map((el) => {
        el.isCompleted = false;
        return el;
      });
    },
  },
});

export const {
  open,
  openPreviewIframe,
  openBookIframe,
  close,
  closePreviewIframe,
  closeBookIframe,
  setCompleted,
  setProducts,
  setCompletedIds,
  setAllProductsToNotCompleted,
} = counterSlice.actions;

export default counterSlice.reducer;
