// LoadingSpinner.tsx
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
   
   <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-r from-[#25254e] via-[#f0eff2] to-[#fab619]">
  <img
    loading="lazy"
    src="./animatedcarloading.gif"
    width={200}
    height={200}
    alt="Loading animation"
  />
</div>

     );
};

export default LoadingSpinner;
