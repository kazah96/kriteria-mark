import React from "react";
import propTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shortid from "shortid";

import { DataGrid, CriteriaList, Result } from "components";

import style from "./style";

const Page = ({ children }) => <div className={style.page}>{children}</div>;

const Selector = React.memo(({ children, name }) => (
  <div
    className={style.pageScroller}
    id={`${shortid.generate()}${name}`}
  >
    <div className={style.page}>
      {React.Children.map(children, child => child).find(
        w => w.props.name === name,
      )}
    </div>
  </div>
));

class App extends React.Component {
  state = {};

  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <div className={style.app}>
        <div className={style.pageWrapper}>
          <ReactCSSTransitionGroup
            transitionName={{
              ...style,
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <Selector name={this.state.page} key={this.state.page}>
              <Page name="criteriaPage">
                <CriteriaList key="criteriaPage" />
              </Page>
              <Page name="dataGrid">
                <DataGrid key="dataGrid" />
              </Page>
            </Selector>
          </ReactCSSTransitionGroup>
        </div>

        <button onClick={() => this.setState({ page: "criteriaPage" })}>
          {" "}
          crit
        </button>
        <button onClick={() => this.setState({ page: "dataGrid" })}>
          {" "}
          data
        </button>
      </div>
    );
  }
}

export default App;
