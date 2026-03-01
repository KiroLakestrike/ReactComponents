import React, { useEffect, useState } from 'react'
import './SocalLinks.css'

export default function SocialLinks() {
  const [socials, setSocials] = useState([])
  const [loading, setLoading] = useState(true)
  
  
  // SocialLinks fetches the socials.json file from wherever it is hosted.
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/socials/')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log(data);  // Debug: Was kommt an?
        setSocials(Array.isArray(data.socials) ? data.socials : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);
  
  return (
    <div className="socials-container bottom">
      {loading && <div>Loading…</div>}
      
      {socials.map((social) => (
        <a
          key={social.name}
          data-social={social.name}
          style={
            ({
              '--accent-color': social.brandColor ?? social.BrandColor,
            })
          }
          href={social.url}
        >
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>{social.name}</title>
            <path d={social.svg} />
          </svg>
        </a>
      ))}
    </div>
  )
}