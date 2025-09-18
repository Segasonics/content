// NavbarSkeleton.jsx
const NavbarSkeleton = () => {
  return (
    <header className="fixed top-0 w-full bg-black shadow-md z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center h-14 px-4 md:px-6">
        {/* Desktop Skeleton */}
        <div className="hidden md:flex items-center gap-4">
          {/* Link placeholders */}
          <div className="w-20 h-7 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-20 h-7 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="w-16 h-7 bg-gray-700 rounded-md animate-pulse"></div>

          {/* Admin button placeholder */}
          <div className="w-20 h-7 bg-gray-700 rounded-md animate-pulse"></div>

          {/* Avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-600 animate-pulse"></div>
        </div>

        {/* Mobile Hamburger Skeleton */}
        <div className="md:hidden flex items-center">
          <div className="w-8 h-8 bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarSkeleton;
