import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts:[]
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state,action){
        const {products, search}=action.payload;
        const temp=products.filter((product)=>product?.name?.toLowerCase().includes(search.toLowerCase())
        || product?.category?.toLowerCase().includes(search.toLowerCase())
        || product?.brand.toLowerCase().includes(search.toLowerCase())
        )
        state.filteredProducts=temp;
    },
    SORT_PRODUCT(state,action){
    const {products,sort}=action.payload;
    let temp=[];
    if(sort==='latest'){
        temp=products;
    }
    if(sort==='lowest-price'){
        temp=products.slice().sort((a,b)=>a.price-b.price)
    }
    if(sort==='highest-price'){
        temp=products.slice().sort((a,b)=>b.price-a.price)
    }
    if(sort==='a-z'){
        temp=products.slice().sort((a,b)=>a.name.localeCompare(b.name))
    }
    if(sort==='z-a'){
        temp=products.slice().sort((a,b)=>b.name.localeCompare(a.name))
    }
    state.filteredProducts=temp;
    },
    FILTER_BY_CATEGORY(state,action){
        const {products,category}=action.payload;
        let temp=[]
        if(category==='All'){
            temp=products;
        }
        else{
            temp=products.filter((product)=>product.category===category)
        }
    state.filteredProducts=temp
    },
    FILTER_BY_BRANDS(state,action){
    const {products,brand}=action.payload;
    let temp=[]
    if(brand==='All'){
        temp=products;
    }
    else{
        temp=products.filter((product)=>product.brand===brand)
    }
  state.filteredProducts=temp
    },
    FILTER_BY_PRICE(state,action){
    const {products,price}=action.payload;
    let temp=[]
    temp=products.filter((product)=>product.price>=price[0] && product.price<=price[1])
    state.filteredProducts=temp
}
}
});

export const {FILTER_BY_SEARCH,SORT_PRODUCT,FILTER_BY_CATEGORY,FILTER_BY_BRANDS,FILTER_BY_PRICE} = filterSlice.actions
export const selectFilteredProducts=((state)=>state.filter.filteredProducts)

export default filterSlice.reducer