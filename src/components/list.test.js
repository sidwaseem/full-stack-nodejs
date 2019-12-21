import React from 'react';
import { shallow, mount } from 'enzyme';
import List from './list';


describe('Testing <List /> component', () => {
  it('Render <AddCard /> Component', () => {
    const swrapper = shallow(<List />);

    expect(swrapper.length).toEqual(1);
    swrapper.unmount();
  });

  it('Should render the cards details', () => {
      const props = {
        cards: [{ "id": 1, "name": "Alice", "number": "1111222233334444", "balance": "1045", "limit": 2000 }]
    };
 
    const wrapper = mount(<List {...props}/>);

    expect(wrapper.find('tbody').find('tr').length).toEqual(1);
    wrapper.unmount();
  });
 
});

