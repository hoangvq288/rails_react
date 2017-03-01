

class Employees extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      employees: this.props.employees,
      employee: {
        name: '',
        email: '',
        manager: false
      },
      errors: {}
    };
  }
  render(){
   
    employees = this.state.employees.map( function(employee) {
      return (
        <Employee employee={employee} key={employee.id} onFireEmployee={() => this.handleFireEmployee(employee)} />
      );
    });
    return (
      <div>
        <h1>Employees</h1>
        <div id="employees">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Manager</th>
              </tr>
            </thead>
            <tbody>
              {employees}
              <tr>
                <td>
                  <input type="text" onChange={(e) => this.handleNameChange(e)} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.name}</span>
                </td>
                <td>
                  <input type="text" onChange={(e) => this.handleEmailChange(e)} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.email}</span>
                </td>
                <td><input type="checkbox" onChange={(e) => this.handleManagerChange(e)} /></td>
                <td><button onClick={(e) => this.handleHireEmployee(e)}>Hire</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  handleNameChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.name = e.target.value;
    this.setState({employee: newEmployee});
  }

  handleEmailChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.email = e.target.value;
    this.setState({employee: newEmployee});
  }

  handleManagerChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.manager = e.target.value;
    this.setState({employee: newEmployee});
  }
  handleHireEmployee() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        employee: that.state.employee,
      },
      url: '/employees.json',
      success: function(res) {
        var newEmployeeList = that.state.employees;
        newEmployeeList.push(res);
        that.setState({
          employees: newEmployeeList,
          employee: {
            name: '',
            email: '',
            manager: false
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  }
  handleFireEmployee(employee) {
    var employeeList = this.state.employees.filter(function(item) {
      return employee.id !== item.id;
    });
    this.setState({employees: employeeList});
  }

}


var Employee = React.createClass({

  getInitialState() {
    return {
      employee: this.props.employee,
      editMode: false,
      errors: {}
    }
  },

  render() {
    if(this.state.editMode){
      mark_up = (
        <tr>
          <td>
            <input
              type="text"
              value={this.state.employee.name}
              onChange={(e) => this.handleNameChange(e)} />
            <span style={{color: 'red'}}>{this.state.errors.name}</span>
          </td> 
          <td>
            <input
              type="text"
              value={this.state.employee.email}
              onChange={(e) => this.handleEmailChange(e)} />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.email}</span>
          </td>
          <td>
            <input
              type="checkbox"
              value={this.state.employee.manager}
              onChange={(e) => this.handleManagerChange(e)} />
          </td>
          <td>
            <button onClick={(e) => this.handleEmployeeUpdate(e)}>Save</button>
          </td>
        </tr>
      );
    } else {
      mark_up = (
        <tr>
          <td>{this.state.employee.name}</td>
          <td>{this.state.employee.email}</td>
          <td>{this.state.employee.manager ? '✔' : ''}</td>
          <td>
            <button onClick={(e) => this.setEditMode(e)}>Edit</button>
            <button onClick={(e) => this.toggleManagerStatus(e)}>{this.state.employee.manager ? 'Demote' : 'Promote'}</button>
            <button onClick={(e) => this.handleEmployeeFire(e)} style={{color: 'red'}}>Fire</button>

          </td>
        </tr>
      );
    }
    return mark_up
  },

  setEditMode(){
    this.setState({editMode: true});
  },
  
  handleNameChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.name = e.target.value;
    this.setState({employee: newEmployee});
  },

  handleManagerChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.manager = e.target.value;    
    this.setState({employee: newEmployee});
  },

  handleEmailChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.email = e.target.value;
    this.setState({employee: newEmployee});
  },

  toggleManagerStatus() {
    var newEmployee = this.state.employee;
    newEmployee.manager = !this.state.employee.manager; 
    this.setState({employee: newEmployee});
    this.handleEmployeeUpdate();
  },

  handleEmployeeUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        employee: that.state.employee,
      },
      url: '/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          employee: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleEmployeeFire() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.props.onFireEmployee(that.state.employee);
        console.log('hehe')
      }
    })
  },




});


class Employee123 extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      employee: this.props.employee
    }
  }
  render() {
    return (
      <tr>
        <td>{this.state.employee.name}</td>
        <td>{this.state.employee.email}</td>
        <td>{this.state.employee.manager ? '✔' : ''}</td>
      </tr>
    );
  }
}