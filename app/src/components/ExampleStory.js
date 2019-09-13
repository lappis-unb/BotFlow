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


    exampleUtter(text) {
        return (
            <div style={{ ...styles.utter, ...styles.box }}>
                {text.text}
            </div>
        );
    }


    exampleIntent(text) {
        return (
            <div style={{ ...styles.intent, ...styles.box }}>
                {text.text}
            </div>
        );
    }

    render() {
        return (
            <div style={styles.container}>
                <Typography variant="body2" style={styles.title}>Exemplo</Typography>
                {
                    this.props.story_example.map((item, index) => {
                        return item.type === "intent" ? this.exampleIntent(item) : this.exampleUtter(item);
                    })
                }
            </div>
        );
    }
}
const mapStateToProps = state => { return { ...state.story } };

export default connect(mapStateToProps)(ExampleStory);