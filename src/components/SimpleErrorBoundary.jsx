import React from 'react';

class SimpleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, info) {
    console.error('Error caught by SimpleErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-4">
              There was an error loading this page. Try refreshing or going back to the home page.
            </p>
            <pre className="text-xs bg-gray-100 p-3 rounded text-left overflow-auto max-h-40">
              {this.state.error?.message}
            </pre>
            <div className="mt-6">
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
              >
                Go to Home
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="ml-3 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SimpleErrorBoundary; 