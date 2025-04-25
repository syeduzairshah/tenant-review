import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  setRating, 
  size = 'md',
  readonly = false 
}) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };
  
  const starSize = sizeMap[size];

  const handleClick = (newRating: number) => {
    if (!readonly && setRating) {
      setRating(newRating);
    }
  };

  const handleMouseEnter = (index: number) => {
    // Functionality for hover states if needed
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} focus:outline-none transition-colors duration-200`}
          disabled={readonly}
          aria-label={`Rate ${index} out of 5`}
        >
          <Star
            className={`${starSize} ${
              index <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'fill-transparent text-gray-300'
            } transition-colors duration-200`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;