
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sample timeline data
const timelineItems = [
  {
    id: '1',
    year: '1964',
    title: 'Blue Ribbon Sports',
    description: 'Phil Knight and Bill Bowerman founded Blue Ribbon Sports, which would later become Nike, Inc.',
    image: 'https://static.nike.com/a/images/w_1920,c_limit/375d687c-bba6-4c55-8e1f-0213d8303bdd/image.jpg'
  },
  {
    id: '2',
    year: '1971',
    title: 'The Swoosh',
    description: 'The iconic Nike Swoosh logo was designed by Carolyn Davidson, a graphic design student at Portland State University.',
    image: 'https://static.nike.com/a/images/w_1920,c_limit/87ffd3ce-7845-40ae-a1c6-f7445aa18b71/history-of-nike-and-the-nike-swoosh-logo.jpg'
  },
  {
    id: '3',
    year: '1978',
    title: 'First Air Technology',
    description: 'Nike introduces "Air" technology, with the Nike Tailwind being the first shoe to feature an air-cushioned sole.',
    image: 'https://static.nike.com/a/images/w_1920,c_limit/6a7dc7e5-1c86-44ee-923c-3115d383e6a9/6-iconic-shoes-and-designs-from-nike.png'
  },
  {
    id: '4',
    year: '1985',
    title: 'Air Jordan',
    description: 'The first Air Jordan basketball shoe is released, creating one of the most successful footwear collaborations in history.',
    image: 'https://static.nike.com/a/images/w_1920,c_limit/a44fae2d-1e2c-4c45-9bb0-211b8a921977/a-history-of-michael-jordan-and-air-jordan.jpg'
  },
  {
    id: '5',
    year: '1988',
    title: 'Just Do It',
    description: 'Nike launches the iconic "Just Do It" slogan, which becomes one of the most recognized taglines worldwide.',
    image: 'https://static.nike.com/a/images/w_1920,c_limit/fb82aa76-2353-4a6e-ab2c-8533174b9e57/just-do-it-the-origin-story.jpg'
  },
  {
    id: '6',
    year: '2000s',
    title: 'Global Expansion',
    description: 'Nike continues to expand globally and innovate with technologies like Flyknit, React, and ZoomX.',
    image: 'https://static.nike.com/a/images/w_1920,c_limit/e04d7edd-a07c-4a16-a1f3-7d1a10f775a2/how-nike-became-a-global-brand.jpg'
  }
];

const NikeHistory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Animate each timeline item with a staggered effect
    itemRefs.current.forEach((item, index) => {
      if (item) {
        const imgElement = item.querySelector('.timeline-image');
        const contentElement = item.querySelector('.timeline-content');
        
        // Create a timeline for each item
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse'
          }
        });
        
        // Add animations to the timeline
        tl.fromTo(
          item,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          0
        )
        .fromTo(
          imgElement,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7 },
          0.2
        )
        .fromTo(
          contentElement,
          { x: index % 2 === 0 ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7 },
          0.4
        );
      }
    });
    
    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto container-padding">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Legacy</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From humble beginnings to becoming a global icon, explore Nike's evolution through the decades
          </p>
        </div>
        
        <div ref={timelineRef} className="max-w-6xl mx-auto">
          {timelineItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`timeline-item relative mb-24 md:mb-32 ${index % 2 === 0 ? 'md:ml-0' : 'md:ml-auto'}`}
              ref={el => itemRefs.current[index] = el}
            >
              <div className={`md:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Image */}
                <div className="timeline-image md:w-1/2 mb-6 md:mb-0 overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                
                {/* Content */}
                <div className={`timeline-content md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-md relative">
                    <div className="text-3xl md:text-4xl font-bold text-nike-red mb-2">{item.year}</div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    
                    {/* Connector line */}
                    <div className={`hidden md:block absolute top-1/2 -mt-2 w-8 border-t-2 border-dashed border-nike-red
                      ${index % 2 === 0 ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'}`}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-nike-red z-10
                shadow-md
                ${index % 2 === 0 ? 'left-1/2 -ml-40' : 'left-1/2 ml-36'}"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NikeHistory;
