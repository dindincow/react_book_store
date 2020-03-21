import * as actionType from "./actionType";

const defaultState = {
    list: [],
    inputValue: '',
    filterList:[],
    isPopupShow:false,
    isEdit:false,
    currentEditItem:{},
    cartList:[],
    nickName:'admin'
}

export default (state = defaultState, action) => {

    // 產品列表
    if(action.type === actionType.INIT_LIST_ACTION ){
        const newState = JSON.parse(JSON.stringify(state))
        newState.list = action.data;
        newState.filterList = action.data;
        return newState;
    }

    // 改變搜索文字
    if(action.type === actionType.CHANGE_INPUT_VALUE ){
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.data
        return newState;
    }

    // 商品搜尋
    if(action.type === actionType.SEARCH_PRODUCT ){
        const newState = JSON.parse(JSON.stringify(state))

        newState.filterList = newState.list.filter(item =>{
            if(item.name.match(newState.inputValue)){
                return item;
            }
            return false;
        })  
        return newState;
       
    }

    // 開啟彈出框
    if(action.type === actionType.OPEN_POPUP ){
        const newState = JSON.parse(JSON.stringify(state))
        if(action.payload.isEdit){
            newState.isEdit = true;
            newState.currentEditItem = action.payload.ItemData
           
        }else{
            newState.isEdit = false;
        }
        newState.isPopupShow = true
        return newState;
    }

    // 關閉彈出框
    if(action.type === actionType.CLOSE_POPUP ){
        const newState = JSON.parse(JSON.stringify(state))
        newState.isPopupShow = false
        return newState;
    }

    // 修改資料
    if(action.type === actionType.CHANGE_EDIT_BOOK_FILE){
        const newState = JSON.parse(JSON.stringify(state))
        newState.currentEditItem[action.payload.name] = action.payload.value
        return newState;
    }

    // 獲取購物車清單
    if(action.type === actionType.GET_CART_LIST){
        const newState = JSON.parse(JSON.stringify(state))
        newState.cartList = action.data
        return newState;
    }

    // 加入購物車
    if(action.type === actionType.ADD_CART_ITEM){
        const newState = JSON.parse(JSON.stringify(state))
        newState.cartList.push(action.item)
        return newState;
    }

    return state;
}