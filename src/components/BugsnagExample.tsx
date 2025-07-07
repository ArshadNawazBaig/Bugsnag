'use client';

import { Bugsnag } from '../lib/bugsnag';
import { useState } from 'react';

export default function BugsnagExample() {
  const [count, setCount] = useState(0);

  const triggerError = () => {
    // This will be captured by Bugsnag
    console.log('Triggering test error...');
    throw new Error('This is a test error from Bugsnag!');
  };

  const triggerAsyncError = async () => {
    try {
      // Simulate an async operation that fails
      await new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Async operation failed'));
        }, 1000);
      });
    } catch (error) {
      // Manually notify Bugsnag of the error
      Bugsnag.notify(error as Error, (event) => {
        event.addMetadata('custom', {
          source: 'async-operation',
          timestamp: new Date().toISOString(),
        });
      });
    }
  };

  const trackCustomEvent = () => {
    // Track a custom event
    Bugsnag.leaveBreadcrumb('Button clicked', {
      buttonName: 'custom-event',
      count: count,
    });
    setCount((prev) => prev + 1);
  };

  const triggerAnotherError = () => {
    // Another type of error
    console.log('Triggering another error...');
    const obj = null;
    obj.someMethod(); // This will cause a TypeError
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-gray-900">
        Bugsnag Integration Test
      </h2>

      <div className="space-y-3">
        <button
          onClick={triggerError}
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Trigger Test Error
        </button>

        <button
          onClick={triggerAsyncError}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Trigger Async Error
        </button>

        <button
          onClick={trackCustomEvent}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Track Custom Event (Count: {count})
        </button>

        <button
          onClick={triggerAnotherError}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Trigger TypeError
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Click the buttons above to test Bugsnag error tracking and performance
        monitoring. Check your Bugsnag dashboard to see the captured events.
      </p>
    </div>
  );
}
