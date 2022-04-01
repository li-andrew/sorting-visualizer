import React from "react";

class Bar extends React.Component {
  render() {
    if (!this.props.comp)
      return (
        <div
          className="bar"
          style={{
            height: `${this.props.len * 12}px`,
          }}
        ></div>
      );
    else
      return (
        <div
          className="bar"
          style={{
            height: `${this.props.len * 12}px`,
            backgroundColor: "#fc5185",
          }}
        ></div>
      );
  }
}

export default Bar;
