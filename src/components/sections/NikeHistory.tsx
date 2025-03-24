
import React, { useRef, useEffect } from 'react';

// Sample timeline data
const timelineItems = [
  {
    id: '1',
    year: '1964',
    title: 'Blue Ribbon Sports',
    description: 'Phil Knight and Bill Bowerman founded Blue Ribbon Sports, which would later become Nike, Inc.'
  },
  {
    id: '2',
    year: '1971',
    title: 'The Swoosh',
    description: 'The iconic Nike Swoosh logo was designed by Carolyn Davidson, a graphic design student at Portland State University.'
  },
  {
    id: '3',
    year: '1978',
    title: 'First Air Technology',
    description: 'Nike introduces "Air" technology, with the Nike Tailwind being the first shoe to feature an air-cushioned sole.'
  },
  {
    id: '4',
    year: '1985',
    title: 'Air Jordan',
    description: 'The first Air Jordan basketball shoe is released, creating one of the most successful footwear collaborations in history.'
  },
  {
    id: '5',
    year: '1988',
    title: 'Just Do It',
    description: 'Nike launches the iconic "Just Do It" slogan, which becomes one of the most recognized taglines worldwide.'
  },
  {
    id: '6',
    year: '2000s',
    title: 'Global Expansion',
    description: 'Nike continues to expand globally and innovate with technologies like Flyknit, React, and ZoomX.'
  }
];

const NikeHistory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (titleRef.current) {
            titleRef.current.classList.add('animate-fade-in');
          }
          if (timelineRef.current) {
            timelineRef.current.classList.add('animate-fade-in');
            
            // Animate each timeline item with delay
            const items = timelineRef.current.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-slide-in-left');
              }, 300 * index);
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
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto container-padding">
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From humble beginnings to becoming a global icon, explore Nike's evolution through the decades
          </p>
        </div>
        
        <div ref={timelineRef} className="max-w-3xl mx-auto opacity-0">
          {timelineItems.map((item) => (
            <div key={item.id} className="timeline-item opacity-0 ml-4 mb-12">
              <div className="flex items-start">
                <div className="mr-6">
                  <div className="font-bold text-2xl text-nike-red">{item.year}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NikeHistory;
