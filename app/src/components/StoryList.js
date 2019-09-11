import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { reorderList, removeItem } from "../actions/storiesAction";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

class StoryList extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.props.item_contents,
            result.source.index,
            result.destination.index
        );

        this.props.reorderList(items)
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.item_contents.map((item, item_position) => (
                                <Draggable key={'list_' + item_position} draggableId={'item' + item_position} index={item_position}>
                                    {(provided, snapshot) => (
                                        <div>
                                            <div key={"card_" + item.id}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={
                                                    getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )
                                                }
                                            >
                                                {item.name} - {item.id}
                                            <button onClick={()=>this.props.removeItem(item_position)}>APAGAR</button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
const mapStateToProps = state => { return { ...state.storyReducer } };

const mapDispatchToProps = dispatch => ({
    reorderList: (arr) => dispatch(reorderList(arr)),
    removeItem: (item_position) => dispatch(removeItem(item_position))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
