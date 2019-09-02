export class Utter {
    constructor(
        id = "",
        name = "",
        have_alternatives = false,
        alternatives = [new Content()],
        project_name = "project"
    ) {
        this.id = id;
        this.name = name;
        this.alternatives = alternatives;
        this.project_name = project_name;
        this.have_alternatives = have_alternatives;
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
    constructor(id = "", name = "", questions = [new Text()], project_name = "project") {
        this.id = id;
        this.name = name;
        this.questions = questions
        this.project_name = project_name;
    }
};