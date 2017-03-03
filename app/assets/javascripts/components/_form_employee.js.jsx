class FormEmployee extends React.Component{
  constructor() {
    super();
    this.state = {
      employee: {
        name: '',
        email: '',
        manager: false,
      },
      errors: []
    }
  }
  render() {
    return (
      <table>
        <thead>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="text" value={this.state.employee.name} onChange={(e) => this.handleNameChange(e)}/><br />
              <span style={{color: 'red'}}>{this.state.errors.name}</span>
            </td>
            <td>
              <input type="text" value={this.state.employee.email} onChange={(e) => this.handleEmailChange(e)} /><br />
              <span style={{color: 'red'}}>{this.state.errors.email}</span>
            </td>
            <td><input type="checkbox" value={this.state.employee.manager} checked={this.state.employee.manager} onChange={(e) => this.handleManagerChange(e)} /></td>
            <td><button onClick={(e) => this.handleHireEmployee(e)}>Hire</button></td>
          </tr>
        </tbody>
      </table>
    )
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
    newEmployee.manager = e.target.checked;
    this.setState({employee: newEmployee});
  }
  
  handleHireEmployee() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        employee: that.state.employee,
      },
      url: '/api/v1/employees.json',
      success: function(res) {
        that.props.onSubmit(res);
        that.setState({
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
}