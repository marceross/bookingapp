import React, { Component } from 'react';
import FlashMessage from './FlashMessage';


export default class FlashMessages extends Component{
    /* 
        Message Structure msg = {
            message: "your msg",
            warning: true/false,
        }
    */

    constructor(props){
        super(props);
        this.state = {
            messages: this.props.messages,
        }

        this.remove_message = this.remove_message.bind(this);
    }

    componentDidUpdate(prev_props, prev_state){
        if(prev_props.messages !== this.props.messages){
            this.setState(prev => {
                return ({...prev, messages: this.props.messages })
            })
        }
    }

    remove_message(index){
        this.props.remove_message(index);
    }

    render(){
        return (
            <div className="flash-messages">
                {
                    this.state.messages.length > 0 &&  
                    <FlashMessage message={ this.state.messages[0].message } warning={ this.state.messages[0].warning } 
                    index={ 0 } key={ 0+this.state.messages[0].message } remove_message={ this.remove_message }/>
                }
            </div>
        );
    }

}