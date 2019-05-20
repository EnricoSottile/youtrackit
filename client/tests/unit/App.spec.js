import { mount, shallowMount } from '@vue/test-utils'
import App from '@/App'

import CardData from '@/providers/CardData'
// const card = new CardData();


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
    expect( Array.isArray(wrapper.vm.cards) ).toBe(true);
    expect( wrapper.vm.packeryInstance ).toBeDefined();
  })


  it('can Add a new card', () => {
      wrapper.vm.cards;
      let len1 = wrapper.vm.cards.length;
      wrapper.vm.addCard();
      let len2 = wrapper.vm.cards.length;

      expect(len1).toBeLessThan(len2);
      expect( wrapper.vm.cards[0] ).toBeInstanceOf(CardData);
  })

  
  it('can delete an existing card', (done) => {
    let len1 = wrapper.vm.cards.length;
    let uuid = wrapper.vm.cards[0].uuid;
    wrapper.vm.handleRemoveCard(uuid);

    setTimeout( () => {
        expect(len1).toBeGreaterThan( wrapper.vm.cards.length );
      done()
    }, 20)
  })


  it('toggles the isStuck status correctly', () => {
    let arr = wrapper.vm.cards;
    wrapper.vm.addCard();
    let card = arr[0];

    expect(card.isStuck).toBe(false);
    wrapper.vm.handleToggleStickCard(card.uuid);
    expect(card.isStuck).toBe(true);
    wrapper.vm.handleToggleStickCard(card.uuid);
    expect(card.isStuck).toBe(false);

  })


})