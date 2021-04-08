const messages = {
  pt: {
    translations: { // Mesmo valor usado nas configurações (defaultNS)
      menu_nav_bar: {
        dialogues: 'Diálogos',
        questions: 'Perguntas',
        answers: 'Respostas'
      },
      stories_page: {
        create_dialogue: "Criar novo diálogo",
      },
      stories_edit_page: {
        questions: 'Perguntas',
        answers: 'Respostas'
      },
      deleted: "Item apagado",
      no_result: "Nenhum item encontrado",
      repeated_name: "Tente um nome diferente, este já existe",
      no_special_char: "Use apenas letras sem acentos, números ou _",
      no_dialogs: "Clique nas perguntas e respostas para montar um diálogo com exemplos de interação esperados",
      delete_confirmation: "Apagar item?",
      exportar_conteudo: 'Exportar conteúdo',
      story: {
        created: "Diálogo criado",
        deleted: "Diálogo apagado",
        updated: "Diálogo atualizado",
        create_button: "Criar novo diálogo",
        first_element: "O diálogo deve começar com uma pergunta",
        two_intents: "Adicione uma resposta depois de cada pergunta",
      },
    intent: {
        created: "Pergunta criada",
        deleted: "Pergunta apagada",
        updated: "Pergunta atualizada",
        toolbar_name: "Título da pergunta",
        list_filter: "Perguntas cadastradas",
        create_button: "Criar nova pergunta",
        placeholder: "Ex: Geral_Cumprimentar, Servico_Como_Cadastrar",
        name_good_pratice: "Para identificar as perguntas claramente, indique o assunto principal e depois o tipo de pergunta, separado por '_'",
      },
    utter: {
        created: "Resposta criada",
        deleted: "Resposta apagada",
        selection: "Balões aparecem:",
        sequence_text: "em sequência",
        updated: "Resposta atualizada",
        toolbar_name: "Título da resposta",
        create_button: "Criar nova resposta",
        list_filter: "Respostas cadastradas",
        alternatives_text: "como alternativas",
        placeholder: "Ex: Resp_Geral_Cumprimentar, Resp_Servico_Como_Cadastrar",
        name_good_pratice: "Para identificar as respostas claramente, use 'Resp_' e o título da pergunta correspondente, se existir",
      }
    }
  }
}

export { messages }