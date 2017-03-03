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
              checked={this.state.employee.manager}
              onChange={(e) => this.handleManagerChange(e)} />
          </td>
          <td>
            <button onClick={(e) => this.handleEmployeeUpdate(e)}>Save</button>
            <button onClick={() => this.setState({editMode: false})}>Cancel</button>
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
    newEmployee.manager = e.target.checked;    
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
      url: '/api/v1/employees/' + that.state.employee.id + '.json',
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
      url: '/api/v1/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.props.onFireEmployee(that.state.employee);
      }
    })
  },
});