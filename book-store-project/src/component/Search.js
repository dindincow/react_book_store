import React , {Component} from 'react';
import { connect } from 'react-redux';
import  * as actionCreator  from '../store/actionCreator';

class Search extends Component{

    render(){
        return(
            <div className="search">
                <div className="container">
                    <h2>Read More  x  Life More</h2>
                    <h5>挑 選 一 本 好 書 ， 享 受 閱 讀 喜 悅</h5>
                    <div className="field has-addons searchInput">
                        <div className="control">
                            <input  
                                className="input"
                                type="text"  
                                value = {this.props.inputValue}
                                onChange = {this.props.inputChange}
                                placeholder="搜尋書集"/>
                        </div>
                        <div className="control">
                            <a className="button" onClick={this.props.search}><i className="fas fa-search"></i></a>
                        </div>
                     </div>
                   
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return{
        inputValue :state.inputValue
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        inputChange(e){
            const action = actionCreator.changeInputValue(e.target.value);
            dispatch(action);
        },

        search(){
            const action = actionCreator.searchProduct();
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);