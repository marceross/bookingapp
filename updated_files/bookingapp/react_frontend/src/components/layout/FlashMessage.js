import React, { Component } from 'react';

export default class FlashMessage extends Component{

    constructor(props){
        super(props);
        this.message = this.props.message;
        this.is_warning = this.props.warning;   // true for warning msg, false for success msg
        this.index = this.props.index;
        this.remove_message = this.props.remove_message;
    }

    render(){
        let class_name = null;
        if(this.is_warning)
            class_name = "warning"
        else
            class_name = "success"

        return (
            <div className={ "flash-message " + class_name }>
                <p><span style={{float: "right", fontWeight: "bolder", cursor: "pointer"}} onClick={
                    event => this.remove_message(this.index) }>&times;</span></p>
                <p style={{textAlign: "center"}}>{ this.message }</p>
            </div>
        );
    }
}