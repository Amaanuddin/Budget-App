import React, {Component} from 'react';
import './ExpenseList.css';


class ExpenseListItem extends Component {
 
    constructor(props){
        debugger
        super(props);
        this.state = { editable : false,  Expenseid : this.props.expenseId, expenseListObj : {}, Expensename : this.props.name, expenseAmount : this.props.expenseAmount, prevExpenseAmount: this.props.expenseAmount } //{id: '12', name : 'test', expenseAmount : '20'}
        this.name = this.props.name;
        this.amount = this.props.expenseAmount;
        this.eid = this.props.expenseId;
        this.NameChangeHandler = this.NameChangeHandler.bind(this);
        this.AmountChangeHandler = this.AmountChangeHandler.bind(this);
        // this.EnableEdit = this.EnableEdit.bind(this);
        // this.save = this,save.bind(this);
        // this.EnableDelete = this.EnableDelete.bind(this);
        // this.cancel = this.cancel.bind(this);
    }
    
    EnableEdit = () =>{
        this.setState({editable : true, Expensename : this.props.name, expenseAmount: this.props.expenseAmount, prevExpenseAmount : this.props.expenseAmount});
    }
     save = () =>{
         this.setState({expenseListObj : {
             id : this.eid,
             name : this.name,
             expenseAmount : this.amount
         },
         Expensename : this.name,
         expenseAmount : this.amount,
         Expenseid : this.eid,
         editable : false,
        })
        let expenseObj = this.state.expenseListObj;
        //let itemAmount = this.state.prevExpenseAmount;
        this.props.update(this,expenseObj)
        //editable = true;
    }
    NameChangeHandler(event) {
        this.setState({Expensename :  event.target.value});
    }
    AmountChangeHandler(event) {
        this.setState({expenseAmount: parseFloat(event.target.value)});
    }
     EnableDelete = () =>{
         debugger
         this.setState({expenseAmount : this.props.expenseAmount})
         this.props.delete(this,this.eid)
        //editable = true;
    }
     cancel = () =>{
        this.setState({editable : false});
    }
    render() {
        debugger
        return (
            <li>
                <div className='row'>
                    <div className= 'col-xs-2 my-3 text-center'>
                        {!this.state.editable ? <label>{this.props.name}</label> : <input type="text" value={this.state.Expensename} onChange = {this.NameChangeHandler}/>} 
                    </div>
                    <div className= 'col-xs-2 my-3 text-center'>
                    {!this.state.editable ?<label>{this.props.expenseAmount}</label>: <input type="number" value={this.state.expenseAmount} onChange = {this.AmountChangeHandler}/>}
                    </div>
                    {!this.state.editable ?
                        <div className= 'col-xs-1 my-3 text-center'>
                            <span className = 'expenseIconstyle editIcon' onClick={this.EnableEdit}><i className = 'fas fa-edit'></i></span>
                        </div>
                    :
                        <div className= 'col-xs-1 my-3 text-center'>
                            <span className = 'expenseIconstyle saveIcon' onClick={this.save}><i className = 'fas fa-check'></i></span>
                        </div>
                    }
                    {!this.state.editable ?
                        <div className= 'col-xs-1 my-3 text-center'>
                            <span className = 'expenseIconstyle delIcon' onClick={this.EnableDelete}><i className = 'far fa-trash-alt' ></i></span>
                        </div>
                    :
                    <div className= 'col-xs-1 my-3 text-center'>
                            <span className = 'expenseIconstyle cancelIcon' onClick={this.cancel}><i className = 'fas fa-times'></i></span>
                        </div>
                    }
                </div>
            </li>
        );
    }
}


function ExpenseList(props){
    debugger
    const style = {
        listStyleType : 'none'
    };
    if(props.expenseList){
        const list = props.expenseList;
        const listItems  = list.map((item)=><ExpenseListItem  key={item.id} name={item.name} expenseAmount = {item.expenseAmount} update = {props.update} expenseId = {item.id} delete = {props.delete}/>);
        return(
        
            <ul style={ style }>
                {listItems}
            </ul>
        
        );
    }
    else{
        return(
            <ul>

            </ul>
        );
    }
}

export default ExpenseList;