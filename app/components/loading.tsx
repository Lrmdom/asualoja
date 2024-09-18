import React from 'react'

interface SpinnerProps {
    size?: number
    color?: string
    strokeWidth?: number
    speed?: number
}

export default function LoadingSpinner({
                                           size = 50,
                                           color = '#3b82f6',
                                           strokeWidth = 4,
                                           speed = 1,
                                       }: SpinnerProps) {
    return (
        <div className="inline-flex items-center justify-center" role="status">
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`animate-spin`}
                style={{ animationDuration: `${1 / speed}s` }}
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <path
                    className="opacity-75"
                    fill={color}
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

// Example usage
function Loading() {
    return (
        <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner size={64} color="#ef4444" strokeWidth={6} speed={1.5} />
        </div>
    )
}