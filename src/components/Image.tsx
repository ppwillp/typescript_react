import * as React from "react";

interface IProps {
  url: string;
}

interface IState {
  imageStatus: string;
}

class Image extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageStatus: "loading"
    };
  }

  handleImageLoading() {
    this.setState({ imageStatus: "completed" });
  }

  public render() {
    if (this.state.imageStatus == "completed") {
      return (
        <div>
          <img
            src={String(this.props.url)}
            width="150px"
            height="150px"
            alt="image"
            onLoad={this.handleImageLoading.bind(this)}
          />
        </div>
      );
    }
    return (
      <div className="" id="imageLocation">
        <img
          src={String(this.props.url)}
          width="150px"
          height="150px"
          alt="image"
          onLoad={this.handleImageLoading.bind(this)}
        />
      </div>
    );
  }
}

export default Image;
