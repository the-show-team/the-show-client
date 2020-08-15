import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  async componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    if (
      process.env.REACT_APP_FINAL_SEQUENCE_ENV === "production" ||
      process.env.REACT_APP_FINAL_SEQUENCE_ENV === "staging"
    ) {
      //TODO: logをサーバにおくる
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>予期せぬエラーが発生しました</h1>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
