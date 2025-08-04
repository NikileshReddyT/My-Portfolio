'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const syntaxHighlightStyle = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: 'transparent',
    padding: '1rem',
    margin: 0,
    borderRadius: '0 0 0.5rem 0.5rem',
  },
};
import { FaCopy, FaCheck } from 'react-icons/fa';

const MarkdownCodeBlock = ({ node, inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';

  const handleCopy = () => {
    const codeString = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline) {
    // For plain text blocks, use a simple <pre> tag to ensure uniform color.
    if (language === 'text') {
      return (
        <div className="relative text-sm sm:text-base md:text-lg lg:text-xl rounded-lg bg-[var(--card-bg)] shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 ">
            <span className="text-[var(--text-color)] text-sm font-sans font-medium">{language}</span>
            <button
              onClick={handleCopy}
              className="flex items-center px-2 py-1 text-xs rounded-md bg-gray-700 hover:bg-gray-600 text-[var(--text-color)] transition-colors duration-200"
              aria-label="Copy code"
            >
              {copied ? <FaCheck className="mr-1 text-green-400" /> : <FaCopy className="mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="px-4 pt-2 pb-4 mb-0 overflow-x-auto scrollbar-hide">
            <code className="text-[var(--text-color)] text-base sm:text-lg md:text-xl whitespace-pre-wrap break-words">
              {String(children).replace(/\n$/, '')}
            </code>
          </pre>
        </div>
      );
    }

    // For code blocks with a specified language, use SyntaxHighlighter.
    return (
      <div className="relative my-4 rounded-lg bg-[var(--card-bg)] shadow-lg">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-[var(--text-color)] text-sm font-sans font-medium">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center px-2 py-1 text-xs rounded-md bg-gray-700 hover:bg-gray-600 text-[var(--text-color)] transition-colors duration-200"
            aria-label="Copy code"
          >
            {copied ? <FaCheck className="mr-1 text-green-400" /> : <FaCopy className="mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <SyntaxHighlighter
          style={syntaxHighlightStyle}
          language={language}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default MarkdownCodeBlock;
