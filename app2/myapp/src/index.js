import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.state,
      list: [{ name: 'select country' }], currentCountry: { name: 'please select a country', data: { 'data title': 'to be displayed' } }
    };//build list


    this.handleChange = this.handleChange.bind(this);

  }
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
          //console.log(data)
          localStorage.setItem('countries', JSON.stringify(data))
          this.setState((state) => {

            state.list.push(...data)
            return state
          });



        });
    }


  }

  //do fetch here for idividual countries label select and text , state has current country. update state 
  handleChange = (event) => {
    let name = event.target.value

    fetch('http://10.25.137.221:8080/countries/' + name)
      .then(response => response.json())
      .then(data => {
        this.setState((state) => {
          state.currentCountry = data[0]

          return state
        })
      });

  }


  render() {

    const { list, currentCountry } = this.state
    const keys = Object.keys(currentCountry.data)
  
    return (
      <div>
        <label>
          Select A Country<br />
          <select onChange={this.handleChange} >
            {list.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}

          </select>

          <br />
        </label>
        <div >
          {currentCountry.name}

          <div>

            {keys.map((key) => (
              <p>{key} :{currentCountry.data[0]}

              </p>
            ))}

          </div>
        </div>

      </div>
    );

  }
}

ReactDOM.render(<App />, document.querySelector("#container"));