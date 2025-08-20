import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

export const useKeepAlive = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallRef = useRef<number>(0);

  const makeKeepAliveCall = async () => {
    try {
      // Simple query to keep database active
      const { data, error } = await supabase
        .from('user_logos')
        .select('id')
        .limit(1);
      
      if (error) {
        console.warn('Keep-alive call failed:', error);
      } else {
        console.log('Keep-alive call successful');
        lastCallRef.current = Date.now();
      }
    } catch (error) {
      console.warn('Keep-alive call error:', error);
    }
  };

  const startKeepAlive = () => {
    // Make initial call
    makeKeepAliveCall();
    
    // Set up interval for every 6 hours (4 times per day)
    intervalRef.current = setInterval(() => {
      makeKeepAliveCall();
    }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds
  };

  const stopKeepAlive = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Start keep-alive when component mounts
    startKeepAlive();

    // Cleanup on unmount
    return () => {
      stopKeepAlive();
    };
  }, []);

  // Also make calls on user interaction
  useEffect(() => {
    const handleUserActivity = () => {
      const now = Date.now();
      // Only make call if last call was more than 1 hour ago
      if (now - lastCallRef.current > 60 * 60 * 1000) {
        makeKeepAliveCall();
      }
    };

    // Listen for user interactions
    const events = ['click', 'scroll', 'keypress', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  return { makeKeepAliveCall };
};