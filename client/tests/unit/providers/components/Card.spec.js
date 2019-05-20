import { mount, shallowMount } from '@vue/test-utils'
import Card from '@/components/Card'

import CardData from '@/providers/CardData'
const card = new CardData();

const wrapper = shallowMount(Card, {
  propsData: {
    uuid: card.uuid,
    title: card.title,
    isStuck: card.isStuck,
    tags: card.tags,
    created_at: card.created_at,
    events: card.events,
  }
})

describe('Card', () => {

  it('can be mounted correctly', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })


  it("emits the expected events and data", () => {
    wrapper.vm.removeCard();
    wrapper.vm.toggleStickPosition();

    expect( wrapper.emitted() ).toEqual({
      'remove-card-clicked': [ [ card.uuid ] ],
      'toggle-stick-clicked': [ [ card.uuid ] ]
    })
  });

    it('removeCard is called when clicking the corresponding button', () => {
    const stub = jest.fn();
    wrapper.setMethods({ removeCard: stub });

    const el = wrapper.find("#removeButton").trigger("click");
    expect(stub).toBeCalled();
  })

  it('toggleStickPosition is called when clicking the corresponding button', () => {
    const stub = jest.fn();
    wrapper.setMethods({ toggleStickPosition: stub });

    const el = wrapper.find("#stickButton").trigger("click");
    expect(stub).toBeCalled();
  })

})