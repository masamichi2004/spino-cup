"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Home, Book, Users, Star, GitPullRequest, GitMerge } from 'lucide-react'
import { getRepo } from "@/src/feature/HomeNameMain/HomeName";
import { usePathname } from 'next/navigation';

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: Home, text: 'Dashboard' },
    { icon: Book, text: 'Repositories' },
    { icon: Users, text: 'Organizations' },
    { icon: Star, text: 'Starred' },
    { icon: GitPullRequest, text: 'Pull Requests' },
    { icon: GitMerge, text: 'Issues' },
  ];

  const name = usePathname().split('/')[2];

  const fetchRepos = async () => {
    const userId = name;
    const fetchedRepos = await getRepo(userId);
    if (fetchedRepos) {
      setRepos(fetchedRepos);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="">
      <button
        onClick={toggleMenu}
        className="top-4 left-4 p-2 bg-header text-menu rounded-md border-bordercolor border-1 border"
        aria-label="Toggle menu"
      >
        <Menu size={16} />
      </button>

      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 left-0 w-2/3 h-screen bg-white text-textcolor z-40 overflow-y-auto rounded-tr-xl"
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 p-2 text-white"
          aria-label="Close menu"
        >
          <X size={16} color='black'/>
        </button>

        <nav className="pt-16 px-4">
          <ul className="">
            {/* Map over hardcoded menuItems */}
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  <item.icon size={16} />
                  <span className='text-sm'>{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
          <hr className='w-full h-1'/>
          <ul className="">
            {/* Map over repos and display repo names */}
            {repos.map((repo, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className='text-sm'>{repo.name}</span>
                  <span className='text-sm'>{repo.userId}</span>
                </a>
              </li>
            ))}
          </ul>
          <hr className='w-full h-1'/>
          <ul className="">
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                <Home size={16} />
                <span className='text-sm'>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
