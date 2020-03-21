import React, { Component } from 'react';

class Start extends Component {

    constructor(props) {
        super(props)
        this.state={
            arr:[1,2,3,4,5]
        }
    }

    render(){

        return(
            <span>
                {
                    this.state.arr.map((ele,index)=>{
                        return(
                            <span key={index}>
                                { ele <= this.props.rate ? <i className="fas fa-star"></i> :<i className="far fa-star"></i>}
                            </span>
                        )
                    })
                }
            </span>
        )
    }
}

export default Start;
