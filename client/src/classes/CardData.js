import uuid from 'uuid/v4';
import Event from './Event';

class CardData {
    constructor() {
        this.uuid = uuid();
        this.title = '';
        this.isFavourite = false;
        this.tags = [];
        this.created_at = new Date();
        this.events = [];
    }

    /**
     * toggles the card isFavourite status
     */
    toggleFavouriteStatus(){
        this.isFavourite = !this.isFavourite;
    }


    /**
     * Adds a new event to the card
     */
    addNewEvent(){
        this.events.push( new Event() );
    }

}

export default CardData