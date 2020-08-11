import React from 'react';
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Review from './Review.jsx';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('tests for Review component', () => {
  
  test('review component should have 4 children', () => {
    let wrapper = shallow(<Review />);
    expect(wrapper.find('.reviewContainer').children()).toHaveLength(4);
  })
  
  test('should have a stars component', () => {
    let wrapper = shallow(<Review />);
    expect(wrapper.find('.starsPlaceholder').exists()).toBe(true);
  })
  
  test('should have a title', () => {
    let wrapper = shallow(<Review />);
    expect(wrapper.find('h3').exists()).toBe(true);
  })
  
  test('should have a review body paragraph', () => {
    let wrapper = shallow(<Review />);
    expect(wrapper.find('p').exists()).toBe(true);
  })
  
})