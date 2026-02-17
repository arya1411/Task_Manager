import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineCheckCircle, 
  HiChevronRight
} from 'react-icons/hi';
import Aurora from '../../components/Backgrounds/Aurora';

const HomePage = () => {
  return (
    <div className="bg-[#0a0a0a] relative overflow-hidden">
      {/* Content wrapper */}
      <div className="relative z-10">
      {/* Hero Section with Aurora Background */}
      <div className="relative h-[min(100vh,800px)]">
        {/* Aurora Background - Hero Only */}
        <div className="absolute inset-0 w-full h-full">
          <Aurora 
            colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </div>

        {/* Grid Frame Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left vertical dashed line */}
          <div className="absolute left-[5%] top-0 h-full w-px border-l border-dashed border-white/10" />
          
          {/* Right vertical dashed line */}
          <div className="absolute right-[5%] top-0 h-full w-px border-l border-dashed border-white/10" />
          
          {/* Top horizontal dashed line */}
          <div className="absolute top-[12%] left-0 w-full h-px border-t border-dashed border-white/10" />
          
          {/* Bottom horizontal dashed line */}
          <div className="absolute bottom-[12%] left-0 w-full h-px border-t border-dashed border-white/10" />
          
          {/* Corner dots - top left */}
          <div className="absolute left-[5%] top-[12%] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/40 rounded-full" />
          
          {/* Corner dots - top right */}
          <div className="absolute right-[5%] top-[12%] translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/40 rounded-full" />
          
          {/* Corner dots - bottom left */}
          <div className="absolute left-[5%] bottom-[12%] -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-white/40 rounded-full" />
          
          {/* Corner dots - bottom right */}
          <div className="absolute right-[5%] bottom-[12%] translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-white/40 rounded-full" />
        </div>

        {/* Hero Content */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 h-full flex flex-col items-center justify-center">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm text-blue-400 font-medium">New:</span>
              <span className="text-sm text-white/80">Powerful Team Collaboration</span>
              <HiChevronRight className="text-white/60 text-sm" />
            </div>

            {/* Main Title - Serif Style */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white leading-[1.1] mb-6 tracking-tight italic">
              Integrated Team And
              <span className="block">Task Management</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
              Streamline your workflow, collaborate seamlessly, and achieve<br className="hidden md:block" />
              your goals faster with our all-in-one task management<br className="hidden md:block" />
              platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-8">
              <Link 
                to="/login"
                className="bg-white text-black font-medium px-10 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          {/* Trust Badge - positioned lower */}
          <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 text-white/40 text-sm">
            <div className="w-4 h-4 border border-white/30 rounded-full flex items-center justify-center">
              <HiOutlineCheckCircle className="text-xs" />
            </div>
            <span>Secure & reliable. Free to get started.</span>
          </div>
        </section>
      </div>

      {/* Features Section - How It Works */}
      <section className="bg-[#0a0a0a] py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-medium mb-8">
            Manage your tasks in four simple steps
          </h2>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 - Create */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col min-h-[280px]">
              <h3 className="text-xl text-white font-semibold mb-2">Create</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-auto">
                Create tasks with details, set priorities, add deadlines, and attach files—all in one place.
              </p>
              {/* Illustration */}
              <div className="flex items-center justify-center mt-4">
                <svg className="w-20 h-20 text-white/80" viewBox="0 0 100 100" fill="none">
                  {/* Feather/Quill */}
                  <path d="M70 20C55 25 45 40 40 55C38 62 36 70 35 78L32 82L30 80C32 70 35 60 40 50C48 35 60 25 75 20L70 20Z" fill="currentColor" fillOpacity="0.9"/>
                  <path d="M35 78L32 82L28 85C28 85 30 75 35 65C40 55 48 45 60 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  {/* Paper */}
                  <rect x="20" y="70" width="25" height="18" rx="2" fill="white" fillOpacity="0.2"/>
                  <path d="M25 75h15M25 79h12M25 83h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
                </svg>
              </div>
            </div>

            {/* Card 2 - Assign */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col min-h-[280px]">
              <h3 className="text-xl text-white font-semibold mb-2">Assign</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-auto">
                Assign tasks to team members, set roles, and collaborate seamlessly across your organization.
              </p>
              {/* Illustration */}
              <div className="flex items-center justify-center mt-4">
                <svg className="w-20 h-20 text-white/80" viewBox="0 0 100 100" fill="none">
                  {/* Team/Users */}
                  <circle cx="50" cy="35" r="12" fill="white" fillOpacity="0.9"/>
                  <circle cx="50" cy="35" r="8" fill="currentColor" fillOpacity="0.3"/>
                  <path d="M30 70c0-11 9-20 20-20s20 9 20 20" fill="white" fillOpacity="0.8"/>
                  {/* Left person */}
                  <circle cx="25" cy="45" r="8" fill="currentColor" fillOpacity="0.5"/>
                  <path d="M12 75c0-8 6-14 13-14s13 6 13 14" fill="currentColor" fillOpacity="0.4"/>
                  {/* Right person */}
                  <circle cx="75" cy="45" r="8" fill="currentColor" fillOpacity="0.5"/>
                  <path d="M62 75c0-8 6-14 13-14s13 6 13 14" fill="currentColor" fillOpacity="0.4"/>
                  {/* Connection lines */}
                  <path d="M38 40l-8 5M62 40l8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
                </svg>
              </div>
            </div>

            {/* Card 3 - Track */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col min-h-[280px]">
              <h3 className="text-xl text-white font-semibold mb-2">Track</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-auto">
                Monitor progress in real-time with visual dashboards, status updates, and notifications.
              </p>
              {/* Illustration */}
              <div className="flex items-center justify-center mt-4">
                <svg className="w-20 h-20 text-white/80" viewBox="0 0 100 100" fill="none">
                  {/* Checklist paper */}
                  <rect x="25" y="25" width="45" height="55" rx="4" fill="white" fillOpacity="0.15" transform="rotate(-8 25 25)"/>
                  <rect x="30" y="20" width="45" height="55" rx="4" fill="white" fillOpacity="0.9"/>
                  {/* Checkboxes */}
                  <rect x="36" y="30" width="10" height="10" rx="2" stroke="#10b981" strokeWidth="2" fill="#10b981" fillOpacity="0.2"/>
                  <path d="M39 35l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="50" y="32" width="20" height="3" rx="1" fill="currentColor" fillOpacity="0.3"/>
                  
                  <rect x="36" y="45" width="10" height="10" rx="2" stroke="#10b981" strokeWidth="2" fill="#10b981" fillOpacity="0.2"/>
                  <path d="M39 50l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="50" y="47" width="18" height="3" rx="1" fill="currentColor" fillOpacity="0.3"/>
                  
                  <rect x="36" y="60" width="10" height="10" rx="2" stroke="#f59e0b" strokeWidth="2" fill="#f59e0b" fillOpacity="0.2"/>
                  <rect x="50" y="62" width="15" height="3" rx="1" fill="currentColor" fillOpacity="0.3"/>
                  
                  {/* Progress indicator */}
                  <rect x="65" y="55" width="6" height="30" rx="1" fill="currentColor" fillOpacity="0.6" transform="rotate(25 65 55)"/>
                  <path d="M80 78l-5 8 8-5-3-3z" fill="currentColor" fillOpacity="0.4"/>
                </svg>
              </div>
            </div>

            {/* Card 4 - Complete */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col min-h-[280px]">
              <h3 className="text-xl text-white font-semibold mb-2">Complete</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-auto">
                Mark tasks done, generate reports, and celebrate your team's achievements.
              </p>
              {/* Illustration */}
              <div className="flex items-center justify-center mt-4">
                <svg className="w-20 h-20 text-white/80" viewBox="0 0 100 100" fill="none">
                  {/* Trophy/Success */}
                  <path d="M35 30h30v10c0 10-5 20-15 25-10-5-15-15-15-25V30z" fill="white" fillOpacity="0.9"/>
                  <path d="M35 35h-10c0 10 5 15 10 15v-15z" fill="currentColor" fillOpacity="0.5"/>
                  <path d="M65 35h10c0 10-5 15-10 15v-15z" fill="currentColor" fillOpacity="0.5"/>
                  <rect x="45" y="65" width="10" height="8" fill="currentColor" fillOpacity="0.6"/>
                  <rect x="38" y="73" width="24" height="5" rx="2" fill="currentColor" fillOpacity="0.7"/>
                  {/* Star */}
                  <path d="M50 40l2 4 4 0.5-3 3 0.5 4.5-3.5-2-3.5 2 0.5-4.5-3-3 4-0.5 2-4z" fill="#fbbf24"/>
                  {/* Sparkles */}
                  <circle cx="30" cy="25" r="2" fill="currentColor" fillOpacity="0.4"/>
                  <circle cx="70" cy="25" r="1.5" fill="currentColor" fillOpacity="0.3"/>
                  <circle cx="25" cy="50" r="1.5" fill="currentColor" fillOpacity="0.3"/>
                  <circle cx="75" cy="50" r="2" fill="currentColor" fillOpacity="0.4"/>
                  <path d="M78 30l1 2 2 0.5-1.5 1.5 0.5 2-2-1-2 1 0.5-2-1.5-1.5 2-0.5 1-2z" fill="currentColor" fillOpacity="0.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Comparison Section */}
      <section className="bg-[#0a0a0a] py-12 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-medium mb-4">
            Performance that stands out
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            We benchmark our Task Manager against traditional tools like Email, Outlook, and Excel Sheets. The results speak for themselves.
          </p>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Task Allocation</h3>
              <div className="space-y-3">
                {/* Task Manager */}
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium w-24 text-sm">Task Manager</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: '96%'}}></div>
                  </div>
                  <span className="text-white/70 text-sm w-10 text-right">96.5</span>
                </div>
                {/* Outlook */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60 w-24 text-sm">Outlook</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{width: '52%'}}></div>
                  </div>
                  <span className="text-white/50 text-sm w-10 text-right">52.3</span>
                </div>
                {/* Gmail */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60 w-24 text-sm">Gmail</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <span className="text-white/50 text-sm w-10 text-right">45.8</span>
                </div>
                {/* Excel Sheet */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60 w-24 text-sm">Excel Sheet</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{width: '38%'}}></div>
                  </div>
                  <span className="text-white/50 text-sm w-10 text-right">38.2</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Easy to Access</h3>
              <div className="space-y-3">
                {/* Task Manager */}
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium w-24 text-sm">Task Manager</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <span className="text-white/70 text-sm w-10 text-right">94.1</span>
                </div>
                {/* Gmail */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60 w-24 text-sm">Gmail</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <span className="text-white/50 text-sm w-10 text-right">78.4</span>
                </div>
                {/* Outlook */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60 w-24 text-sm">Outlook</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{width: '71%'}}></div>
                  </div>
                  <span className="text-white/50 text-sm w-10 text-right">71.6</span>
                </div>
                {/* Excel Sheet */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60 w-24 text-sm">Excel Sheet</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{width: '55%'}}></div>
                  </div>
                  <span className="text-white/50 text-sm w-10 text-right">55.2</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Progress Tracking</h3>
              <div className="space-y-3">
                {/* Task Manager */}
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium w-24 text-sm">Task Manager</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: '98%'}}></div>
                  </div>
                  <span className="text-white/70 text-sm w-10 text-right">98.3</span>
                </div>
                {/* Excel Sheet */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60 w-24 text-sm">Excel Sheet</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{width: '62%'}}></div>
                  </div>
                  <span className="text-white/50 text-sm w-10 text-right">62.7</span>
                </div>
                {/* Outlook */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60 w-24 text-sm">Outlook</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{width: '41%'}}></div>
                  </div>
                  <span className="text-white/50 text-sm w-10 text-right">41.5</span>
                </div>
                {/* Gmail */}
                <div className="flex items-center gap-3">
                  <span className="text-white/60 w-24 text-sm">Gmail</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{width: '28%'}}></div>
                  </div>
                  <span className="text-white/50 text-sm w-10 text-right">28.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default HomePage;