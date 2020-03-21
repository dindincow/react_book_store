import React ,{Component}from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import  * as actionCreator  from '../store/actionCreator';
import Start from './Start';
import { toast } from 'react-toastify';



class ProductItem extends Component{

   
    renderProductBtn = (content) =>{
        const {addCart} = this.props;

        if(content.status==="available" ){
            return (
                <span className="buyBtn" onClick={()=>{addCart(content)}}>
                    <i className="fas fa-cart-plus"></i>
                </span>
            )
        }else{
            return <span className="sold-out-text">以販售完</span>
        }  
    }

    renderEditBtn = () =>{

        const {openPopup} = this.props;

        const user = global.auth.getUser() || {};
        console.log('user',user)

        if(user.type===1){
            return <button type="button" className="editBtn" onClick={()=>{openPopup(this.props.content)}}><i className="fas fa-edit"></i></button>
        }else{
            return ''
        }
    }


    render(){
        const {content} = this.props;

        const isProductSold ={
            available:'sold-out hide',
            unavailable:'sold-out'
        }

        return(
            <div className="productItem">
                <div className="box">
                    <article className="media">
                        <div className="media-left">
                           
                            <figure className="image">
                                <div className={isProductSold[content.status]}>
                                    <i className="fas fa-sad-tear"></i><br/>SOLD-OUT
                                </div>
                                <img src={content.image} alt={content.name}/>
                            </figure>
                        </div>
                        <div className="bookInfo">
                            {this.renderEditBtn()}
                            <ul>

                                <li className="name">{content.name}</li>
                                <li className="author">{content.author}</li>
                                <li className="rate">
                                    <Start rate={content.rate}></Start>
                                </li>
                                <li className="desc">{content.desc}</li>
                               
                                <a className="price">
                                    <span> NT.{content.price} </span>
                                    {this.renderProductBtn(content)}
                                </a>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
   
    return{
        openPopup(item){
            const action = actionCreator.openPopup({
                isEdit:true,
                ItemData : item
            });
            dispatch(action);
        },

        addCart(item){
            // 如果沒有登入，導回登入頁
            if(!global.auth.isLogin()){
                toast.info("請先登入!")
                return false;
            }
            const user = global.auth.getUser() || {};
            const { id, name, image, price } = item;

            const addCartData = {
                id,
                name,
                image,
                price,
                userId:user.email
            }

            const action = actionCreator.addCart(addCartData);
            dispatch(action);
        },
 
    }
}




// export default connect(null,mapDispatchToProps)(ProductItem);

const ProductItemData = withRouter(connect(null,mapDispatchToProps)(ProductItem));
export default ProductItemData


