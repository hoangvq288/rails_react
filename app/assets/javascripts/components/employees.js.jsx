class Employees extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
    this.handleInsertNew = this.handleInsertNew.bind(this);
  }
  componentDidMount() {
    console.log('Component mounted');
    //$.getJSON(url: "http://localhost:3000/api/v1/tratequotes,..
    $.getJSON('/api/v1/employees.json',
              (response) => {
                this.setState({ employees: response })
              });
  }

  render(){
    var that = this;
    employees = that.state.employees.map( function(employee) {
      return (
        <Employee employee={employee} key={employee.id} onFireEmployee={(e) => that.handleFireEmployee(employee,e)} />
      );
    });
    return (
      <div>
        <Header />
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
                
              </tbody>
            </table>
            <FormEmployee employees={this.state.employees} onSubmit={this.handleInsertNew}/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  handleInsertNew(employee) {
   console.log("Add New Employee To Current List");
   var oldList = this.state.employees;
   var newList = oldList.concat(employee);
   this.setState({employees: newList});
  }

  handleFireEmployee(employee) {
    var employeeList = this.state.employees.filter(function(item) {
      return employee.id !== item.id;
    });
    this.setState({employees: employeeList});
  }


}