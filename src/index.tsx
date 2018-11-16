import React from "react";
import ReactDom from "react-dom";
import Axios from "axios";
import InfiniteScroll from "./components/infinite";

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

    console.log(this.state.page);

    const commitList = commits.map(commit => {
      return (
        <div key={commit.sha}>
          <img width={200} height={200} src={commit.author.avatar_url} />
          <span>{commit.author.name}</span>
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
    <div>HELLO</div>
    <Example />
  </div>
);

ReactDom.render(RootElement, document.getElementById("react-app"));
