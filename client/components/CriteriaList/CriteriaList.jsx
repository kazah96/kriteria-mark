import style from "./style";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "components/Input";
import Button from "components/Button";
import shortid from "shortid";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 6;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  display: "flex",
  background: "aliceblue",

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  //  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 2,
  width: 250,
});

class CriteriaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items || [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { onItemsChange } = this.props;
    const { items } = this.state;

    

    if (prevState.items !== items) {
      onItemsChange(items);
    }
  }

  onInputSubmit = value => {
    if (value === "") return;
    this.addItem(value);
  };

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const { onChange } = this.props;

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items,
    });
  }

  remove = id => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id),
    }));
  };

  addItem = content => {
    const { items } = this.state;

    this.setState({
      items: [...items, { content, id: shortid.generate() }],
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      {item.content}

                      <button
                        className={style.deleteButton}
                        onClick={() => this.remove(item.id)}
                      >
                        X
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Input
                placeholder="Введите критерий"
                onSubmit={this.onInputSubmit}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default CriteriaList;
