import React from "react";
import ReactDom from "react-dom";
import Axios from "axios";
import InfiniteScroll from "../src";

interface ExampleState {
  page: number;
  commits: any[];
  isLoading: boolean;
}

class Example extends React.Component<{}, ExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      page: 1,
      commits: [],
      isLoading: false
    };
  }

  public componentDidMount() {
    const { page } = this.state;

    this.fetchCommits(page);
  }

  public render() {
    const { commits, isLoading } = this.state;

    const commitList = commits.map(commit => {
      return (
        <div
          key={commit.sha}
          style={{
            width: 700,
            margin: "0 auto 30px auto",
            border: "1px solid #efefef",
            borderRadius: "5px",
            padding: 8
          }}
        >
          <img
            style={{
              display: "inline-block",
              verticalAlign: "top",
              margin: "0 8px 16px 0",
              borderRadius: "5px"
            }}
            width={50}
            height={50}
            src={commit.author.avatar_url}
          />
          <strong style={{ display: "inline-block", verticalAlign: "top" }}>
            {commit.commit.author.name}
          </strong>
          <div>{commit.commit.message}</div>
        </div>
      );
    });

    return (
      <div>
        <InfiniteScroll
          loadMoreFunc={this.fetchCommits}
          hasMore={true}
          isLoading={isLoading}
          thresholdMargin="100px"
          loaderComponent={
            <div
              style={{
                height: "300px",
                fontSize: "30px",
                textAlign: "center"
              }}
            >
              is loading.......
            </div>
          }
        >
          {commitList}
        </InfiniteScroll>
      </div>
    );
  }

  private fetchCommits = async (page: number) => {
    this.setState(prevState => ({ ...prevState, isLoading: true }));
    const res = await Axios(
      "https://api.github.com/repos/pluto-net/scinapse-web-client/commits",
      {
        headers: {
          Accept: "application/vnd.github.v3+json"
        },
        params: {
          type: "all",
          page: page || this.state.page
        }
      }
    );

    this.setState(prevState => ({
      ...prevState,
      commits: [...prevState.commits, ...res.data],
      isLoading: false,
      page: prevState.page + 1
    }));
  };
}

const RootElement = (
  <div>
    <Example />
  </div>
);

ReactDom.render(RootElement, document.getElementById("react-app"));
