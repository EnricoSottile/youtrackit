import { mount, shallowMount } from '@vue/test-utils'
import App from '@/App'

import Dashboard from '@/classes/DashboardClass'


// Mocking packery plugin when mounting App
const initMainPackery = jest.fn()


const wrapper = mount(App, {
    methods: { initMainPackery }
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
  })


  it('calls the dashboard/cards crud methods ', (done) => {
    const mockAdd = jest.fn();
    const mockRemove = jest.fn();
    const mockFav = jest.fn();
    const mockAddEvent = jest.fn();
    
    let newCard = wrapper.vm.dashboard.addCard(); // add a card
    mockAdd.mockReturnValueOnce(newCard);

    wrapper.vm.dashboard.addCard = mockAdd;
    wrapper.vm.dashboard.removeCardById = mockRemove;
    newCard.toggleFavouriteStatus = mockFav;
    newCard.addNewEvent = mockAddEvent;

    wrapper.vm.addCard();
    wrapper.vm.handleRemoveCard(newCard.uuid);
    wrapper.vm.handleToggleFavouriteCard(newCard.uuid);
    wrapper.vm.handleAddEventToCard(newCard.uuid);

    
    setTimeout( () => {
      expect(mockAdd).toBeCalled();  
      expect(mockRemove).toBeCalled();
      expect(mockFav).toBeCalled();
      expect(mockAddEvent).toBeCalled();
      done()
    }, 500)

  })

  it('updates an event correctly', () => {

    // reset mocks
    let newWrapper = mount(App, {
      methods: { initMainPackery }
    });

    let newCard = newWrapper.vm.dashboard.addCard();
    let newEvent = newCard.addNewEvent();
    
    newWrapper.vm.handleEventUpdate(
      { 
        key: 'description', 
        value: 'testValue', 
        cardUuid: newCard.uuid, 
        eventUuid: newEvent.uuid 
      });
    expect(newEvent.description).toEqual('testValue')    
  })



})