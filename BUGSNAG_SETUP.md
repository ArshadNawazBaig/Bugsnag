# Bugsnag Integration for Next.js

This project is configured to use [Bugsnag](https://www.bugsnag.com/) for error tracking and performance monitoring.

## Setup

1. **Install dependencies** (already done):

   ```sh
   yarn add @bugsnag/js @bugsnag/browser-performance
   ```

2. **Configuration:**

   - The Bugsnag client and performance monitoring are initialized in `src/lib/bugsnag.ts`.
   - The config is imported at the top of `src/app/layout.tsx` to ensure Bugsnag is started early in the app lifecycle.

3. **API Key:**

   - The current API key is set to `a09bfa3eb88b6332d938aea41b927a8c`.
   - To use your own project, replace this key in `src/lib/bugsnag.ts`.

4. **Testing Integration:**

   - The `BugsnagExample` component (`src/components/BugsnagExample.tsx`) demonstrates how to:
     - Trigger a synchronous error
     - Trigger an asynchronous error and manually notify Bugsnag
     - Track a custom event (breadcrumb)
   - This component is included on the main page (`src/app/page.tsx`).

5. **View Events:**
   - Visit your [Bugsnag dashboard](https://app.bugsnag.com/) to see captured errors and performance data.

## Usage

- To trigger a test error, click the "Trigger Test Error" button on the main page.
- To trigger an async error, click the "Trigger Async Error" button.
- To track a custom event, click the "Track Custom Event" button.

## Notes

- Bugsnag is only enabled for `production` and `staging` by default. You can adjust this in `src/lib/bugsnag.ts`.
- For more advanced configuration, see the [Bugsnag docs](https://docs.bugsnag.com/platforms/javascript/).
