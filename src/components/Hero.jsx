import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCloud, FaRobot } from 'react-icons/fa';

const Hero = () => {
  const socialLinks = [
    { 
      icon: <FaGithub size={20} />, 
      url: 'https://github.com/Rahulkhetwal',
      label: 'GitHub'
    },
    { 
      icon: <FaLinkedin size={20} />, 
      url: 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn'
    },
  ];
  
  const expertise = [
    {
      icon: <FaCloud className="text-blue-400" />,
      title: 'Cloud & DevOps',
      description: 'AWS, Kubernetes, Docker'
    },
    {
      icon: <FaRobot className="text-purple-400" />,
      title: 'AI/ML Engineering',
      description: 'TensorFlow, PyTorch, MLOps'
    }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-20">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-blue-300 text-xs md:text-sm px-4 py-2 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              <span>Available for new opportunities</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Rahul Khetwal
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-300">
              DevOps & AI/ML Engineer
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              I design and implement <span className="text-blue-300 font-medium">scalable cloud infrastructure</span> and 
              <span className="text-purple-300 font-medium"> MLOps pipelines</span> that power intelligent applications. 
              With expertise in <span className="text-pink-300 font-medium">Kubernetes, AWS, and CI/CD</span>.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {expertise.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-gray-700">
                  <div className="text-xl">{item.icon}</div>
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="border-2 border-blue-400 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-400/10 transition-colors"
              >
                View My Work
              </a>
            </div>
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-800">
              <div className="text-sm text-gray-400">Connect with me:</div>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <div className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-70 group-hover:opacity-100 blur-lg transition-all duration-300 group-hover:duration-200"></div>
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/20 mix-blend-overlay"></div>
                  <img
                    src="https://github.com/Rahulkhetwal.png"
                    alt="Rahul Khetwal"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    style={{
                      filter: 'contrast(1.1) saturate(1.1)',
                      transform: 'translateZ(0)'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=Rahul+Khetwal&size=200&background=1E40AF&color=fff';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center space-x-2 group-hover:shadow-blue-500/30 transition-all duration-300 transform translate-y-0 group-hover:-translate-y-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span>Available for Work</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
