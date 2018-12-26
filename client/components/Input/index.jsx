import React, { PureComponent } from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import style from "./style";

class Input extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
  };

  static defaultProps = {
    placeholder: "text",
    className: "",
    onSubmit: () => {},
    onChange: () => {},
  };

  constructor() {
    super();
    this.state = {
      value: "",
    };
  }

  componentDidMount() {
  }

  onKeyDown = event => {
    const { onSubmit } = this.props;
    const { value } = this.state;

    if (event.key === "Enter") {
      onSubmit(value);
    }
  };

  onChange = event => {
    const {
      target: { value },
    } = event;

    const { onChange } = this.props;

    this.setState({ value }, () => onChange(value));
  };

  render() {
    const { className, placeholder } = this.props;
    const { value } = this.state;

    return (
      <input
        className={cn({ [style.input]: true, [className]: true })}
        value={value}
        onChange={event => this.onChange(event)}
        onKeyDown={this.onKeyDown}
        placeholder={placeholder}
      />
    );
  }
}

export default Input;
