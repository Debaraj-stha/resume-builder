import  { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }
  

  render() {
    return (
      <div>
        {this.state.hasError ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 w-screen">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl w-full">
              <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">Something went wrong.</h1>
              <details className="text-sm text-gray-700 whitespace-pre-wrap">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo?.componentStack}
              </details>
            </div>
          </div>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}
