import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  const checkIndex = (number) => {
    if (number < 0) {
      return people.length - 1;
    }
    if (number >= people.length) {
      return 0;
    }
    return number;
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkIndex(newIndex);
    });
  };

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkIndex(newIndex);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((index) => checkIndex(index + 1));
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  return <section className='section'>

    <div className='title'>
      <h2><span>//</span> reviews</h2>
    </div>
    <div className='section-center'>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        let position = 'nextSlide';
        if (personIndex === index) {
          position = 'activeSlide';
        }
        if (
          personIndex === index - 1 ||
          (index === 0 && personIndex === people.length - 1)
        ) {
          position = 'lastSlide';
        }
        return <article className={position} key={id}>
          <img className='person-img' src={image} alt={name} />
          <h4>{name}</h4>
          <p className='title'>{title}</p>
          <p className='text'>{quote}</p>
          <FaQuoteRight className='icon' />
        </article>
      })}
      <button className='prev' onClick={prevPerson}>
        <FiChevronLeft />
      </button>
      <button className='next' onClick={nextPerson}>
        <FiChevronRight />
      </button>
    </div>
  </section>;
}

export default App;
