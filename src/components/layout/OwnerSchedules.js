import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';

/* Import logo image */

const OwnerSchedules = () => {
    return (
    <Fragment>
    	<div className="center-col-12">
    		<div className="col-12 text-center horarios-lists">
    			<i className="fas fa-calendar"></i>
    			<h1 className="text-center">Actividades</h1>
    		</div>
    	</div>
    	<div className="col-12 row horarios-lists" style={{marginTop: '0', paddingTop: '0'}}>
    	<Link to='edit'> 
    	<div className="schedule-card col-12 row" id="cycling">
    		<div className="col-8">
    			<h2>Rock Cycling</h2>
                <i className="fa fa-star" />
               	<i className="fa fa-star" />
               	<i className="fa fa-star" />
               	<i className="fa fa-star" />
               	<i className="fa fa-star" />
                <span>(5)</span>
   			</div>
   			<div className="col-4">
            	<i className="fa fa-minus-circle"></i>
    		</div>
			<div className="col-12 schedule-card-details">
   				<p><span className="blue-time">15</span> Martes</p>
    			<p><i className="fa fa-clock"></i> 11.00</p>
    			<p><i className="fa fa-user"></i> 7</p>
            </div>
    	</div>
		</Link>
    	<div className="schedule-card col-12 row" id="climbing">
    		<div className="col-8">
    			<h2>Climbing</h2>
                <i className="fa fa-star" />
               	<i className="fa fa-star" />
               	<i className="fa fa-star" />
               	<i className="fa fa-star" />
               	<i className="fa fa-star" />
                <span>(5)</span>
   			</div>
   			<div className="col-4">
            	<i className="fa fa-minus-circle"></i>
    		</div>
			<div className="col-12 schedule-card-details">
   				<p><span className="blue-time">17</span> Martes</p>
    			<p><i className="fa fa-clock"></i> 17.00</p>
    			<p><i className="fa fa-user"></i> 5</p>
            </div>
    	</div>
   		<div className="schedule-card col-12 row" id="running">
   			<div className="col-8">
    			<h2>Running</h2>
                <i className="fa fa-star" />
               	<i className="fa fa-star" />
               	<i className="fa fa-star" />
               	<i className="fa fa-star" />
               	<i className="fa fa-star" />
                <span>(5)</span>
   			</div>
   			<div className="col-4">
            	<i className="fa fa-minus-circle"></i>
    		</div>
			<div className="col-12 schedule-card-details">
   				<p><span className="blue-time">17</span> Jueves</p>
    			<p><i className="fa fa-clock"></i> 08.00</p>
    			<p><i className="fa fa-user"></i> 5</p>
            </div>
    	</div>
		<div className="center-col-12">
        	<button className="blue" id="reservar">Cagar Nueva</button>
        </div>
    	</div>
    </Fragment>
    );
}

export default OwnerSchedules;