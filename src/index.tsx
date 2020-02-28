import React, { FC, useRef, useEffect } from "react";

interface Props {
  hasMore: boolean;
  isLoading: boolean;
  loadMoreFunc: Function;
  parentElement?: Element;
  loaderComponent?: React.ReactNode;
  loaderHeight?: number;
  thresholdMargin?: string;
}

const InfiniteScroll: FC<Props> = ({
  hasMore,
  loaderComponent,
  loaderHeight,
  isLoading,
  loadMoreFunc,
  parentElement,
  thresholdMargin,
  children
}) => {
  const thresholdNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thresholdNode.current) return;
    const intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isLoading) {
            loadMoreFunc();
          }
        });
      },
      {
        root: parentElement || null,
        rootMargin: thresholdMargin || "0px"
      }
    );

    // caution
    intersectionObserver.observe(thresholdNode.current);
    return () => {
      thresholdNode.current &&
        intersectionObserver.unobserve(thresholdNode.current);
    };
  }, []);

  let content: JSX.Element | null = (
    <div
      ref={thresholdNode}
      style={{
        height: loaderHeight || 250
      }}
    />
  );
  if (!hasMore) {
    content = null;
  } else if (isLoading && loaderComponent) {
    content = <div ref={thresholdNode}>{loaderComponent}</div>;
  }

  return (
    <div>
      {children}
      {content}
    </div>
  );
};

export default InfiniteScroll;
