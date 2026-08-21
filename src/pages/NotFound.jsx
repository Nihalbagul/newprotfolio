import { motion } from 'framer-motion';


const NotFound = () => {

  const handleGoHome = () => {
    window.location.href = '/#hero';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black-50 to-black-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg mb-8"
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Animated 3D Box */}
        <motion.div
          className="mb-8 flex justify-center"
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 15, -15, 0],
          }}
          transition={{
            rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div className="w-32 h-32 border-4 border-primary-500/50 relative">
            <div className="absolute inset-0 border-4 border-secondary-500/50 transform rotate-45"></div>
            <div className="absolute inset-0 border-4 border-primary-500/30 transform -rotate-45"></div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={handleGoHome}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-full bg-white/5 text-gray-300 font-medium hover:bg-white/10 border border-white/10 transition-all duration-300"
          >
            Go Back
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12"
        >
          <p className="text-gray-500 text-sm mb-4">Or visit:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/#about" className="text-primary-400 hover:text-primary-300 transition-colors">About</a>
            <a href="/#projects" className="text-primary-400 hover:text-primary-300 transition-colors">Projects</a>
            <a href="/#contact" className="text-primary-400 hover:text-primary-300 transition-colors">Contact</a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;

