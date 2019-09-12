import { connect } from "react-redux";
import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import { setNameItem } from "../actions/itemsAction";


class NameField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helper_text: "",
            name: ""
        };
    }

    isRepeatedName(items, name) {
        let founded = items.find((item) => (
            (item.name === name) &&
            (item.id !== this.props.id_item)
        ));

        let helper_text = (founded !== undefined ? "Por favor, insira um nome não repetido." : "");
        this.setState({ helper_text: helper_text });
    }

    hasSpecialCharacteres(name) {
        let helper_text = "";
        let regex = /^[\w\d_]+$/;

        if (!regex.test(name) && name.length > 0) {
            helper_text = "Use apenas letras sem acentos, números ou '_'";
        }

        this.setState({ helper_text: helper_text });

        return helper_text.length !== 0;
    }

    setName(items, name) {
        if (this.hasSpecialCharacteres(name)) {
            name = name.substr(0, name.length - 1);
        } else {
            this.isRepeatedName(items, name);
        }
        
        //this.props.setNameItem(name);
        this.setState({name: name});
    }

    render() {
        return (
            <TextField
                fullWidth
                type="text"
                id={this.props.label}
                value={this.state.name}
                label={this.props.label}
                helperText={this.state.helper_text}
                error={this.state.helper_text !== ""}
                onChange={(e) => this.setName(this.props.items, e.target.value)}
            />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setNameItem: (name) => dispatch(setNameItem(name))
});

export default connect(null, mapDispatchToProps)(NameField);
