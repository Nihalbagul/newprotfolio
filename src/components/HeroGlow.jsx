const HeroGlow = () => {
  return (
    <>
      {/* Animated gradient orbs - simplified on mobile */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl md:blur-xl blur-md opacity-10 md:opacity-20 animate-blob pointer-events-none hidden sm:block" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl md:blur-xl blur-md opacity-10 md:opacity-20 animate-blob animation-delay-2000 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl md:blur-xl blur-md opacity-10 md:opacity-20 animate-blob animation-delay-4000 pointer-events-none hidden sm:block" />
      
      {/* Grid pattern overlay - lighter on mobile */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 md:opacity-30 pointer-events-none" />
    </>
  );
};

export default HeroGlow;

