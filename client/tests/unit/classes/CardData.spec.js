import CardData from '@/classes/CardData'

const card = new CardData();

describe('CardData.js', () => {

  it('Initializes the expected keys and properties', () => {
    let expectedKeys = ['uuid', 'title', 'isFavourite', 'tags', 'created_at', 'events'];
    let uuidRegExp = '(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}';

    expect( Object.keys(card) ).toEqual(expectedKeys);
    expect(card.uuid).toMatch( new RegExp(uuidRegExp) );
    expect(card.title).toBe('');
    expect(card.isFavourite).toBe(false);
    expect(card.tags).toEqual([]);
    expect(card.created_at.getTime() ).toBeDefined();
    expect(card.events).toEqual([]);
  });


  it('toggles the favourite status', () => {
    let newCard = new CardData();

    newCard.toggleFavouriteStatus();
    expect(newCard.isFavourite).toBe(true);
  });


  it('adds a new event', () => {
    let newCard = new CardData();
    let len = newCard.events.length;

    newCard.addNewEvent();
    expect(newCard.events.length ).toBeGreaterThan(len);
  });


})
