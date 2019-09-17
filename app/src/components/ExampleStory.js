import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';

const styles = {
    utter: {
        backgroundColor: '#fde9e6',
        margin: '8px 36px 8px 16px',
    },
    intent: {
        backgroundColor: '#dae8ea',
        margin: '8px 16px 8px 36px',
    },
    box: {
        padding: '8px 12px',
        borderRadius: '8px',
        alignSelf: 'stretch'
    },
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
        const examples = item.example.map((example, ex_index) =>
            <div key={'example_' + index + ex_index} style={{ ...styles.utter, ...styles.box }}>
                <Typography variant="body2">{example}</Typography>
            </div>
        )
        return examples;
    }

    exampleIntent(item, index) {
        return (
            <div key={'example_' + index} style={{ ...styles.intent, ...styles.box }}>
                <Typography variant="body2">{item.example}</Typography>
            </div>
        );
    }

    getExamples() {
        return this.props.content.map((item, index) => {
            return item.type === "intent" ? this.exampleIntent(item, index) : this.exampleUtter(item, index);
        })
    }

    render() {
        return (
            <div style={styles.container}>
                <Typography variant="body2" style={styles.title} color="primary">
                    {this.props.content.length !== 0 ? "Exemplo:" : "Não há exemplos"}
                </Typography>
                {
                    this.getExamples()
                }
            </div>
        );
    }
}
const mapStateToProps = state => { return { ...state.story } };

export default connect(mapStateToProps)(ExampleStory);