import * as React from "react";

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  loadMoreFunc: Function;
  parentElement?: Element;
  loaderComponent?: React.ReactNode;
  loaderHeight?: number;
  thresholdMargin?: string;
}

class InfiniteScroll extends React.PureComponent<InfiniteScrollProps> {
  private thresholdNode: HTMLDivElement;
  private intersectionObserver: IntersectionObserver | null;

  public componentDidMount() {
    const { parentElement, thresholdMargin } = this.props;

    this.intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadItems();
          }
        });
      },
      {
        root: parentElement || null,
        rootMargin: thresholdMargin || "0px"
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
    const { hasMore, loaderHeight, loaderComponent } = this.props;

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
          height: loaderHeight || 250
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
