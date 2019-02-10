import React, { Component } from 'react';

import BudgetInfo from './BudgetInfo';
import ExpenseList from './ExpenseList';

class BudgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0.00, expenses: 0.00, expenseName : '', expenseList : []}; //{id: '12', name : 'test', expenseAmount : '20'}
    
    this.prevBudget = this.state.value;
    this.prevExpens = this.state.expenses;
    
    this.expenseListArray = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleExpenseNameChange = this.handleExpenseNameChange.bind(this);
    this.handleExpenseAmountChange = this.handleExpenseAmountChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  BudgetFormSubmitHandler = () =>{
    let id = document.getElementById('budgetid');
    if(id.value === ""){
      return
    }
    alert('budget submitted is '+ this.state.value );
    this.prevBudget = this.state.value;
    this.setState({value: this.prevBudget});  
    id.value = "";
  };
  handleChange(event) {
    let budget = parseFloat(event.target.value) + parseFloat(this.prevBudget)
    this.setState({value: budget});
  }
  AddExpenseHandler = ()=>{  
    let id = document.getElementById('expenseNameId');
    let bid = document.getElementById('amountId');
    if(bid.value === "" || id.value === ""){
      return;
    }
    alert('expense submitted is '+ this.state.expenses );
    this.prevExpens = this.state.expenses;
    this.setState({expenseList: [...this.state.expenseList,this.expenseListArray] });
    id.value = "";
    bid.value = "";
  }
  handleExpenseNameChange(event) {
    this.setState({expenseName: event.target.value});
  }
  handleExpenseAmountChange(event) {
    this.expenseListArray = {id: new Date().toISOString(), name: this.state.expenseName, expenseAmount:parseFloat(event.target.value)}
    this.setState({expenses: parseFloat(event.target.value) + parseFloat(this.prevExpens) });
  }

  updateExpenseList =(obj) =>{
    let editObj = this.state.expenseList.map((item) => {
      if(item.id == obj.state.Expenseid){
          item.name = obj.state.Expensename;
          item.expenseAmount = obj.state.expenseAmount;
      }
      return item;
    })
    this.prevExpens = this.prevExpens - obj.state.prevExpenseAmount + obj.state.expenseAmount
    this.setState({expenseList: [...this.state.expenseList] })
  }
  deleteExpense(obj){
    debugger
    
    this.prevExpens = this.prevExpens - obj.props.expenseAmount;
    let delobj = this.state.expenseList.filter((item)=> item.id !=obj.state.Expenseid);
    this.setState({expenseList: [...delobj] })

  }
    render() {
      const divStyle = {
        borderStyle: 'solid',
        borderColor: '#92a8d1',
        margin : '5px'
      }
      return (
        <div>
          <div className='row'>
            <div className= 'col-md-5 my-3' style= {divStyle}>
                <h5>Please Enter Your Budget</h5>
                <div>
                  <input type="number" className="BudgetForm"  onChange={this.handleChange} id ='budgetid'/>
                </div>
                <button type="submit" onClick = {this.BudgetFormSubmitHandler}>Calculate</button>
            </div>
            <div className= 'col-md-7' style= {divStyle}>
              <div className='row my-3'>
                <BudgetInfo name = 'Budget' iconName = 'fas fa-money-bill-alt' amount = {this.prevBudget} cssStyle ='iconsSize budget'/>
                <BudgetInfo name = 'Expenses' iconName = 'far fa-credit-card' amount = {this.prevExpens} cssStyle ='iconsSize expense'/>
                <BudgetInfo name = 'Balance' iconName = 'fas fa-dollar-sign' amount = {this.prevBudget-this.prevExpens} cssStyle ='iconsSize balance'/> 
              </div>
          </div>
          </div>
          <div className='row'>
            <div className='col-md-5 my-3' style= {divStyle}>
              <div>
              <h5 >Please Enter Your Expense</h5>
              <div>
                <input type="text"  onChange={this.handleExpenseNameChange} id='expenseNameId'/>
              </div>
              <div>
                <input type="number"  onChange={this.handleExpenseAmountChange} id='amountId'/>
              </div>
              <button type="submit" onClick= {this.AddExpenseHandler}>Add Expense</button>
            </div>
         </div>
            <div className ='col-md-7 my-3' style= {divStyle}>
                <ExpenseList expenseList = {this.state.expenseList} update = {this.updateExpenseList.bind(this)} delete = {this.deleteExpense.bind(this)}/>
            </div>
         </div>
         </div>
        );
    }
  }
  
  export default BudgetForm;
  