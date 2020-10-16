import React, { Component } from 'react';
import FlashMessages from './FlashMessages';


export default class TimeSlot extends Component{
    constructor(props){
        super(props);
        this.index = this.props.index;
        this.state = { 
            ...this.props.timeslot, 
            edit: this.props.edit,
            type: this.props.type,
        }
        this.set_timeslot = this.props.set_timeslot;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, event){
        event.persist();
        
        switch(key){
            case "date": this.setState(prev => ({...prev, date: event.target.value})); break;
            case "time": this.setState(prev => ({...prev, time: event.target.value})); break;
            case "fee": this.setState(prev => ({...prev, fee: event.target.value})); break;
            case "room_count": this.setState(prev => ({...prev, room_count: event.target.value})); break;
            case "discount": this.setState(prev => ({...prev, discount: event.target.value})); break;
        }
    }

    render(){
        const flash_messages = [];  // messages = { message: "your msg", warning: true/false }
        
        return (
            
            <div className="timeslot" style={{display: "block"}} >
                <FlashMessages messages={ flash_messages } />
                    <h2 style={{width: "60%"}}> Time Slot { this.index + 1 } 
                    <span style={{ color: "blue", cursor: "pointer", float: "right", fontSize:"40px"}} onClick={ event => this.setState(prev => {
                        return { ...prev, edit: !prev.edit }
                    })}>
                        { this.state.edit ? "-": "+" }</span> </h2> 

                    {   this.state.edit && 
                    <div>
                        <div className="col-6 edit-schedule">
                            <i className="fas fa-calendar-alt"></i>
                            <input type="date" value={ this.state.date } onChange={
                                event => this.handleChange("date", event)
                            } />
                        </div>
                        <div className="col-6 edit-schedule" style={{ paddingLeft: '15pt' }}>
                            <i className="fas fa-clock"></i>
                            <input type="text" value={ this.state.time } onChange={
                                event => this.handleChange("time", event)
                            } />
                        </div>
                        <div className="col-4 edit-schedule" style={{position: 'relative', right: '8px'}}>
                            <i className="fas fa-money-bill-wave"></i>
                            <input type="number" value={ this.state.fee } onChange={
                                event => this.handleChange("fee", event)
                            } />
                        </div>
                        <div className="col-4 edit-schedule" style={{ paddingLeft: '15pt' }}>
                            <i className="fa fa-user"></i>
                            <input type="number" value={ this.state.room_count } onChange={
                                event => this.handleChange("room_count", event)
                            } />
                        </div>
                        <div className="col-4 edit-schedule" style={{ paddingLeft: '15pt' }}>
                            <i className="fa fa-scissors"></i>
                            <input type="number" value={ this.state.discount } onChange={
                                event => this.handleChange("discount", event)
                            } />
                        </div>
                        <input type="button" value="Save" style={{width: "30%", background:"#4aade0"}} onClick={
                            event => { this.set_timeslot({
                                    id: this.state.id,
                                    date: this.state.date,
                                    time: this.state.time,
                                    fee: this.state.fee,
                                    room_count: this.state.room_count,
                                    discount: this.state.discount,
                                }, this.index)
                                this.setState(prev => ({...prev, edit: false}));
                            }
                        }/>
                        
                        {
                            (this.state.id == null) && 
                            <input type="button" value="Delete" style={{width: "30%", background:"#4aade0", marginLeft: "2%"}} onClick={
                                event => {
                                    this.set_timeslot(null, this.index);
                                }
                            } />   
                        }      
                    </div>
                }
                <br />
                <hr />
            </div>
        );
       
    }
}