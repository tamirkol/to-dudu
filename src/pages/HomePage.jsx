import React, { useEffect, useRef } from 'react';
import { CheckList } from '../cmps/CheckList.jsx';

export function HomePage() {
  // Create an array of refs for each child
  const childRefs = useRef([]);

  useEffect(() => {
    // Iterate through the refs to add the animation class and delay
    childRefs.current.forEach((child, index) => {
      if (child) {
        child.style.animationDelay = `${index * 0.5}s`; // Set staggered delay
        child.classList.add('animate'); // Add animation class
      }
    });
  }, []); // Runs once when component mounts

  return (
    <section className="home-page">
      <h1 ref={el => (childRefs.current[0] = el)}>Welcome to To Dudu</h1>
      <p ref={el => (childRefs.current[1] = el)}>
        Your Personal Productivity Sidekick! Stay organized, keep track of your tasks, and achieve your goals with ease. 
        <br /><br />
        <strong>Easy Task Management:</strong> Create, edit, and organize tasks effortlessly.
        <br />
        <strong>Stay on Track:</strong> Set deadlines, priorities, and reminders to keep you moving forward.
        <br />
        <strong>Track Your Progress:</strong> Check off completed tasks and feel the satisfaction of getting things done.
        <br /><br />
        Let’s get started! What will you Dudu today?
      </p>
      <div className="content-container">
        <img
          ref={el => (childRefs.current[2] = el)}
          src={"./src/assets/img/to_dudu character.png"}
          alt="To Dudu Character"
          className="home-image"
        />
        <div ref={el => (childRefs.current[3] = el)}>
          <CheckList />
        </div>
      </div>
    </section>
  );
}
