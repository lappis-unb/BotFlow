const messages = {
  en: {
    translations: { // Mesmo valor usado nas configurações (defaultNS)
      menu_nav_bar: {
        stories: 'Stories',
        intents: 'Intents',
        utters: 'Utters'
      },
      stories_page: {
        create_dialogue: "Create new story",
        filter: 'Filter'
      },
      stories_edit_page: {
        itents: 'Intents',
        utters: 'Utters',
        filter: 'Filter'
      },
      deleted: "Item deleted",
      no_result: "No items found",
      repeated_name: "Try a different name, this one already exists",
      no_special_char: "Use only letters without accents, numbers or _",
      no_dialogs: "Click on intents and utters to set up a story",
      delete_confirmation: "Delete item?",
      exportar_conteudo: 'Export content',
      story: {
        created: "Story created",
        deleted: "Story deleted",
        updated: "Story updated",
        create_button: "Create new story",
        first_element: "Story must begin with an intent",
        two_intents: "Add an utter after each intent",
      },
    intent: {
        created: "Intent created",
        deleted: "Intent deleted",
        updated: "Updated intent",
        toolbar_name: "Intent title",
        list_filter: "Registered intents",
        create_button: "Create new intent",
        placeholder: "Ex: General_Greet, How_To_Register",
        name_good_pratice: "To identify intents clearly, add the main subject and then the type of intent, separated by '_'",
      },
    utter: {
        created: "Utter created",
        deleted: "Utter deleted",
        selection: "Balloons appear:",
        sequence_text: "sequentially",
        updated: "Utter updated",
        toolbar_name: "Utter title",
        create_button: "Create new utter",
        list_filter: "Registered utters",
        alternatives_text: "as alternatives",
        placeholder: "Ex: Utter_General_Greet, Utter_How_To_Register",
        name_good_pratice: "To identify utters clearly, use 'Utter_' and the title of the corresponding question, if any",
      },
      toolbar_name: "Save",
      list_filter: 'Filter',
      intent_form: {
        new_question: 'New intent'
      },
      uttter_form: {
        new_balloon: 'New balloon'
      },
      example_story:  'Example:'
    }
  }
}

export { messages }