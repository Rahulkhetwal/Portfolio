import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaCode, FaServer } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Replace with actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: null, message: '' });
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-blue-400 text-xl" />,
      title: 'Email',
      value: 'rahul@example.com',
      href: 'mailto:rahul@example.com',
      color: 'from-blue-600 to-blue-400'
    },
    {
      icon: <FaMapMarkerAlt className="text-purple-400 text-xl" />,
      title: 'Location',
      value: 'New Delhi, India',
      href: 'https://maps.google.com?q=New+Delhi',
      color: 'from-purple-600 to-purple-400'
    },
    {
      icon: <FaGithub className="text-pink-400 text-xl" />,
      title: 'GitHub',
      value: 'github.com/Rahulkhetwal',
      href: 'https://github.com/Rahulkhetwal',
      color: 'from-pink-600 to-pink-400'
    },
    {
      icon: <FaLinkedin className="text-blue-300 text-xl" />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/yourusername',
      href: 'https://linkedin.com/in/yourusername',
      color: 'from-blue-400 to-blue-200'
    }
  ];
  
  const expertise = [
    {
      icon: <FaServer className="text-blue-400" />,
      title: 'DevOps & Cloud',
      description: 'AWS, Kubernetes, Docker, CI/CD'
    },
    {
      icon: <FaCode className="text-purple-400" />,
      title: 'AI/ML Engineering',
      description: 'TensorFlow, PyTorch, MLOps'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-white">Contact Information</h3>
            <p className="text-gray-300">
              I'm currently looking for new opportunities in DevOps and AI/ML engineering. Whether you have a question or just want to say hi, I'll get back to you as soon as possible!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-300 group-hover:text-white transition-colors">{item.title}</h4>
                      <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="pt-4">
              <h4 className="font-semibold text-white mb-4">Areas of Expertise</h4>
              <div className="grid grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-white">{item.title}</h5>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">Send Me a Message</h3>
            
            {submitStatus.message && (
              <motion.div 
                className={`p-4 mb-6 rounded-lg ${
                  submitStatus.success 
                    ? 'bg-green-900/30 border border-green-800 text-green-300' 
                    : 'bg-red-900/30 border border-red-800 text-red-300'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitStatus.message}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-all"
                  placeholder="How can I help you?"
                  required
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
