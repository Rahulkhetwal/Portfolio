const GITHUB_API_URL = 'https://api.github.com';

export const fetchGitHubRepos = async (username) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }
    const repos = await response.json();
    
    // Filter out forked repositories and sort by stars
    return repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description provided',
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Other',
        updated: new Date(repo.updated_at).toLocaleDateString(),
        topics: repo.topics || []
      }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
};
