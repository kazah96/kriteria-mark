import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import style from "./style";

export default class Blurable extends React.Component {
  state = { refs: {} };

  static propTypes = {
    offsetY: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {};

  componentDidMount() {
    this.checkCollision();
  }

  componentWillReceiveProps = () => {};

  shouldComponentUpdate(props, prevState) {
    const { offsetY } = this.props;
    const { blurredRefId } = this.state;

    if (blurredRefId !== prevState.blurredRefId) {
      return true;
    }

    if (offsetY !== props.offsetY) {
      this.checkCollision();
    }

    return false;
  }

  checkCollision = () => {
    const { blurredRefId } = this.state;
    const newId = this.findIdByOffset();

    if (blurredRefId !== newId) {
      this.setState({ blurredRefId: newId });
    }
  };

  findIdByOffset = () => {
    const { refs } = this.state;
    return Object.keys(refs).find(ref => {
      const bounds = refs[ref].getBoundingClientRect();
      const h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0,
      );

      const yOffset = 100;
      if (h / 3 - yOffset < bounds.y + bounds.height && h / 3 > bounds.y) {
        return ref;
      }

      return undefined;
    });
  };

  addRef = (id, ref) => {
    this.setState(prev => ({ refs: { ...prev.refs, [id]: ref } }));
  };

  scrollTo = id => {
    const { blurredRefId, refs } = this.state;

    if (id === blurredRefId ) return;

    const elOffset = refs[id].offsetTop;

    console.log({ blurredRefId, getRect: refs[id] });

    window.scrollTo({
      top: elOffset-70,
      behavior: "smooth",
    });
  };

  render() {
    const { children } = this.props;
    const { blurredRefId } = this.state;

    return (
      <>
        {children.map((child, key) => {
          const id = `${key}`;
          return (
            <div
              onClick={() => this.scrollTo(id)}
              name={id}
              key={id}
              ref={elem => this.addRef(id, elem)}
              className={cn({
                [style.blur]: blurredRefId ? blurredRefId !== id : id !== "0",
                [style.item]: true,
              })}
            >
              {child}
            </div>
          );
        })}
      </>
    );
  }
}
