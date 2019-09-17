import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import { IntentBalloon, UtterFirstBalloon, UtterBalloon } from '../styles/exampleBalloon';


const styles = {
    title: {
        alignSelf: 'center',
        margin: '14px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: "calc(100vh - 74px - 72px)",
        borderLeft:"solid 1px #ddd",
        alignItems: 'flex-start',
        width: '100%',
    }
}

class ExampleStory extends Component {
    exampleUtter(item, index) {
        return (
          <UtterFirstBalloon  key={'example_' + index}>
            <Typography variant="body2">{item.example}</Typography>
          </UtterFirstBalloon>
        );
    }

    exampleIntent(item, index) {
        return (
            <IntentBalloon key={'example_' + index}>
                <Typography variant="body2">{item.example}?</Typography>
            </IntentBalloon>
        );
    }

    render() {
        return (
            <div style={styles.container}>
                <Typography variant="body2" style={styles.title} color="primary">
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