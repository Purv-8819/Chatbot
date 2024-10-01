export default function Loading() {
  return (
    <div className="flex h-10 w-full justify-center items-center space-y-4">
      {/* Shimmering text placeholder */}
      <div className="flex *:h-10 w-full bg-gray-300 rounded-md px-3 animate-pulse">
        {/* Loading text with bouncing dots */}
        <div className="flex items-center space-x-1 text-lg font-medium text-gray-500">
          <span>Generating Response</span>
          <span className="animate-bounce-1 text-4xl">.</span>
          <span className="animate-bounce-2 text-4xl">.</span>
          <span className="animate-bounce-3 text-4xl">.</span>
        </div>
      </div>
    </div>
  );
}
