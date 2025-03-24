
import React, { useRef, useEffect } from 'react';
import ReviewCard from '../ui/ReviewCard';

// Sample reviews data
const reviews = [
  {
    id: '1',
    name: 'Alex Johnson',
    date: 'September 15, 2023',
    rating: 5,
    comment: 'The Nike Air Max 270 is incredibly comfortable. I wear them all day and my feet never hurt. The design is also really cool, I get compliments all the time!'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    date: 'August 28, 2023',
    rating: 4,
    comment: 'These running shoes are exactly what I needed for my daily jogs. Great support and they look fantastic. Would definitely recommend to fellow runners.'
  },
  {
    id: '3',
    name: 'Michael Chen',
    date: 'October 2, 2023',
    rating: 5,
    comment: 'The quality of these shoes exceeded my expectations. I\'ve been a Nike fan for years, but these might be my favorite purchase yet. Worth every penny.'
  },
  {
    id: '4',
    name: 'Jennifer Lopez',
    date: 'July 12, 2023',
    rating: 4,
    comment: 'I bought these for my marathon training and they\'ve been great. Very breathable and supportive. The only reason I\'m not giving 5 stars is that they run slightly big.'
  }
];

const CustomerReviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (titleRef.current) {
            titleRef.current.classList.add('animate-fade-in');
          }
          if (reviewsRef.current) {
            reviewsRef.current.classList.add('animate-fade-in');
            
            // Animate each review with delay
            const reviewItems = reviewsRef.current.querySelectorAll('.review-item');
            reviewItems.forEach((review, index) => {
              setTimeout(() => {
                review.classList.add('animate-scale-in');
              }, 200 * index);
            });
          }
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto container-padding">
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read authentic reviews from athletes and customers who have experienced
            the quality and performance of Nike products
          </p>
        </div>
        
        <div 
          ref={reviewsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0"
        >
          {reviews.map((review) => (
            <div key={review.id} className="review-item opacity-0">
              <ReviewCard
                name={review.name}
                date={review.date}
                rating={review.rating}
                comment={review.comment}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
