// l. 350: Testing containers
// NOTE there is an error (cannot read property toFixed of undefined)
// Check dit nog een keer om deze test te doen werken zoals het wel doet in de course
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


configure ({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    // onInitIngr here simply fulfills the requirement of passing a function (otherwise the test fails)
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    // Die salad moet als vb prop, want het is een shallow test, dus zelf dummy data toevoegen
    // Idee van test is: als je props hebt dan heb je BuildControls.
    wrapper.setProps({ings: {salad: 0}})
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  });
});