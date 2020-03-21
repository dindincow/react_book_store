import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class UserProfile extends Component {

    render() {
        const style = this.props.isOpen ? 'user-profile': 'user-profile-hide';

        return (
            <div className={style}>
                <p>{this.props.nickname}</p>
                <p>{this.props.email}</p>
                <p>{this.props.type === 1 ? '管理員' :'ㄧ般用戶'}</p>
                <div className="user-profile-btn-box">
                    <button className="button is-small" type="button" onClick={this.close}>關閉</button>
                    <button className="button is-info is-small" type="button" onClick={this.logOut}>登出</button>
                </div>
               
            </div>
        );

    }

    close = () =>{
        this.props.closeUserProfile();
    }

    logOut = ()=>{
        this.props.closeUserProfile();
        global.auth.logout();
        this.props.history.push("/login");
        // this.props.history.go(0); 
    }

   
}

export default withRouter(UserProfile);
