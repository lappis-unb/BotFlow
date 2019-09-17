import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import { IntentBalloon, UtterFirstBalloon, UtterBalloon } from '../styles/exampleBalloon';
import { message } from '../utils/messages';

const styles = {
    title: {
        alignSelf: 'center',
        margin: '14px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: "calc(100vh - 74px - 72px)",
        borderLeft: "solid 1px #ddd",
        alignItems: 'flex-start',
        width: '100%',
    }
}

class ExampleStory extends Component {
    exampleUtter(item, index) {
        let examples = item.example.map((example, ex_index) => {
            if (ex_index === 0 || item.example.length <= 1) {
                return (
                    <UtterFirstBalloon key={'example_' + index + ex_index}>
                        <Typography variant="body2">{example}</Typography>
                    </UtterFirstBalloon>
                )
            } else {
                return (
                    < UtterBalloon key={'example_' + index + ex_index} >
                        <Typography variant="body2">{example}</Typography>
                    </UtterBalloon >
                )
            }
        })

        return examples;
    }

    exampleSimpleUtter(item, index) {
        const examples = item.example.map((example, ex_index) =>
            <UtterBalloon key={'example_' + index + ex_index}>
                <Typography variant="body2">{example}</Typography>
            </UtterBalloon>
        )
        return examples;
    }

    exampleIntent(item, index) {
        return (
            <IntentBalloon key={'example_' + index}>
                <Typography variant="body2">{item.example}?</Typography>
            </IntentBalloon>
        );
    }

    getExamples() {

        let last_item = {};
        let content = this.props.content;

        for (let i = 0, size = content.length; i < size; i++) {
            if (last_item.type === "utter") {
                content[i] = { ...content[i], sequence: true };
            } else if (content[i].sequence) {
                content[i].sequence = false;
            }

            last_item = content[i];
        }

        return content.map((item, index) => {
            let element;
            if (item.type === "intent") { element = this.exampleIntent(item, index) }
            else if (item.sequence) { element = this.exampleSimpleUtter(item, index) }
            else { element = this.exampleUtter(item, index) };
            return element;
        })
    }

    render() {
        return (
            <div style={styles.container}>
                <Typography variant="body2" style={styles.title} color="primary">
                    {this.props.content.length !== 0 ? "Exemplo:" : message.no_examples}
                </Typography>
                {this.getExamples()}
            </div>
        );
    }
}
const mapStateToProps = state => { return { ...state.story } };

export default connect(mapStateToProps)(ExampleStory);