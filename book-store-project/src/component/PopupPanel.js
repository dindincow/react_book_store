import React ,{Component}from 'react';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { connect } from 'react-redux';
import * as actionCreator from '../store/actionCreator'

class PopupPanel extends Component{
    
    render(){
        const isOpen= {
            true:'panel-wrapper active',
            false:'panel-wrapper'
        }

        return(
            <div className={isOpen[this.props.isPopupShow]}>
                <div className="over-layer"></div>
                <div className="panel">
                   <div className="head">
                        <span onClick={this.props.closePopup}>
                            <i className="far fa-times-circle"></i>
                        </span>
                    </div>
                    { this.props.isEdit ?  <EditProduct/> : <AddProduct/>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        isPopupShow : state.isPopupShow,
        isEdit :state.isEdit
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        closePopup(){
            const action = actionCreator.closePopup();
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PopupPanel);
