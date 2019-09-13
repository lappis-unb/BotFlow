import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';

const styles = {
    utter: {
        backgroundColor: '#fde9e6',
        alignSelf: 'flex-start'
    },
    intent: {
        backgroundColor: '#dae8ea',
        alignSelf: 'flex-end'
    },
    box: {
        padding: '5px',
        margin: '10px 50px',
    },
    title: {
        alignSelf: 'center',
        margin: '14px'
    }
}

class ExampleStory extends Component {


    exampleUtter(text) {
        return (
            <div style={{...styles.utter, ...styles.box}}>
                {text.text}
            </div>
        );
    }


    exampleIntent(text) {
        return (
            <div style={{...styles.intent, ...styles.box}}>
                {text.text}
            </div>
        );
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%'}}>
                <Typography variant="body2" color="primary" style={styles.title}>Exemplo</Typography>
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