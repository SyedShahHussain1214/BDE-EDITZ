import { motion } from 'framer-motion'
import { Award, Zap, Users } from 'lucide-react'
import YouTubeStats from './YouTubeStats'
import './About.css'

export default function About() {
  const stats = [
    { icon: Users, label: 'Experience', value: '5+' },
    { icon: Award, label: 'Projects', value: '500+' },
    { icon: Zap, label: 'Collaborations', value: '100+' },
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About <span className="accent">BDE EDITZ</span>
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>
              I'm a professional video editor and motion graphics designer specializing in creating
              stunning cinematic content. With over 5 years of experience in the industry, I've worked
              with hundreds of creators to bring their visions to life.
            </p>
            <p>
              My expertise includes:
            </p>
            <ul className="skills-list">
              <li>✓ Cinema 4D & After Effects Animation</li>
              <li>✓ Professional Color Grading</li>
              <li>✓ Motion Graphics & VFX</li>
              <li>✓ Video Editing & Production</li>
              <li>✓ Custom Preset Development</li>
              <li>✓ Tutorial Creation & Mentorship</li>
            </ul>
          </motion.div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="stat-icon">
                  <stat.icon size={32} />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* YouTube Live Statistics */}
        <YouTubeStats />
      </div>
    </section>
  )
}
