import {BASE_URL} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk<
  Product[],
  void,
  {
    rejectValue: string;
  }
>('allProducts/getProductsAll', async (_, {rejectWithValue}) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data: ProductsResponse = await res.json();
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
