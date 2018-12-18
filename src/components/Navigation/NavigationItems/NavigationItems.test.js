// l. 346
// .test.js extension is automatically picked up by React for testing
// Installatie command voor testing was:  npm install --save enzyme react-test-renderer enzyme-adapter-react-16

// l. 348: Official docs, handige links:
// JEST expect methods: https://jestjs.io/docs/en/expect
// ENZYME. E.g. shallow method: https://airbnb.io/enzyme/docs/api/shallow.html

// Import React to use JSX
import React from 'react';
// 'shallow' is best way of rendering React components
// It renders the component with all its content, but not deeply rendered.
// E.g.: The < NavigationItem /> in this case (child of NavigationItems) is only rendered as placeholder. Great for unit testing.
import { configure, shallow } from 'enzyme';
// 'Adapter' adapts enzyme to React 16 version
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// 'adapter' is extenciated with 'new Adapter'
configure({adapter: new Adapter()})

// 'describe' hoeft niet te worden geimport, is globally available. Parameters zijn in vaste volgorde.
// Eerste argument is voor jezelf, hoeft niet persé JSX te zijn
describe('<NavigationItems />', () => {
  let wrapper;
  
  // l. 347 Will be executed before each of the tests
  // BeforeEach takes a function as an argument, the one that will be executed before each test
  beforeEach(() => {
    // We want to create an instance of the navigationItems comp as it would be rendered
    // Enzyme allows us to render only a part, not the complete react app. This is why we import.
    // We pass JSX to the shallow method
    wrapper = shallow(< NavigationItems />);
  })
  
  // 'it' allows for 1 individual test.
  it('should render 2 <NavigationItem /> elements if not authenticated', () => {
    // expect method is made available globally by Jest
    // find method is provided by Enzyme. NOT JSX here.
    // We chain something to the expect call with the dot .toHaveLength
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render 3 <NavigationItem /> elements if authenticated, tested with FIND', () => {
    // l. 347. Deze setProps is alsof je het volgende typt:
    // wrapper = shallow(< NavigationItems isAuthenticated />);
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  // l. 348
  // 'contains' takes a node
  it('should render 3 <NavigationItem /> elements if authenticated, tested with  CONTAINS', () => {
    wrapper.setProps({isAuthenticated: true});
    // Look at code in NavigationItem.js: looks the same
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  })
});

