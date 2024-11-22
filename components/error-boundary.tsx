import { Component, ComponentChildren } from "preact";

interface ErrorBoundaryProps {
  children: ComponentChildren;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorInfo {
  componentStack: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static override getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 class="text-lg font-bold mb-2">Oops, something went wrong!</h2>
          <p>
            We're sorry for the inconvenience. Please try refreshing the page or
            contact support if the problem persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
