import uuid from 'uuid/v4';

class CardData {
    constructor() {
        this.uuid = uuid();
        this.title = '';
        this.isStuck = false;
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
     * @return {Boolean}  
     */
    isCurrentlyStuck(){
        return this.isStuck;
    }
}

export default CardData