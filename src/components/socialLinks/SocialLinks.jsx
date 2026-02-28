import React, { useEffect, useState } from 'react'
import './SocalLinks.css'

export default function SocialLinks() {
  const [socials, setSocials] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/socials.json')
      .then((response) => response.json())
      .then((data) => {
        setSocials(Array.isArray(data) ? data : (data.socials ?? []))
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching socials:', error)
        setLoading(false)
      })
  }, [])
  
  return (
    <div className="socials-container">
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