import * as React from "react";

let infiniteScroll;
if (typeof window !== "undefined") {
  infiniteScroll = import("./components/infinite");
} else {
  infiniteScroll = (props: any) => <div>{props.children}</div>;
}

export default infiniteScroll;
