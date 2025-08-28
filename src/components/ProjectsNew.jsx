import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaCircle, FaExternalLinkAlt } from 'react-icons/fa';

// Language color mapping
const languageColors = {
  'JavaScript': '#f1e05a',
  'Python': '#3572A5',
  'Java': '#b07219',
  'TypeScript': '#2b7489',
  'Shell': '#89e051',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Dockerfile': '#384d54',
  'Jupyter Notebook': '#DA5B0B',
  'Other': '#6e40c9'
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">
            {project.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h3>
          <a 
            href={project.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="View on GitHub"
          >
            <FaGithub size={20} />
          </a>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 flex-1">
          {project.description || 'No description provided.'}
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {(project.topics || []).slice(0, 3).map((topic, idx) => (
              <span 
                key={idx} 
                className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50"
              >
                {topic}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-700 pt-3">
            <div className="flex items-center">
              <FaCircle 
                size={10} 
                className="mr-1" 
                style={{ color: languageColors[project.language] || languageColors.Other }} 
              />
              {project.language || 'Other'}
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <FaStar className="mr-1 text-yellow-400" />
                <span>{project.stargazers_count || 0}</span>
              </div>
              <div className="flex items-center">
                <FaCodeBranch className="mr-1 text-purple-400" />
                <span>{project.forks_count || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/Rahulkhetwal/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error('Failed to load repositories:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Loading my latest projects from GitHub...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Projects</h2>
          <p className="text-red-400 mb-8">{error}</p>
          <a 
            href="https://github.com/Rahulkhetwal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            View on GitHub <FaGithub className="ml-2" />
          </a>
        </div>
      </section>
    );
  }

  // Filter and sort projects to highlight DevOps and AI/ML related ones
  const featuredRepos = repos
    .filter(repo => !repo.fork) // Exclude forked repositories
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 6);

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A selection of my open-source projects showcasing my expertise in DevOps and AI/ML.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRepos.map((repo, index) => (
            <ProjectCard key={repo.id || index} project={repo} index={index} />
          ))}
        </div>

        {repos.length > 6 && (
          <div className="text-center mt-12">
            <a
              href="https://github.com/Rahulkhetwal?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors duration-300"
            >
              View All Projects on GitHub
              <FaGithub className="ml-2" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
