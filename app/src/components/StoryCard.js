import { Link } from 'react-router-dom'
import React, { Component } from "react";
import { Card } from '@material-ui/core';
import UtterIcon from '../icons/UtterIcon';
import IntentIcon from '../icons/IntentIcon';
import Typography from '@material-ui/core/Typography';

const styles = {
    intent: {
        color: '#4b3953',
        fontWeight: 'bold',
        margin: '0px 0px 2px 0px'
    },
    utter: {
        color: '#f26a53',
        margin: '2px 0px 2px 12px'
    },
    intent_icon: {
        fill: '#4b3953',
        marginRight: 8,
        verticalAlign: 'middle',
    },
    utter_icon: {
        fill: '#f26a53',
        marginRight: 8,
        verticalAlign: 'middle',
    },
    card: {
        background: 'white',
        margin: '0 8px 16px 8px',
        breakInside: 'avoid',
        padding: '16px'
    },
}

export default class StoryCard extends Component {

    getContent(content) {
        let list = content.map((item, index) => {
            if (item.type === "intent") {
                return (
                    <Typography key={'story_card_item_' + index} style={styles.intent} varant="body1" noWrap>
                        <IntentIcon style={styles.intent_icon} />
                        {item.name}
                    </Typography>
                )
            }
            else {
                return (
                    <Typography key={'story_card_item_' + index} style={styles.utter} varant="body1" noWrap>
                        <UtterIcon style={styles.utter_icon} />
                        {item.name}
                    </Typography>
                )
            }
        })
        return list;
    }

    render() {
        return (
            <Link to={'/stories/' + this.props.story.id} style={{ textDecoration: 'none' }}>
                <Card style={styles.card}>
                    {this.getContent(this.props.story.content)}
                </Card>
            </Link>
        );
    }
}
