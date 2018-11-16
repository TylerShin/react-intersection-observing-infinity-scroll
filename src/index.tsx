import React from "react";
import ReactDom from "react-dom";
import InfiniteScroll from "./components/infinite";

class Hello extends React.Component {
  public render() {
    return <div>HELLO WORLD</div>;
  }
}

const RootElement = (
  <div>
    <div>HELLO</div>
    <div style={{ height: "400vh" }}>DUMMY</div>
    <InfiniteScroll hasMore={true} isLoading={false}>
      <Hello />
    </InfiniteScroll>
  </div>
);

ReactDom.render(RootElement, document.getElementById("react-app"));
