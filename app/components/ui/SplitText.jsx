import React from 'react';
import { motion } from 'framer-motion';

const SplitText = ({
  text,
  className = '',
  delay = 0.05,
  duration = 0.6,
  ease = 'easeOut',
  splitType = 'chars',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  animationDelay = 0,
  charLayoutIds = {},
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: animationDelay,
        staggerChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: from,
    visible: {
      ...to,
      transition: { duration, ease },
    },
  };

  const splitText = (text, type) => {
    if (type === 'words') {
      return text.split(' ').map((word, index) => ({ word, key: index }));
    } else if (type === 'lines') {
        // This is a simplistic line split, might not match visual line breaks perfectly
        return text.split('\n').map((line, index) => ({ line, key: index }));
    }
    // Default to 'chars'
    return text.split('').map((char, index) => ({ char, key: index }));
  };

  const renderText = () => {
    if (splitType === 'words') {
      const words = text.split(' ');
      return words.map((word, index) => (
        <span key={index} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={childVariants}
              layoutId={charLayoutIds[charIndex]} // Apply layoutId if provided
              className={className} // Apply className to each character span
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ));
    }

    // Default to 'chars'
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={childVariants}
        layoutId={charLayoutIds[index]} // Apply layoutId if provided
        style={{ display: 'inline-block' }}
        className={className} // Pass className here
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {renderText()}
    </motion.span>
  );
};

export default SplitText;
