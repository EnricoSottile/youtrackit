import CardData from '../providers/CardData'

class DashboardClass {

    /**
     * Dashboard cards list
     */
    cards = [];

    constructor(){
        this.cards = [
            new CardData(),
            new CardData(),
            new CardData(),
        ];
    }

    
    /**
     * Returns a card by its id
     * @param {String} uuid 
     * @return {CardData}
     */
    getCardById(uuid){
        return this.cards.find(item => item.uuid === uuid);
    }


    /**
     * Pushes a new CardData() to the cards array
     * @return {CardData}
     */
    addCard(){
        let newCard = new CardData();
        this.cards.unshift( newCard );
        return newCard;
    }


    /**
     * Removes a card by returning a filtered array 
     * @param {String} uuid 
     */
    removeCardById(uuid){
        this.cards = this.cards.filter(item => item.uuid !== uuid);
    }

}

export default DashboardClass;