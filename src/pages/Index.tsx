
import React from 'react';
import LoginForm from '@/components/login/LoginForm';
import MotionDiv from '@/components/ui-components/MotionDiv';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-navy via-ocean to-teal">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTItNGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0tNCAyaDJ2MmgtMnYtMnptLTIgNGgydjJoLTJ2LTJ6bTIgOGgtMnYtMmgydjJ6bTIgMGgtMnYtMmgydjJ6bTIgMHYtMmgydjJoLTJ6bTQgMGgtMnYtMmgydjJ6bTIgMHYtMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <header className="relative z-10 py-6 px-8 flex justify-between items-center">
        <MotionDiv animation="fadeIn">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 8H4V6H20V8Z" fill="white" />
                <path d="M18 12H6V10H18V12Z" fill="white" />
                <path d="M15 16H9V14H15V16Z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">InventTrack</span>
          </div>
        </MotionDiv>
        
        <MotionDiv animation="fadeIn" delay={300}>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
          </nav>
        </MotionDiv>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-8 gap-12">
        <MotionDiv 
          animation="slideUp" 
          delay={600} 
          className="w-full max-w-xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Smart Inventory Management System
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-md">
            Real-time tracking, seamless order management, and advanced analytics for your inventory needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 rounded-lg bg-teal hover:bg-teal/90 text-white font-medium shadow-lg transition-all duration-300 hover:-translate-y-1">
              Request Demo
            </button>
            <button className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium border border-white/20 transition-all duration-300 hover:-translate-y-1">
              Learn More
            </button>
          </div>
        </MotionDiv>
        
        <MotionDiv animation="fadeIn" delay={900} className="w-full max-w-md">
          <LoginForm />
        </MotionDiv>
      </main>
      
      <footer className="relative z-10 py-4 text-center text-white/60 text-sm">
        <p>© 2023 InventTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
