import { useState, useEffect } from 'react';

import '../style/Experience.css'; // Import your CSS file for styling

const DynamicExperience = () => {
  const [experience, setExperience] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../data/Cv');
        const { work_experience } = response.default;
        setExperience(work_experience || []);
      } catch (error) {
        setError('Failed to load experience data');
        console.error("Error loading experience data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <section className="experience-section" id='work_experience'>
      <h2 className="section-title">Work Experience</h2>
      
      <div className="timeline">
        {experience.map((job, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            
            <div className="timeline-content">
              <div className="job-header">
                <h3 className="job-title">
                  {job.position} | <span className="project-name">{job.project}</span>
                  {job.status && <span className="job-status">{job.status}</span>}
                </h3>
                <p className="job-duration">{job.duration}</p>
              </div>
              
              <div className="job-details">
                <ul className="responsibilities-list">
                  {job.responsibilities.map((item, i) => (
                    <ResponsibilityItem key={i} item={item} />
                  ))}
                </ul>
                
                {job.tech_stack?.length > 0 && (
                  <div className="tech-stack">
                    <span className="tech-label">Tech Stack:</span>
                    <div className="tech-tags">
                      {job.tech_stack.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Helper component for nested responsibility items
const ResponsibilityItem = ({ item }) => {
  if (typeof item === 'string') {
    return <li className="responsibility-item">{item}</li>;
  }

  return (
    <li className="nested-responsibility">
      <ul className="nested-list">
        {Object.entries(item).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default DynamicExperience;