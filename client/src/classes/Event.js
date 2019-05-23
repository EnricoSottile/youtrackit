import uuid from 'uuid/v4';

class Event {
    constructor() {
        this.uuid = uuid();
        this.description = '';
        this.created_at = new Date();
    }


}

export default Event