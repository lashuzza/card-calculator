import { Link } from 'react-router-dom'

export function NavBar() {
  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Card Calculator
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-opacity-80">
              Home
            </Link>
            <Link to="/calculator" className="hover:text-opacity-80">
              Calculator
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 