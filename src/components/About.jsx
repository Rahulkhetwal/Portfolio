import { motion } from 'framer-motion';

const About = () => {
    const skills = [
    { name: 'Cloud Platforms (AWS/GCP)', level: 90, category: 'devops' },
    { name: 'Kubernetes & Docker', level: 88, category: 'devops' },
    { name: 'CI/CD Pipelines', level: 92, category: 'devops' },
    { name: 'Infrastructure as Code', level: 85, category: 'devops' },
    { name: 'Python', level: 90, category: 'ai-ml' },
    { name: 'Machine Learning', level: 85, category: 'ai-ml' },
    { name: 'Data Engineering', level: 80, category: 'ai-ml' },
    { name: 'MLOps', level: 82, category: 'ai-ml' },
  ];

  const experience = [
    {
      role: 'DevOps Engineer',
      company: 'Tech Innovations',
      duration: '2021 - Present',
      description: 'Architected and maintained cloud infrastructure on AWS, implemented CI/CD pipelines, and automated deployment processes. Led containerization efforts using Docker and orchestrated with Kubernetes.',
      technologies: ['AWS', 'Kubernetes', 'Terraform', 'GitHub Actions']
    },
    {
      role: 'AI/ML Engineer',
      company: 'Data Insights Co.',
      duration: '2019 - 2021',
      description: 'Developed and deployed machine learning models in production. Built data pipelines and implemented MLOps practices to streamline model training and deployment.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'MLflow']
    },
  ];
  
  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      institution: 'Doon Institute of Engineering and Technology',
      duration: 'September 2021 – July 2025',
      details: 'CGPA: 7.5',
      specialization: 'Pursuing'
    },
    {
      degree: 'Class XII (CBSE)',
      institution: 'Shri Guru Ram Rai Public School',
      duration: 'April 2019 – April 2021',
      details: 'Percentage: 77%',
      specialization: 'Science Stream'
    },
    {
      degree: 'Class X (CBSE)',
      institution: 'Bhagirathi Vidyalaya',
      duration: 'Completed April 2019',
      details: 'Percentage: 89.6%',
      specialization: ''
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            I'm a DevOps Engineer and AI/ML Specialist passionate about building scalable cloud infrastructure and 
            intelligent systems. I bridge the gap between development and operations while implementing 
            cutting-edge machine learning solutions in production environments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">DevOps Skills</h3>
              <div className="space-y-6">
                {skills
                  .filter(skill => skill.category === 'devops')
                  .map((skill, index) => (
                    <div key={`devops-${index}`}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-300">{skill.name}</span>
                        <span className="text-blue-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">AI/ML Skills</h3>
              <div className="space-y-6">
                {skills
                  .filter(skill => skill.category === 'ai-ml')
                  .map((skill, index) => (
                    <div key={`ai-ml-${index}`}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-300">{skill.name}</span>
                        <span className="text-blue-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800 p-8 rounded-xl border border-gray-700"
            >
              <h3 className="text-2xl font-semibold mb-6 text-white">Professional Experience</h3>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-6 relative">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-1"></div>
                    <h4 className="text-xl font-medium text-white">{exp.role}</h4>
                    <p className="text-blue-400 mb-2">{exp.company} • {exp.duration}</p>
                    <p className="text-gray-300 mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800 p-8 rounded-xl border border-gray-700"
            >
              <h3 className="text-2xl font-semibold text-purple-400 mb-6">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                    <div 
                      key={index} 
                      className="relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                    >
                      <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500 rounded-full"></div>
                      <div className="relative z-10">
                        <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                        <p className="text-blue-300 font-medium">{edu.institution}</p>
                        <div className="flex flex-wrap justify-between items-center mt-2 text-sm">
                          <span className="text-gray-400">{edu.duration}</span>
                          <span className="text-green-400 font-medium">{edu.details}</span>
                        </div>
                        {edu.specialization && (
                          <div className="mt-3">
                            <span className="inline-block bg-gray-700/50 text-purple-300 text-xs px-3 py-1 rounded-full">
                              {edu.specialization}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-8">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Download Resume
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
