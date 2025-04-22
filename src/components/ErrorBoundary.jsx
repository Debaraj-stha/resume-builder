
import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log("ErrorBoundary", error);
        this.setState({ error: error, errorInfo: errorInfo });
    }
    render() {
        return (
            <div>
                {this.state.hasError ? (
                    <div>
                        <h1>Something went wrong.</h1>
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {/* {this.state.errorInfo.componentStack} */}
                        </details>
                    </div>
                ) : (
                    this.props.children
                )}
            </div>
        )
    }
}
