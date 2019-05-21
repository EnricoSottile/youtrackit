import { mount, shallowMount } from '@vue/test-utils'
import App from '@/App'

import Dashboard from '@/classes/DashboardClass'


// Mocking packery plugin when mounting App
const initMainPackery = jest.fn()
const initMainDraggabilly = jest.fn();
const addToDraggabilly = jest.fn();

const wrapper = mount(App, {
    methods: { initMainPackery, initMainDraggabilly, addToDraggabilly }
});

wrapper.setData({ 
    packeryInstance: {
        prepended: jest.fn(),
        unstamp: jest.fn(),
        stamp: jest.fn(),
        remove: jest.fn(),
        layout: jest.fn(),
    }
});

describe('App', () => {

  it('can be mounted correctly', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })


  it('loads default data correctly', () => {
    expect( wrapper.vm.dashboard ).toBeInstanceOf(Dashboard);
    expect( wrapper.vm.packeryInstance ).toBeDefined();
    expect( wrapper.vm.draggableList ).toEqual([]);
  })


  it('calls the dashboard crud methods ', (done) => {
    const mockAdd = jest.fn();
    const mockRemove = jest.fn();
    
    let newCard = wrapper.vm.dashboard.addCard(); // add a card
    mockAdd.mockReturnValueOnce(newCard);

    wrapper.vm.dashboard.addCard = mockAdd;
    wrapper.vm.dashboard.removeCardById = mockRemove;


    wrapper.vm.addCard();
    wrapper.vm.handleRemoveCard(newCard);

    
    setTimeout( () => {
      expect(mockAdd).toBeCalled();  
      expect(mockRemove).toBeCalled();
      done()
    }, 500)


    // test toggle isStuck
  })



})