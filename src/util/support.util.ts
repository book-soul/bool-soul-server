import * as uuidv4 from 'uuid/v4';

class Support {

    public makeId(): string {
        return uuidv4();
    }

}

export const $ = new Support();