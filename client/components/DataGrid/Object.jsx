import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
import style from "./style";
import cn from "classnames";

class Example extends React.Component {
  constructor(props) {
    super(props);
    const rows =
      props.items.length > 0
        ? props.items.map(item => ({
            name: item.itemName,
            ...item.values.reduce(
              (p, c) => ({ ...p, [c.criterion]: c.value }),
              {},
            ),
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
      { key: "name", name: "Название", editable: true },
      ...Object.keys(criteria).map(item => ({
        key: item,
        name: item,
        editable: true,
      })),
    ];

    return cols;
  };

  canAddRow = () => {
    const { criteria } = this.props;
    if (Object.keys(criteria).length === 0) return false;

    return true;
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
        <button
          disabled={!this.canAddRow()}
          className={cn(style.button, {
            [style.buttonEnabled]: this.canAddRow(),
          })}
          onClick={this.addEmptyRow}
        >
          Добавить запись
        </button>
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
