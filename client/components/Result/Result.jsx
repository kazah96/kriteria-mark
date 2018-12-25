import style from "./style";
import React, { Component } from "react";
import normalize from "../../logic/normalizeData";
import calculateMark from "../../logic/calculateMark";
import ReactDataGrid from "react-data-grid";

class Result extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      columns: [],
    };
  }

  submit = () => {
    const { items, criterionArray } = this.props;
    const normalizedItems = normalize(items);

    const w = normalizedItems.map(item => ({
      name: item.itemName,
      mark: calculateMark({
        normalizedData: item.values,
        criterionArray: Object.keys(criterionArray).map(crit => ({
          name: crit,
          weight: criterionArray[crit],
        })),
      }),
    }));

    this.makeRowsColumns(w);
  };

  render() {
    return (
      <div className={style.container}>
        <button onClick={this.submit}>submit</button>
        <ReactDataGrid
          columns={this.generateColumns()}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
        />
      </div>
    );
  }
}

export default Result;
