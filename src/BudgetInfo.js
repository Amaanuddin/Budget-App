import React, {Component} from 'react';
import './BudgetInfo.css';

function BudgetInfo (props)
{
    return (
        <div className='text-center col-md-4'>
            <h6 >{props.name}</h6>
            <span className = {props.cssStyle}><i className = {props.iconName}></i></span>
            <h4> <span>&#8377; </span><span>{props.amount}</span></h4>
        </div>
    );
}

export default BudgetInfo;