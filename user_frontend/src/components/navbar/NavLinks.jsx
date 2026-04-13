import { NavLink } from 'react-router-dom'
import { navLinks } from '../../data/navigation'

const NavLinks = ({ isTransparent = false, onClick }) => {
  return (
    <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
      {navLinks.map((link) => (
        <li key={link.path}>
          <NavLink
            to={link.path}
            onClick={onClick}
            className={({ isActive }) => `
              font-body font-medium text-base
              transition-colors duration-300
              relative
              ${isTransparent
                ? isActive
                  ? 'text-sage'
                  : 'text-white hover:text-sage'
                : isActive
                  ? 'text-forest'
                  : 'text-text-primary hover:text-forest'
              }
              after:content-['']
              after:absolute
              after:left-0
              after:bottom-[-4px]
              after:w-0
              after:h-[2px]
              after:transition-all
              after:duration-300
              ${isActive ? 'after:w-full' : 'hover:after:w-full'}
              ${isTransparent ? 'after:bg-sage' : 'after:bg-forest'}
            `}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default NavLinks
