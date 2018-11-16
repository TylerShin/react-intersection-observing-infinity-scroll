import React from "react";
import "intersection-observer";

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  loadMoreFunc: Function;
  parentElement?: Element;
  loaderComponent?: React.ReactNode;
  thresholdHeight?: number;
}

class InfiniteScroll extends React.PureComponent<InfiniteScrollProps> {
  private thresholdNode: HTMLDivElement;
  private intersectionObserver: IntersectionObserver;

  public componentDidMount() {
    const { parentElement } = this.props;

    this.intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadItems();
          }
        });
      },
      {
        root: parentElement
      }
    );

    this.intersectionObserver.observe(this.thresholdNode);
  }

  public render() {
    return (
      <div>
        {this.props.children}
        {this.getThresholdNode()}
      </div>
    );
  }

  private getThresholdNode = () => {
    const { hasMore, thresholdHeight, loaderComponent } = this.props;

    if (!hasMore) {
      return null;
    }

    if (loaderComponent) {
      return (
        <div ref={el => (this.thresholdNode = el!)}>{loaderComponent}</div>
      );
    }

    return (
      <div
        ref={el => (this.thresholdNode = el!)}
        style={{
          height: thresholdHeight || 250,
          // TODO: REMOVE BELOW. IT'S FOR TEST ONLY
          backgroundColor: "red"
        }}
      />
    );
  };

  private loadItems = () => {
    const { isLoading, loadMoreFunc } = this.props;

    if (isLoading) {
      return;
    }

    loadMoreFunc();
  };
}

export default InfiniteScroll;
