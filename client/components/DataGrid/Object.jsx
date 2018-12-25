import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
import style from "./style";

class Example extends React.Component {
  constructor(props) {
    super(props);
    const rows =
      props.items.length > 0
        ? props.items.map(item => ({
            name: item.itemName,
            ...item.values.reduce((p, c) => ({...p, [c.criterion]: c.value }), {}),
          }))
        : [];

    this.state = { rows };
  }

  componentDidUpdate(prevProps, prevState) {
    const { onItemsChange } = this.props;
    const { rows } = this.state;

    if (prevState.rows !== rows) {
      onItemsChange(rows);
    }
  }

  generateEmptyRow = () => {
    const { criteria } = this.props;
    return Object.keys(criteria).reduce(
      (prev, cur) => ({ ...prev, [cur]: " " }),
      {
        name: " ",
      },
    );
  };

  generateColumns = () => {
    const { criteria } = this.props;

    const cols = [
      { key: "name", name: "name", editable: true },
      ...Object.keys(criteria).map(item => ({
        key: item,
        name: item,
        editable: true,
      })),
    ];

    return cols;
  };

  addEmptyRow = () => {
    const emptyRow = this.generateEmptyRow();
    this.setState(prevState => ({
      rows: [...prevState.rows, emptyRow],
    }));
  };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  render() {
    return (
      <div className={style.table}>
        <button onClick={this.addEmptyRow}>AddRow</button>
        <ReactDataGrid
          columns={this.generateColumns()}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect
        />
      </div>
    );
  }
}
export default Example;
