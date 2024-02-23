import { Plus } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import Logout from './Logout'
import MobileSidebar from './MobileSidebar'

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <div>
          <Button size="sm" className="rounded-sm hidden md:block h-auto  py-1.5 px-2">
            Create
          </Button>
          <Button size="sm" className="rounded-sm block md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <Logout />
      </div>
    </nav>
  )
}

export default Navbar
