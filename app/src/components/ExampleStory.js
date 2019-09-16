import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';

const styles = {
    utter: {
        backgroundColor: '#fde9e6',
        margin: '10px 50px 10px 10px',
    },
    intent: {
        backgroundColor: '#dae8ea',
        margin: '10px 10px 10px 50px',
    },
    box: {
        padding: '5px',
        borderRadius: '5px',
        alignSelf: 'stretch'
    },
    title: {
        alignSelf: 'center',
        margin: '14px',
        color: '#4b3953',
        fontSize: '14px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        borderLeft: '1px solid lightgrey'
    }
}

class ExampleStory extends Component {
    exampleUtter(item, index) {
        return (
            <div key={'example_' + index} style={{ ...styles.utter, ...styles.box }}>
                {item.example}
            </div>
        );
    }

    exampleIntent(item, index) {
        return (
            <div key={'example_' + index} style={{ ...styles.intent, ...styles.box }}>
                {item.example}
            </div>
        );
    }

    render() {
        return (
            <div style={styles.container}>
                <Typography variant="body2" style={styles.title}>
                    {this.props.content.length !== 0 ? "Exemplo:" : "Não há exemplos"}
                </Typography>
                {
                    this.props.content.map((item, index) => {
                        return item.type === "intent" ? this.exampleIntent(item, index) : this.exampleUtter(item, index);
                    })
                }
            </div>
        );
    }
}
const mapStateToProps = state => { return { ...state.story } };

export default connect(mapStateToProps)(ExampleStory);