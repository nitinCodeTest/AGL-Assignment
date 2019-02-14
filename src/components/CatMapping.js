import React, { Component } from 'react'
import data from '../offlineData/data.json'
import axios from 'axios'

class CatMapping extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maleCatOwners: [],
      femaleCatOwners: []
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount() {
    axios.get('http://agl-developer-test.azurewebsites.net/people.json')
      .then(res =>
        this.handleSort(res.data, 'gender')
      ).catch((error) => {
        // Use offline data in case above service fails
        // It will fetch data.json from offlineData folder now
        this.handleSort(data, 'gender')
      })
  }

  handleSort(ownerData, gender) {
    //Extract data
    const catOwnersAsPerGender = ownerData.reduce(function (result, owner) {
      (result[owner[gender]] = result[owner[gender]] || []).push(owner.pets ? owner.pets.filter(obj => { return obj.type === "Cat" }) : null)
      return result
    }, {})
    //Flatten data
    const maleOwnersData = catOwnersAsPerGender["Male"].reduce(function (a, b) {
      return a.concat(b);
    }, []);
    const femaleOwnersData = catOwnersAsPerGender["Female"].reduce(function (a, b) {
      return a.concat(b);
    }, []);
    //Sort data
    this.setState({
      maleCatOwners: maleOwnersData.filter(name => name !== null).map(a => a.name).sort(),
      femaleCatOwners: femaleOwnersData.filter(name => name !== null).map(a => a.name).sort()
    })
  }

  render() {
    const { maleCatOwners, femaleCatOwners } = this.state
    return (
      <div className="app">
        <h1>Seems men are more affectionate to cats :)</h1>
        <div className="content">
          <div className="dataSet">
            <div className="male-cat-logo"></div>
            <h4>Male</h4>
            <ul>
              {maleCatOwners && maleCatOwners.map((catName, index) =>
                <li className="catWithMale" key={index}>{catName}</li>
              )}
            </ul>
          </div>
          <div className="dataSet">
            <div className="female-cat-logo"></div>
            <h4>Female</h4>
            <ul>
              {femaleCatOwners && femaleCatOwners.map((catName, index) =>
                <li className="catWithFemale" key={index}>{catName}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default CatMapping
