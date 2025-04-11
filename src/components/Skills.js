import React, { useState, useEffect } from 'react';


import '../style/Skills.css';

    const DynamicSkills = () => {
        const [skills, setSkills] = useState({
          technical: [],
          languages: [],
          certifications: []
        });

        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        
        useEffect(() => {
          const fetchData = async () => {

            try {

              const response = await import('../data/Cv');
              const { technical, languages, certifications } = response.default.skills;
              setSkills({
                technical: technical || [],
                languages: languages || [],
                certifications: certifications || []
              });

            } catch (err) {
              setError('Failed to load skills data');
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
          
          fetchData();
        }, []);

        if (loading) return <div className="loading-spinner">Loading profile...</div>;
        if (error) return <div className="error-message">{error}</div>;
      
        return (
          <section className="skills" id='skills'>
            <h2>Skills</h2>
            <div className="skill-partition">
              <div>
                <h3>Technical:</h3>
                <ul>
                  {skills.technical.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3>languages:</h3>
                <ul>
                  {skills.languages.map((lang, index) => (
                    <li key={index}>{lang}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3>Certifications:</h3>
                <ul>
                  {skills.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      };
    



export default DynamicSkills;