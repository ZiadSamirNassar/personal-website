import React, { useState, useEffect } from 'react';

import '../style/Education.css';




    const DynamicEducation = () => {
        const [education, setEducation] = useState({
          degree: '',
          institution: '',
          duration: ''
        });

        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const loadData = async () => {
            try{
              const response = await import('../data/Cv');
              const { education } = response.default;
              
              setEducation({
                degree: education?.degree || '',
                institution: education?.institution || '',
                duration: education?.duration || ''
              });
            } catch (err) {
              setError('Failed to load education data');
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
          
          loadData();
        }, []);

        if (loading) return <div className="loading-spinner">Loading profile...</div>;
        if (error) return <div className="error-message">{error}</div>;
      
        return (
          <section className="education" id='education'>
            <h2>Education</h2>
            <div className="degree">
              <h3>{education.degree}</h3>
              <p>{education.institution}</p>
              <p>{education.duration}</p>
            </div>
          </section>
        );
      };



export default DynamicEducation;