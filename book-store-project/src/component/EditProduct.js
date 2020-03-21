import React, { Component } from 'react';
import { connect } from 'react-redux';
import  * as actionCreator  from '../store/actionCreator';

class EditProduct extends Component {

    render() {
        const { author, desc, id, image, name, price, rate, status } = this.props.currentEditItem;
        return (
            <div className="addProductPopup">
                <p className="title has-text-centered">修改商品</p>
                <form>
                    <div className="field">
                        <div className="control">
                            <label className="label">書籍名稱</label>
                            <input
                                type="text"
                                className="input"
                                name="name"
                                value={name}
                                onChange={this.props.handleChange}
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
                                value={author}
                                onChange={this.props.handleChange}
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
                                value={rate}
                                onChange={this.props.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">書籍描述</label>
                            <textarea
                                className="textarea"
                                name="desc"
                                value={desc}
                                onChange={this.props.handleChange}
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
                                value={price}
                                onChange={this.props.handleChange}
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
                                value={image}
                                onChange={this.props.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">書籍狀態</label>
                            <div className="select is-fullwidth">
                                <select
                                    name="status"
                                    value={status}
                                    onChange={this.props.handleChange}
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
                            <button className="button is-danger" type="button" onClick={() => { this.props.deleteBook(id) }}>刪除</button>
                        </div>
                        <div className="control">
                            <button className="button is-info"
                                type="button"
                                onClick={() => this.props.updateBook(this.props.currentEditItem)}>提交
                                </button>
                        </div>
                        <div className="control">
                            <button
                                className="button"
                                type="button"
                                onClick={this.props.closePopup}
                            >
                                取消
                                </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentEditItem: state.currentEditItem
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        handleChange(e) {
            const payload = {
                name: e.target.name,
                value: e.target.value
            }
            const action = actionCreator.changeEditBookFile(payload)
            dispatch(action);
        },

        updateBook(book) {
            const action = actionCreator.updateBook(book);
            dispatch(action);
            this.closePopup();
        },

        closePopup() {
            const action = actionCreator.closePopup();
            dispatch(action);
        },

        deleteBook(id) {
            const action = actionCreator.deleteBook(id);
            dispatch(action);
            this.closePopup();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
