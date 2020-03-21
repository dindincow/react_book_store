import React, { Component } from 'react';
import CartItem from '../component/CartItem';
import * as actionCreator from '../store/actionCreator';
import {connect} from 'react-redux';
import Layout from '../Layout';

class Carts extends Component {
    render() {
        const {list} = this.props;
        const totalPrice = () =>{
            const totalPrice = list.map(cart => cart.mount * parseInt(cart.price))
            .reduce((a,value) => a + value,0);
            return totalPrice;
        } 

        return (
            <Layout>
                <div className="cart-page">
                    <span className="cart-title">您的購物清單</span>
                        <table className="table cart-list">
                            <thead>
                                <tr>
                                    <th>刪除</th>
                                    <th>圖片</th>
                                    <th>書名</th>
                                    <th>價錢</th>
                                    <th>數量</th>
                                    <th>總價</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    list.map(item=>{
                                        return  <CartItem catrItem={item} key={item.id}></CartItem>
                                    })
                                }
                            </tbody>    
                        </table>
                   
                    <div className="cart-total">
                        Total:
                        <span className="total-price">$ {totalPrice()}</span>
                    </div>
                </div>
    
            </Layout>
        )
    }
    componentDidMount(){
        this.props.getCartListData()
    }

}

const mapState = (state)=>({
    list:state.cartList
})

const mapDispatch = (dispatch)=>({
    getCartListData(){
        const user = global.auth.getUser() || {};
        dispatch(actionCreator.getCartList(user))
    }
})
export default connect(mapState,mapDispatch)(Carts);