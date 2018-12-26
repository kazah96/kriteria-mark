import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
import style from "./style";

class Example extends React.Component {
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
        <ReactDataGrid
          columns={this.generateColumns()}
          rowGetter={i => this.props.rows[i]}
          rowsCount={this.props.rows.length}
          onGridRowsUpdated={this.onGridRowsUpdated}
        />
      </div>
    );
  }
}
export default Example;
