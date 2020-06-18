import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  //react component class
  constructor(props) {
    //contructor takes in parameters called props
    super(props);
    //pass props to the parent constructor
    //assign state with value and list 
    this.state = {
      value: this.state,
      list: [{ name: 'select country' }], currentCountry: { name: 'please select a country', data: { 'data title': 'to be displayed' }}
    };//build list

    //bind to handle change event 
    this.handleChange = this.handleChange.bind(this);

  }
  //componentdidmount connects react ap to api
  componentDidMount() {
    // check local sotrage before fetch

    if (localStorage.getItem('countries')) {
      this.setState((state) => {

        state.list.push(...JSON.parse(localStorage.getItem('countries')))
        return state
      });

    }
    else {
      //do fetch
      fetch('http://10.25.137.221:8080/countries') // on server i presume its 10.25.137.221:8080/countries 
        .then(response => response.json())
        .then(data => {
          //set local storage
          localStorage.setItem('countries', JSON.stringify(data))
          this.setState((state) => {
            //push data to list
            state.list.push(...data)
            return state
          });



        });
    }


  }


  handleChange = (event) => {
    //name is target value on dro down
    let name = event.target.value
    //fetch single country from api
    fetch('http://10.25.137.221:8080/countries/' + name)
      .then(response => response.json())
      .then(data => {
        this.setState((state) => {
          //set state to current country selected 
          state.currentCountry = data[0]

          return state
        })
      });

  }


  render() {
    //list country 
    const { list, currentCountry } = this.state
    //country data keys 
    const keys = Object.keys(currentCountry.data)
    const values = Object.values(currentCountry.data)
    return (
      <div class="container"  >
        <label>
          Select A Country<br />
          {/* on change event when a country is clicked  */}
          <select onChange={this.handleChange} >
            {/* map over items in array */}
            {list.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}

          </select>
          
          <br />
          {currentCountry.name}
        </label><br/>
        <label>Child Mortality</label>
          <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Year , Value
    </button>
    <div class="dropdown-menu myDropDown" aria-labelledby="dropdownMenuButton">
    {values.reduce((key) => (
      <pre>
        <li class="dropdown-item">{JSON.stringify(key).replace(',')} :{currentCountry.data[0]}</li>
        </pre>
        ))}
    </div>
          {/* <div class="container" >
            {values.map((key) => (
              
              <li>{JSON.stringify(key)} :{currentCountry.data[0]}</li> 
            ))}
            
          </div> */}

        </div>
        
      </div>
      
    );

  }
}

ReactDOM.render(<App />, document.querySelector("#container"));