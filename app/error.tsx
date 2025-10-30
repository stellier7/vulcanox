'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('[VULCANOX] Error caught by error boundary:', error);
  console.error('[VULCANOX] Error message:', error.message);
  console.error('[VULCANOX] Error stack:', error.stack);
  console.error('[VULCANOX] Error digest:', error.digest);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4">{error.message}</p>
        <button onClick={reset} className="bg-bronze text-black px-6 py-2 rounded">
          Try again
        </button>
      </div>
    </div>
  );
}

