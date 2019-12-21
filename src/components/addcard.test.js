import React from 'react';
import { shallow, mount } from 'enzyme';
import AddCard from './addcard';


describe('Testing <AddCard /> component', () => {
  it('Render <AddCard /> Component', () => {
    const swrapper = shallow(<AddCard />);

    expect(swrapper.length).toEqual(1);
    swrapper.unmount();
  });

  const errors = {
        name: 'Please enter valid name',
        number: '',
        limit: '',
  };

  it('Hightlight error feilds', () => {
    const wrapper = mount(<AddCard />);
    wrapper.setState({ formErrors: errors });
    expect(wrapper.find('.input-name').hasClass("error")).toBeTruthy();
    wrapper.unmount();
  });

  it('Display error message', () => {
    const wrapper = mount(<AddCard />);
    wrapper.setState({ formErrors: errors });
    expect(wrapper.find('.name-error').text('Please enter valid name'));
    wrapper.unmount();
  });


  it('change event on input field should update the state', () => {
      const props = {
        onAddCard: jest.fn()
    };
    const wrapper = mount(<AddCard {...props}/>);
    wrapper.find('.input-name').simulate('change', {
        target: {
            name: 'name',
            value: 'username'
        }
    });

    expect(wrapper.state('name')).toEqual('username');
    wrapper.unmount();
  });
 
});

