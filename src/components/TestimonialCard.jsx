import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import testimonials from '../data/testimonials.json';
import '../styles/TestimonialCard.css';

const TestimonialCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  return (
    <div 
      className="testimonial-section"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
    >
      <div className="testimonial-carousel">
        {testimonials.map((item, index) => (
          <div 
            key={item.id} 
            className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="quote-icon">
              <Quote size={24} fill="currentColor" />
            </div>
            <p className="testimonial-text">"{item.quote}"</p>
            <div className="testimonial-author">
              <div className="author-info">
                <strong>{item.author}</strong>
                <span>{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="carousel-dots">
        {testimonials.map((_, index) => (
          <button 
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
