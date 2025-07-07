import Bugsnag from '@bugsnag/js';
import BugsnagPerformance from '@bugsnag/browser-performance';

// Initialize Bugsnag error tracking
Bugsnag.start({
  apiKey: 'a09bfa3eb88b6332d938aea41b927a8c',
  // Additional configuration options
  releaseStage: process.env.NODE_ENV || 'development',
  enabledReleaseStages: ['production', 'staging', 'development'],
  // Collect user information when available
  collectUserIp: false,
  // Enable debug mode to see what's happening
  logger: console,
});

// Initialize Bugsnag performance monitoring
BugsnagPerformance.start({
  apiKey: 'a09bfa3eb88b6332d938aea41b927a8c',
  // Additional performance configuration
  releaseStage: process.env.NODE_ENV || 'development',
  enabledReleaseStages: ['production', 'staging', 'development'],
});

// Test the integration
Bugsnag.notify(new Error('Test error from Bugsnag integration'));

export { Bugsnag, BugsnagPerformance };
