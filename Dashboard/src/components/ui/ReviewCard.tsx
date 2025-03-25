
import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { gsap } from 'gsap';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar?: string;
  delay?: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  rating,
  comment,
  avatar,
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  });

  useEffect(() => {
    const card = cardRef.current;
    if (isIntersecting && card) {
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 30,
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: delay,
          ease: "power3.out"
        }
      );
    }
  }, [isIntersecting, delay]);

  return (
    <div 
      ref={(el) => {
        // Assign to both refs
        if (el) {
          cardRef.current = el;
          if (typeof targetRef === 'function') {
            targetRef(el);
          } else if (targetRef && 'current' in targetRef) {
            targetRef.current = el;
          }
        }
      }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 opacity-0"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-nike-black text-white text-xl font-semibold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      
      <p className="text-gray-700 text-sm">{comment}</p>
    </div>
  );
};

export default ReviewCard;
