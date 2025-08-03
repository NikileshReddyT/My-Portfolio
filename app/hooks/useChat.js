'use client';
import { useState, useCallback } from 'react';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message) => {
    try {
      setIsLoading(true);
      setError(null);

      // Add user message to UI
      const userMessage = {
        role: "user",
        parts: [{ text: message }]
      };
      setMessages(prev => [...prev, userMessage]);

      // Send message to our backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          history: messages
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Add bot response to UI
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          parts: [{ text: data.response }]
        }
      ]);

    } catch (err) {
      setError(err.message);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};

export default useChat;
