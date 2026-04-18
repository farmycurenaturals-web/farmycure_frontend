import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { footerLinks, socialLinks, contactInfo } from '../../data/navigation'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-forest text-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <span className="font-heading text-2xl font-bold text-white">
                  FarmyCure
                </span>
              </Link>
              <p className="font-body text-gray-300 text-sm leading-relaxed mb-6">
                Pure from farm, delivered fresh. We bring authentic organic products 
                straight from sustainable farms to your doorstep.
              </p>
              {/* Social Icons */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-sage transition-colors duration-300"
                    aria-label={social.name}
                  >
                    {social.icon === 'facebook' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5L14.5.5C10.45.5,10.5,3.89,10.5,4.5v2.96H7.5v4h3V24h4V11.5h3.85Z"/>
                      </svg>
                    )}
                    {social.icon === 'instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2.16c3.2,0,3.58.01,4.85.07,1.17.05,1.8.24,2.22.4.56.22.96.48,1.38.9.42.42.68.82.9,1.38.16.42.35,1.05.4,2.22.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.05,1.17-.24,1.8-.4,2.22-.22.56-.48.96-.9,1.38-.42.42-.82.68-1.38.9-.42.16-1.05.35-2.22.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.4-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.35-1.05-.4-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.4-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68,1.38-.9.42-.16,1.05-.35,2.22-.4,1.27-.06,1.65-.07,4.85-.07M12,0C8.74,0,8.33.01,7.05.07,5.78.13,4.9.33,4.14.63c-.78.3-1.44.71-2.1,1.37C1.38,2.66.97,3.32.67,4.1.37,4.86.17,5.74.11,7.01.05,8.29.04,8.7.04,11.96s.01,3.67.07,4.95c.06,1.27.26,2.15.56,2.91.3.78.71,1.44,1.37,2.1.66.66,1.32,1.07,2.1,1.37.76.3,1.64.5,2.91.56,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c1.27-.06,2.15-.26,2.91-.56.78-.3,1.44-.71,2.1-1.37.66-.66,1.07-1.32,1.37-2.1.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.78-.71-1.44-1.37-2.1C21.34,1.38,20.68.97,19.9.67c-.76-.3-1.64-.5-2.91-.56C15.71.05,15.3.04,12.04.04L12,0Z"/>
                        <path d="M12,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"/>
                        <circle cx="18.41" cy="5.59" r="1.44"/>
                      </svg>
                    )}
                    {social.icon === 'x' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )}
                    {social.icon === 'linkedin' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.3 8.25h4.4V24H.3V8.25zM8.2 8.25h4.21v2.15h.06c.59-1.11 2.03-2.28 4.18-2.28 4.47 0 5.3 2.95 5.3 6.79V24h-4.4v-7.96c0-1.9-.03-4.34-2.65-4.34-2.66 0-3.07 2.08-3.07 4.2V24H8.2V8.25z"/>
                      </svg>
                    )}
                    {social.icon === 'whatsapp' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.52 3.48A11.87 11.87 0 0012.06 0C5.47 0 .11 5.36.11 11.95c0 2.11.55 4.18 1.59 6.01L0 24l6.22-1.63a11.9 11.9 0 005.84 1.49h.01c6.58 0 11.94-5.36 11.94-11.95 0-3.19-1.24-6.18-3.49-8.43zM12.07 21.7a9.8 9.8 0 01-5-1.37l-.36-.22-3.69.97.99-3.59-.24-.37a9.78 9.78 0 01-1.51-5.18c0-5.41 4.4-9.81 9.82-9.81 2.62 0 5.08 1.02 6.93 2.87a9.74 9.74 0 012.87 6.94c0 5.41-4.4 9.81-9.81 9.81zm5.38-7.36c-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.66.14-.2.3-.75.95-.92 1.14-.17.2-.34.22-.63.08-.29-.14-1.24-.46-2.36-1.47-.87-.77-1.45-1.73-1.62-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.28-.48.1-.2.05-.37-.02-.52-.08-.14-.66-1.59-.91-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.08-.8.37s-1.04 1.01-1.04 2.46 1.06 2.85 1.21 3.05c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.71.22 1.36.19 1.88.12.57-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="font-body text-gray-300 hover:text-sage transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-3">
                {footerLinks.categories.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="font-body text-gray-300 hover:text-sage transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <a href={`mailto:${contactInfo.email}`} className="font-body text-gray-300 hover:text-sage transition-colors">
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <a href={`tel:${contactInfo.phone}`} className="font-body text-gray-300 hover:text-sage transition-colors">
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="font-body text-gray-300">
                    {contactInfo.address}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-sm text-gray-400">
              &copy; {currentYear} FarmyCure. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.support.slice(2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-body text-sm text-gray-400 hover:text-sage transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
