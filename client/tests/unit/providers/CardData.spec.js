import CardData from '@/providers/CardData'

const card = new CardData();

describe('CardData.js', () => {

  it('Initializes the expected keys and properties', () => {
    let expectedKeys = ['uuid', 'title', 'isStuck', 'tags', 'created_at', 'events'];
    let uuidRegExp = '(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}';

    expect( Object.keys(card) ).toEqual(expectedKeys);
    expect(card.uuid).toMatch( new RegExp(uuidRegExp) );
    expect(card.title).toBe('');
    expect(card.isStuck).toBe(false);
    expect(card.tags).toEqual([]);
    expect(card.created_at.getTime() ).toBeDefined();
    expect(card.events).toEqual([]);
  });


  it('toggles the stuck status', () => {
    let newCard = new CardData();

    newCard.toggleStuckStatus();
    expect(newCard.isStuck).toBe(true);
  });


  it('returns the stuck status correctly', () => {
    let newCard = new CardData();

    expect( newCard.isCurrentlyStuck() ).toBe(false);
    newCard.toggleStuckStatus();
    expect( newCard.isCurrentlyStuck() ).toBe(true);
    newCard.toggleStuckStatus();
    expect( newCard.isCurrentlyStuck() ).toBe(false);

  });

})
