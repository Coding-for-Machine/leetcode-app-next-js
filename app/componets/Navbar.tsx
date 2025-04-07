"use client"; // Bu muhim - komponentni client-side deb belgilaydi

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Head from 'next/head';



const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Foydalanuvchi autentifikatsiyasini tekshirish
  useEffect(() => {
    // Aslida bu yerda API orqali tekshirish bo'ladi
    // setIsAuthenticated(true/false);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <>
      <Head>
        <title>Kodlash Platformasi</title>
        <meta name="description" content="Kodlash ko'nikmalaringizni oshiring" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      {/* Orqa fon qoplamasi */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobil menyu */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center">
              <i className="fas fa-code mr-2"></i>KodPlatform
            </Link>
            <button onClick={toggleMobileMenu} className="text-slate-700">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2 mb-6">
              <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-100">
                <i className="fas fa-compass mr-2"></i>Asosiy
              </Link>
              <Link href="/problems" className="block px-3 py-2 rounded-lg hover:bg-slate-100">
                <i className="fas fa-list-ol mr-2"></i>Masalalar
              </Link>
              <Link href="/contest" className="block px-3 py-2 rounded-lg hover:bg-slate-100">
                <i className="fas fa-trophy mr-2"></i>Tanlovlar
              </Link>
              <Link href="/muhokama" className="block px-3 py-2 rounded-lg hover:bg-slate-100">
                <i className="fas fa-comments mr-2"></i>Muhokama
              </Link>
              <Link href="/test" className="block px-3 py-2 rounded-lg hover:bg-slate-100">
                <i className="fas fa-comments mr-2"></i>Test
              </Link>
            </div>
            
            <div className="px-3 py-4 border-t border-slate-200">
              <h3 className="font-medium text-slate-700 mb-3">Profil</h3>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center mb-4">
                    <Image 
                      src="/user.png" 
                      alt="Profil rasmi" 
                      width={40} 
                      height={40}
                      className="rounded-full border-2 border-white shadow-sm mr-3"
                    />
                    <div>
                      <p className="font-medium">Foydalanuvchi</p>
                      <p className="text-xs text-slate-500">Premium a'zo</p>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm mb-2 block text-center">
                    <i className="fas fa-crown mr-2"></i>Premiumga o'tish
                  </button>
                  <Link href="/chiqish" className="block text-center text-sm text-slate-600 hover:text-indigo-600 mt-2">
                    <i className="fas fa-sign-out-alt mr-1"></i>Chiqish
                  </Link>
                </>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" className="w-full block bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-medium text-center">
                    Kirish
                  </Link>
                  <Link href="/register" className="w-full block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm text-center">
                    Ro'yxatdan o'tish
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigatsiya paneli */}
      <nav className="backdrop-blur-md bg-white/80 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo va kompyuter menyusi */}
            <div className="flex items-center space-x-4">
              {/* Mobil menyu tugmasi */}
              <button onClick={toggleMobileMenu} className="lg:hidden text-slate-700">
                <i className="fas fa-bars text-xl"></i>
              </button>
              
              <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center">
                <i className="fas fa-code mr-2"></i>
                <span className="hidden sm:inline">KodPlatform</span>
              </Link>
              
              <div className="hidden lg:flex space-x-6">
                <Link href="/" className="px-1 py-2 text-sm font-medium flex items-center text-slate-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600">
                  <i className="fas fa-compass mr-2"></i>Asosiy
                </Link>
                <Link href="/problems" className="px-1 py-2 text-sm font-medium flex items-center text-slate-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600">
                  <i className="fas fa-list-ol mr-2"></i>Masalalar
                </Link>
                <Link href="/contest" className="px-1 py-2 text-sm font-medium flex items-center text-slate-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600">
                  <i className="fas fa-trophy mr-2"></i>Tanlovlar
                </Link>
                <Link href="/muhokama" className="px-1 py-2 text-sm font-medium flex items-center text-slate-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600">
                  <i className="fas fa-comments mr-2"></i>Muhokama
                </Link>
                <Link href="/test" className="block px-3 py-2 rounded-lg hover:bg-slate-100">
                <i className="fas fa-comments mr-2"></i>Test
              </Link>
              </div>
            </div>
            
            {/* Qidiruv va profil */}
            <div className="flex items-center space-x-3">
              <div className="relative hidden sm:block">
                <form action="/qidiruv" method="get">
                  <input 
                    type="text" 
                    name="q" 
                    placeholder="Qidirish..." 
                    className="border border-slate-300 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full max-w-xs bg-white"
                  />
                  <i className="fas fa-search absolute left-3 top-2.5 text-slate-400"></i>
                </form>
              </div>
              
              {isAuthenticated ? (
                <>
                  <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hidden sm:flex items-center">
                    <i className="fas fa-crown mr-2"></i>Premium
                  </button>
                  
                  <div className="flex items-center space-x-2 ml-2">
                    <button className="text-slate-500 hover:text-indigo-600 p-1">
                      <i className="far fa-bell text-lg"></i>
                    </button>
                    <div className="relative">
                      <button className="flex items-center" onClick={toggleUserMenu}>
                        <Image 
                          src="/user.png" 
                          alt="Profil rasmi" 
                          width={32} 
                          height={32}
                          className="rounded-full border-2 border-white shadow-sm"
                        />
                        <i className="fas fa-caret-down ml-1 text-slate-500 text-xs"></i>
                      </button>
                      
                      {/* Profil menyusi */}
                      {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                          <Link href="/profil" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                            <i className="fas fa-user mr-2"></i>Profil
                          </Link>
                          <Link href="/sozlamalar" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                            <i className="fas fa-cog mr-2"></i>Sozlamalar
                          </Link>
                          <div className="border-t border-slate-200"></div>
                          <Link href="/chiqish" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                            <i className="fas fa-sign-out-alt mr-2"></i>Chiqish
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="hidden sm:flex space-x-2">
                  <Link href="/login" className="px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:text-indigo-600">
                    Kirish
                  </Link>
                  <Link href="/register" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                    Ro'yxatdan o'tish
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;