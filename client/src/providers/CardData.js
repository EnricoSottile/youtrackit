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

    toggleStuckStatus(){
        this.isStuck = !this.isStuck;
    }

    isCurrentlyStuck(){
        return this.isStuck;
    }
}

export default CardData