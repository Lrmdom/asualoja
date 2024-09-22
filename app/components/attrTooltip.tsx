import React, {useState} from 'react';

const Tooltip = ({children, content, position = 'top'}) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={`
            tooltip absolute z-10 p-2 text-gray-600 text-xs rounded  shadow-lg
            opacity-100 transition-opacity duration-300  bg-background text-muted-foreground capitalize
            ${position === 'top' && 'bottom-full left-1/2 -translate-x-1/2'}
            ${position === 'bottom' && 'top-full left-1/2 -translate-x-1/2'}
            ${position === 'left' && 'right-full top-1/2 -translate-y-1/2'}
            ${position === 'right' && 'left-full top-1/2 -translate-y-1/2'}
          `}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;