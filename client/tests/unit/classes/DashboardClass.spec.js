
import CardData from '@/classes/CardData'
import Dashboard from '@/classes/DashboardClass'
const dashboard = new Dashboard();





describe('Dashboard', () => {


  it('loads default data correctly', () => {
    expect( Array.isArray(dashboard.cards) ).toBe(true);
  })


  it('can Add a new card', () => {
      let len1 = dashboard.cards.length;
      dashboard.addCard();
      let len2 = dashboard.cards.length;

      expect(len1).toBeLessThan(len2);
      expect( dashboard.cards[0] ).toBeInstanceOf(CardData);
  })


  it('assert new cards are added to the beginning of the array', () => {
    dashboard.cards = [];
    dashboard.addCard();
    let card1 = dashboard.cards[0];
    dashboard.addCard();
    let card2 = dashboard.cards[0];
    dashboard.addCard();
    let card3 = dashboard.cards[0];
    dashboard.addCard();
    let card4 = dashboard.cards[0];

    expect(dashboard.cards[3]).toBe(card1);
    expect(dashboard.cards[2]).toBe(card2);
    expect(dashboard.cards[1]).toBe(card3);
    expect(dashboard.cards[0]).toBe(card4);
  })

  
  it('can delete an existing card', () => {
    let len1 = dashboard.cards.length;
    let uuid = dashboard.cards[0].uuid;
    dashboard.removeCardById(uuid);

    expect(len1).toBeGreaterThan( dashboard.cards.length );
  })

  it('can retrieve an existing card', () => {
    let newCard = dashboard.addCard();
    let retrieved = dashboard.getCardById(newCard.uuid);
    
    expect(newCard).toBeDefined();
    expect(retrieved).toBeDefined();
    expect(newCard).toBe(retrieved);

  });

})