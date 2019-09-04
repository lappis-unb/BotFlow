import { connect } from "react-redux";
import ItemPage from "../pages/ItemPage"
import React, { Component } from "react";
import { getItems, createNewItem } from "../actions/itemsAction";
import IntentIcon from '../icons/IntentIcon';
import { Intent } from '../utils/DataFormat'

//const BASE = "https://botflow.api.lappis.rocks/";
//const BASE = "http://localhost:3000/";
const BASE = "http://192.168.100.87:8000/api/v1/projects/1/";

const INTENT_URL = BASE + "intents/";


class IntentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.props.getItems(INTENT_URL);
    this.props.createNewItem(new Intent());
  }

  setDataFormat(id = undefined, name = "", content = [""]) {
    return new Intent(id, name, content)
  }

  render() {
    return (
      <ItemPage
        mode="Intent"
        url={INTENT_URL}
        new_item={new Intent()}
        items={this.props.items}
        id_item={this.props.id_item}
        name_label="Nome da pergunta"
        icon={<IntentIcon />}
        name_item={this.props.name_item}
        button_text="Criar nova pergunta"
        setDataFormat={this.setDataFormat}
        old_item={this.props.old_utter}
        helper_text={this.props.helper_text}
        item_list_text="Perguntas cadastradas"
        current_item={this.props.current_utter}
        old_name_item={this.props.old_name_item}
        item_contents={this.props.item_contents}
        old_item_contents={this.props.old_item_contents}
        notification_text={this.props.notification_text}
        selected_item_position={this.props.selected_item_position}
      />
    )
  }
}

const mapStateToProps = state => { return { ...state.intentReducer } };

const mapDispatchToProps = dispatch => ({
  getItems: (url) => dispatch(getItems(url)),
  createNewItem: (new_item) => dispatch(createNewItem(new_item))
});

export default connect(mapStateToProps, mapDispatchToProps)(IntentPage);
