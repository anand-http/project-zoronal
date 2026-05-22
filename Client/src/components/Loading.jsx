
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center gap-3">
        
        {/* Spinner */}
        <div className="w-30 h-30 border-8 border-gray-200 border-t-violet-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-2lg text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;