import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const dummyProducts = [
  {
    id: 1,
    name: "product1",
    slug: "product-1",
    description: "description of product1",
    brand: "brand1",
    price: 11.99,
    image: require("@src/assets/images/shop/product1.png").default,
    rating: 2
  },
  {
    id: 2,
    name: "product2",
    slug: "product-2",
    description: "description of product2",
    brand: "brand1",
    price: 22.99,
    image: require("@src/assets/images/shop/product2.png").default,
    rating: 5
  },
  {
    id: 3,
    name: "product3",
    slug: "product-3",
    description: "description of product3",
    brand: "brand1",
    price: 33.99,
    image: require("@src/assets/images/shop/product3.png").default,
    rating: 5
  },
  {
    id: 4,
    name: "product4",
    slug: "product-4",
    description: "description of product4",
    brand: "brand1",
    price: 44.99,
    image: require("@src/assets/images/shop/product4.png").default,
    rating: 2
  },
  {
    id: 5,
    name: "product5",
    slug: "product-5",
    description: "description of product5",
    brand: "brand2",
    price: 55.99,
    image: require("@src/assets/images/shop/default-product.png").default,
    rating: 4
  },
  {
    id: 6,
    name: "product6",
    slug: "product-6",
    description: "description of product6",
    brand: "brand3",
    price: 55.99,
    image: require("@src/assets/images/shop/default-product.png").default,
    rating: 2
  },
  {
    id: 7,
    name: "product7",
    slug: "product-7",
    description: "description of product7",
    brand: "brand4",
    price: 55.99,
    image: require("@src/assets/images/shop/default-product.png").default,
    rating: 3
  },
  {
    id: 8,
    name: "product8",
    slug: "product-8",
    description: "description of product8",
    brand: "brand5",
    price: 55.99,
    image: require("@src/assets/images/shop/default-product.png").default,
    rating: 1
  }
]

export const getProducts = createAsyncThunk("appEcommerce/getProducts", async (params) => {
  const response = await axios.get("/apps/ecommerce/products", { params })
  return { params, data: response.data }
})

export const addToCart = createAsyncThunk("appEcommerce/addToCart", async (id, { dispatch, getState }) => {
  const response = await axios.post("/apps/ecommerce/cart", { productId: id })
  await dispatch(getProducts(getState().ecommerce.params))
  return response.data
})

export const getWishlistItems = createAsyncThunk("appEcommerce/getWishlistItems", async () => {
  const response = await axios.get("/apps/ecommerce/wishlist")
  return response.data
})

export const deleteWishlistItem = createAsyncThunk("appEcommerce/deleteWishlistItem", async (id, { dispatch }) => {
  const response = await axios.delete(`/apps/ecommerce/wishlist/${id}`)
  dispatch(getWishlistItems())
  return response.data
})

export const getCartItems = createAsyncThunk("appEcommerce/getCartItems", async () => {
  const response = await axios.get("/apps/ecommerce/cart")
  return response.data
})

export const getProduct = createAsyncThunk("appEcommerce/getProduct", async (slug) => {
  const response = await axios.get(`/apps/ecommerce/products/${slug}`)
  return response.data
})

export const addToWishlist = createAsyncThunk("appEcommerce/addToWishlist", async (id) => {
  await axios.post("/apps/ecommerce/wishlist", { productId: id })
  return id
})

export const deleteCartItem = createAsyncThunk("appEcommerce/deleteCartItem", async (id, { dispatch }) => {
  await axios.delete(`/apps/ecommerce/cart/${id}`)
  dispatch(getCartItems())
  return id
})

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    cart: [],
    params: {},
    products: dummyProducts,
    wishlist: [],
    totalProducts: 0,
    productDetail: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.params = action.payload.params
        state.products = action.payload.data.products
        state.totalProducts = action.payload.data.total
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.products
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload.products
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product
      })
  }
})

export default shopSlice.reducer
