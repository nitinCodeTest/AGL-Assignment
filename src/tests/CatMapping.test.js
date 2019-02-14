import React from 'react'
import { mount, shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import './TestConfig'
import data from '../offlineData/data.json'
import CatMapping from '../components/CatMapping'

describe('comp', () => {
  it('matches snapshot', () => {
    let component = shallow(<CatMapping />)
    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('handleSort', () => {
    let component = mount(<CatMapping />)
    const spy = jest.spyOn(component.instance(),'setState')
    component.instance().handleSort(data, 'gender')
    expect(spy).toHaveBeenCalledWith({
      maleCatOwners: ["Garfield", "Jim", "Max", "Tom"],
      femaleCatOwners: ["Garfield", "Simba", "Tabby"]
    })
  })
})

