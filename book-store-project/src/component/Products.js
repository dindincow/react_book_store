import React ,{Component}from 'react';
import ProductItem from './ProductItem';
import { connect } from 'react-redux';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import  * as actionCreator  from '../store/actionCreator';

class Products extends Component{

    render(){
        return(
            <div className="Products">
                <div className="container">
                    <div className="columns is-desktop is-multiline">
                        <TransitionGroup component={null}>
                        {
                            this.props.list.map(item => {
                                return (
                                    <CSSTransition classNames="product-fade" timeout={300} key={item.id}>
                                        <div className="column is-4" key={item.id}>
                                            <ProductItem content = {item} />
                                        </div>
                                    </CSSTransition>
                                )
                            })
                        }
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.props.getProductInitList()
    }
}

const mapStateToProps = (state)=>{
    return{
        list : state.filterList
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getProductInitList(){
            const action = actionCreator.getProductList();
            dispatch(action);
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Products);