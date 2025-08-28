import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub size={20} />, url: 'https://github.com/Rahulkhetwal', label: 'GitHub' },
    { icon: <FaLinkedin size={20} />, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FaTwitter size={20} />, url: 'https://twitter.com/yourusername', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">Rahul Khetwal</h2>
            <p className="text-gray-400">DevOps & AI/ML Engineer</p>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center space-x-4 text-sm">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {currentYear} Rahul Khetwal. All rights reserved.</p>
          <p className="mt-2">Built with React, Tailwind CSS, and ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
