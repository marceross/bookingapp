import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';

/* Import logo image */

const MemberSchedules = () => {
    return (
    <Fragment>
    	<div className="center-col-12">
    		<div className="col-12 text-center horarios-lists">
    			<i className="fas fa-calendar"></i>
    			<h1 className="text-center">Horarios</h1>
    		</div>
    	</div>
    	<div className="col-12 row horarios-lists" style={{marginTop: '0', paddingTop: '0'}}>
    	<div className="schedule-card col-12 row" id="cycling">
    		<div className="col-8">
    			<h2>Rock Cycling</h2>
   				<p><span id="time">15</span> Martes</p>
   			</div>
   			<div className="col-4">
            	<i className="fa fa-minus-circle"></i>
    			<p><i className="fa fa-clock"></i> 11.00</p>
    		</div>
    	</div>
    	<div className="schedule-card col-12 row" id="climbing">
    		<div className="col-8">
    			<h2>Climbing</h2>
   				<p><span id="time">17</span> Jueves</p>
   			</div>
   			<div className="col-4">
            	<i className="fa fa-minus-circle"></i>
    			<p><i className="fa fa-clock"></i> 17.00</p>
    		</div>
    	</div>
   		<div className="schedule-card col-12 row" id="running">
   			<div className="col-8">
    			<h2>Running</h2>
   				<p><span id="time">19</span> Jueves</p>
    		</div>
   			<div className="col-4">
            	<i className="fa fa-minus-circle"></i>
    			<p><i className="fa fa-clock"></i> 08.00</p>
    		</div>
    	</div>
   		<div className="schedule-card col-12 row" id="running">
   			<div className="col-8">
    			<h2>Running</h2>
   				<p><span id="time">19</span> Jueves</p>
    		</div>
   			<div className="col-4">
            	<i className="fa fa-minus-circle"></i>
    			<p><i className="fa fa-clock"></i> 08.00</p>
    		</div>
    	</div>
    	</div>
    </Fragment>
    );
}

export default MemberSchedules;