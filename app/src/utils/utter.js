export class Utter {
    constructor() {
        this.nameUtter = "";
        this.utters = [
            new MiniUtter()
        ]
    }
};

class MiniUtter {
    constructor() {
        this.utterText = [
            {
                "text": ""
            }
        ]
    }
};
