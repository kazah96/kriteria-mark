import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import "react-table/react-table.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  generateEmptyRow = () => {
    const { criteria } = this.props;
    return Object.keys(criteria).reduce((prev, cur) => ({ ...prev, [cur]: " " }), {
      name: " ",
    });
  };

  addRow = () => {
    console.log("asdfas");
    const emptyRow = this.generateEmptyRow();
    console.log(emptyRow);
    this.setState(prevState => ({
      data: [...prevState.data, emptyRow],
    }));
  };

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "First Name",
              accessor: "name",
              Cell: this.renderEditable,
            },
            ...Object.keys(this.props.criteria).map(item => ({
              Header: item,
              accessor: item,
              Cell: this.renderEditable,
            })),
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        
      </div>
    );
  }
}
export default App;
