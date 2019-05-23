import uuid from 'uuid/v4';

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

}

export default CardData