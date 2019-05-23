import uuid from 'uuid/v4';
import Event from './Event';

class CardData {
    constructor() {
        this.uuid = uuid();
        this.title = '';
        this.isStuck = false;
        this.isFavourite = false;
        this.tags = [];
        this.created_at = new Date();
        this.events = [];
    }

    /**
     * toggles the card isStuck status
     * used to keep track of enabled/disabled dragging
     */
    toggleStuckStatus(){
        this.isStuck = !this.isStuck;
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
        let event = new Event();
        this.events.push( event );
        return event;
    }

    /**
     * Returns a event by its id
     * @param {String} uuid 
     * @return {Event}
     */
    getEventById(uuid){
        return this.events.find(item => item.uuid === uuid);
    }


}

export default CardData