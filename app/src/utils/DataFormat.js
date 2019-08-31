export class Utter {
    constructor() {
        this.name = "";
        this.project_name = "project";
        this.have_alternatives = false;
        this.alternatives = [new Content()]
    }
};

class Content {
    constructor() {
        this.contents = [new Text()]
    }
}

class Text {
    constructor() {
        this.text = "";
    }
}

export class Intent {
    constructor() {
        this.name = "";
        this.questions = [new Text()]
    }
};