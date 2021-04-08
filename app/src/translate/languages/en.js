const messages = {
  en: {
    translations: { // Mesmo valor usado nas configurações (defaultNS)
      menu_nav_bar: {
        dialogues: 'Dialogues',
        questions: 'Questions',
        answers: 'Answers'
      },
      stories_page: {
        create_dialogue: "Create"
      },
      stories_edit_page: {
        questions: 'Questions',
        answers: 'Answers'
      },
      deleted: "Item deleted",
      no_result: "No items found",
      repeated_name: "Try a different name, it already exists",
      no_special_char: "Use only letters without accents, numbers or _",
      no_dialogs: "Click on the questions and answers to set up a dialogue with expected interaction examples",
      delete_confirmation: "Delete item?",
      exportar_conteudo: 'Export content',
      story: {
        created: "Dialogue created",
        deleted: "Dialogue deleted",
        updated: "Dialogue updated",
        create_button: "Create new dialogue",
        first_element: "The dialogue must begin with a question",
        two_intents: "Add an answer after each question",
      },
    intent: {
        created: "Question created",
        deleted: "Question deleted",
        updated: "Updated question",
        toolbar_name: "Question title",
        list_filter: "Registered questions",
        create_button: "Create new question",
        placeholder: "Ex: Gen_Greet, How_To_Reg_Serv",
        name_good_pratice: "To identify the questions clearly, indicate the main subject and then the type of question, separated by '_'",
      },
    utter: {
        created: "Answer created",
        deleted: "Answer deleted",
        selection: "Balloons appear:",
        sequence_text: "sequentially",
        updated: "Answer updated",
        toolbar_name: "Answer title",
        create_button: "Create new answer",
        list_filter: "Answers registered",
        alternatives_text: "as alternative",
        placeholder: "Ex: Ans_Gen_Greet, Ans_How_To_Reg_Serv",
        name_good_pratice: "To identify the answers clearly, use 'Resp_' and the title of the corresponding question, if any",
      }
    }
  }
}

export { messages }