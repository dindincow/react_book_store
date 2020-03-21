import React, { Component } from 'react';
import { connect } from 'react-redux';
import  * as actionCreator  from '../store/actionCreator';

class AddProductPopup extends Component {

    constructor(props){
        super(props);
        this.state={
            name:'',
            author:'',
            rate:'',
            desc:'',
            price:'',
            tags:'',
            image:'',
            status:'available'
        }
    }

    render() {
        return (
            <div className="addProductPopup">
                <p className="title has-text-centered">新增書籍</p>
                <form onSubmit={this.submit}>
                    <div className="field">
                        <div className="control">
                            <label className="label">書籍名稱</label>
                            <input
                                type="text"
                                className="input"
                                name="name"
                                value={this.state.name}
                                onChange = {this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">書籍作者</label>
                            <input
                                type="text"
                                className="input"
                                name="author"
                                value={this.state.author}
                                onChange = {this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">書籍評分</label>
                            <input
                                type="text"
                                className="input"
                                name="rate"
                                value={this.state.rate}
                                onChange = {this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">書籍描述</label>
                            <textarea
                                className="textarea"
                                name="desc"
                                value={this.state.desc}
                                onChange = {this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">書籍價格</label>
                            <input
                                type="number"
                                className="input"
                                name="price"
                                value={this.state.price}
                                onChange = {this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="label">書籍圖片</label>
                            <input
                                type="text"
                                className="input"
                                name="image"
                                value={this.state.image}
                                onChange = {this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">書籍狀態</label>
                            <div className="select is-fullwidth">
                                <select
                                    name="status"
                                    value="available"
                                    onChange = {this.handleChange}
                                >
                                    <option>available</option>
                                    <option>unavailable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-info">提交</button>
                        </div>
                        <div className="control">
                            <button
                                className="button"
                                type="button"
                                onClick={this.closePopup}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    handleChange = e =>{
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({
            [name] :value
        })
    }

    submit = (e)=>{
        e.preventDefault();
        const product = {...this.state};
        this.props.createBook(product);
        this.props.closePopup(); 

        this.setState({
            name:'',
            author:'',
            rate:'',
            desc:'',
            price:'',
            tags:'',
            image:'',
            status:'available'
        })
    }

    closePopup = ()=>{
        this.setState({
            name:'',
            author:'',
            rate:'',
            desc:'',
            price:'',
            tags:'',
            image:'',
            status:'available'
        })
        this.props.closePopup()
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        createBook(product){
            const action = actionCreator.addNewBook(product);
            dispatch(action);
        },
        closePopup(){
            const action = actionCreator.closePopup()
            dispatch(action)
        }
    }
}

export default connect(null,mapDispatchToProps)(AddProductPopup);

