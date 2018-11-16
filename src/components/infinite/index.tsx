import React from "react";

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
    const { thresholdHeight } = this.props;

    return (
      <div>
        {this.props.children}
        <div
          ref={el => (this.thresholdNode = el!)}
          style={{
            height: thresholdHeight || 250,
            // TODO: REMOVE BELOW. IT'S FOR TEST ONLY
            backgroundColor: "red"
          }}
        />
      </div>
    );
  }

  private loadItems = () => {
    const { isLoading, loadMoreFunc } = this.props;

    if (isLoading) {
      return;
    }

    loadMoreFunc();
  };
}

export default InfiniteScroll;
