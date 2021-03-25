import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { message } from '../utils/messages';

class NameField extends Component {
  isRepeatedName(items, name) {
    if (items !== undefined) {
      const founded = items.find((item) => (
        (item.name === name)
                && (item.id !== this.props.item_id)
      ));

      return (founded !== undefined ? message.repeated_name : '');
    }
  }

  hasSpecialCharacteres(name) {
    let helper_text = '';
    const regex = /^[\w\d_]+$/;

    if (!regex.test(name) && name.length > 0) {
      helper_text = message.no_special_char;
    }

    return helper_text;
  }

  setName(items, name) {
    let helper_text = this.hasSpecialCharacteres(name);
    if (helper_text.length !== 0) {
      name = name.substr(0, name.length - 1);
    } else {
      helper_text = this.isRepeatedName(items, name);
    }

    this.props.setItemName(name, helper_text);
  }

  render() {
    return (
      <div>
        <TextField
          fullWidth
          type="text"
          autoFocus
          id={this.props.label}
          value={this.props.name}
          label={this.props.label}
          helperText={this.props.helper_text}
          placeholder={this.props.placeholder}
          error={this.props.helper_text !== ''}
          onChange={(e) => this.setName(this.props.items, e.target.value)}
        />
      </div>
    );
  }
}

export default NameField;
