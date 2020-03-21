import * as actionType from "./actionType";
import axios from '../commons/axios';
import { toast } from 'react-toastify';


const getCartsListData = (data)=>({  
    type:actionType.GET_CART_LIST,
    data
}) 

export const initListAction = (data)=>({
    type:actionType.INIT_LIST_ACTION,
    data
})

export const changeInputValue = (data)=>({
    type:actionType.CHANGE_INPUT_VALUE,
    data
})

export const changeEditBookFile = (payload)=>({
    type:actionType.CHANGE_EDIT_BOOK_FILE,
    payload
})

export const searchProduct = ()=>({
    type:actionType.SEARCH_PRODUCT,
})

export const openPopup = (payload)=>({
    type:actionType.OPEN_POPUP,
    payload
})

export const closePopup = ()=>({
    type:actionType.CLOSE_POPUP,
})

export const getProductList = ()=>{
    return (dispatch)=>{
        // axios.get('https://damp-garden-75366.herokuapp.com/products')
        axios.get('/products')
        .then((res)=>{
            var data = res.data
            const action = initListAction(data)
            dispatch(action)
        })
    }
}

export const addNewBook = (product)=>{
    return (dispatch)=>{
        axios.post('/products',product)
        .then(res=>{
            const action = getProductList()
            dispatch(action)
            toast.success('新增書籍成功!')
        })
    }
}


export const updateBook= (product)=>{
    return (dispatch)=>{

        axios.put(`/products/${product.id}`,product)
        .then(res=>{
            const action = getProductList()
            dispatch(action)
            toast.success('編輯書籍成功!')
        })
    }
}

export const deleteBook= (id)=>{
    return (dispatch)=>{

        axios.delete(`/products/${id}`)
        .then(res=>{
            const action = getProductList()
            dispatch(action)
            toast.success('刪除書籍成功!')
        })
    }
}


export const changeCartItemAmount = (payload)=>{

    return async(dispatch)=>{
       
        const res = await axios.get(`/carts?userId=${payload.userId}&&productId=${payload.id}`);
        const carts = res.data;

        if (carts && carts.length > 0) {
            const cart = carts[0];
            cart.mount = payload.value;
            await axios.put(`/carts/${cart.id}`, cart);
        }
        dispatch(getCartList(payload))
      
    }
}


export const deleteCartItem = (payload)=>{
  
    return (dispatch)=>{
        axios.delete(`/carts/${payload.id}`).then( res=>{
            dispatch(getCartList(payload))
        })
    }
}


export const addCart = (item)=>{  

    console.log("item==>",item)

    return async(dispatch)=>{


        // 先找出該用戶購物車是否有該商品
        const res = await axios.get(`/carts?userId=${item.userId}&&productId=${item.id}`);
        const carts = res.data;
        console.log('carts',carts)
    
        // 如果有該商品，則購物車數量加1
        if (carts && carts.length > 0) {
           
            const cart = carts[0];
            cart.mount = parseInt(cart.mount)+1;
            await axios.put(`/carts/${cart.id}`, cart);

        } else { 
            const cart = {
                productId:item.id,
                name:item.name,
                image:item.image,
                price:item.price,
                mount: 1,
                userId:item.userId
            };
            await axios.post('/carts', cart);
        }

        const action = getCartList(item);
        dispatch(action);
        toast.success('增加到購物車!')
    }

}

// 獲取購物車清單
export const getCartList = (user)=>{  

    let id = user.email || user.userId;
    console.log("id",id)
  
    return (dispatch)=>{
        axios.get(`/carts?userId=${id}`)
        .then(res=>{
            console.log("getCartList",res.data)
            const action = getCartsListData(res.data)
            dispatch(action) 
        })
    }
}









