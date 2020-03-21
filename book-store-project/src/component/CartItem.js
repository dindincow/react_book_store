import React, { Component } from 'react';
import { connect } from 'react-redux';
import  * as actionCreator  from '../store/actionCreator';

class CartItem extends Component {
    render() {
        const {catrItem,changeCartItem,deleteCartItem}  =   this.props;
        const sumPrice = catrItem.mount*parseInt(catrItem.price)
        return (
            <tr>
                <td><span style={{cursor: "pointer"}} onClick={()=>{deleteCartItem(catrItem.id)}}><i className="far fa-trash-alt"></i></span></td>
                <td> <img src={catrItem.image} alt={catrItem.name} width="100" /></td>
                <td>{catrItem.name}</td>
                <td>$ {catrItem.price}</td>
                <td> 
                    <input
                        type="number"
                        value={catrItem.mount}
                        min={1}
                        name="amount"
                        onChange={(e)=>{ changeCartItem (e,catrItem.productId) }}
                    /></td>
                <td><span className="sum-price">$ {sumPrice}</span></td>
            </tr>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        list: state.filterList
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeCartItem(e,id){
            const user = global.auth.getUser() || {};
            const payload = {
                name : e.target.name,
                value: e.target.value,
                id,
                userId:user.email
            }
            dispatch(actionCreator.changeCartItemAmount(payload));
        },
        deleteCartItem(id){
           
            const user = global.auth.getUser() || {};
            const payload = {
                id,
                userId:user.email
            }
            dispatch(actionCreator.deleteCartItem(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
