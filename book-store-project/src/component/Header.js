import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import * as actionCreator from '../store/actionCreator'


class Header extends Component {

    constructor(props){
        super(props);
        this.state={
            isUserProfileOpen:false
        }
    }

    renderLink() {
        const { nickname,email,type } = this.props.user;
      
        if (nickname) {
            return (
                <div className="userInfoWrapper">
                    <span className="userName" onClick={this.openUserProfile}><i className="fas fa-user-circle"></i>{nickname}</span>
                    <UserProfile 
                        type ={type}
                        nickname={nickname} 
                        email={email} 
                        isOpen={this.state.isUserProfileOpen}
                        closeUserProfile = {this.closeUserProfile}
                        > 
                    </UserProfile>
                    <Link to="/cart"><i className="fas fa-cart-plus"></i>({this.props.cartList.length})</Link>
                </div>
            )

        } else {
            return (
                <Fragment>
                    <Link to="/register">註冊</Link>
                    <Link to="/login">登入</Link>
                </Fragment>
            )
        }
    }

    renderAddBtn = ()=>{
        const {openPopup } = this.props;
        const user = global.auth.getUser() || {};
        if(user.type===1){
            return  <button className="button addBook is-info" onClick={openPopup}>增加書集</button>
        }
    }

    render() {
        
        return (
            <div className="header">
                <div className="container">
                    <nav className="level">
                        <div className="level-left">
                            <Link to="/" className="logo">BOOK STORE</Link>
                        </div>
                        <div className="level-right">
                            {this.renderLink()}
                            {this.renderAddBtn()}
                        </div>
                    </nav>
                </div>
            </div>
        )
    }


    componentDidMount() {
        this.props.getCartList()
    }

    goCart = () => {
        this.props.history.push('/cart')
    }

    closeUserProfile = ()=>{
        this.setState({
            isUserProfileOpen:false
        })
    }

    openUserProfile = ()=>{
        this.setState({
            isUserProfileOpen:true
        })
    }


}

const mapStateToProps = (state) => {
    return {
        cartList: state.cartList,
        nickName: state.nickName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openPopup() {
            const action = actionCreator.openPopup({ isEdit: false });
            dispatch(action);
        },
        getCartList() {
            const user = global.auth.getUser() || {};
            dispatch(actionCreator.getCartList(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
