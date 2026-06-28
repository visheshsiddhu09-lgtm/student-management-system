import { useState, useMemo, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import StudentStats from './components/StudentStats';
import TotalMarksInput from './components/TotalMarksInput';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [students, setStudents] = useState([]);
  const [totalMarks, setTotalMarks] = useState(100);
  const [showEntryModal, setShowEntryModal] = useState(true);

  const handleAddStudent = (student) => {
    setStudents((prevStudents) => [...prevStudents, student]);
    setActivePage('dashboard');
  };

  const handleDeleteStudent = (rollNumber) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.rollNumber !== rollNumber));
  };

  const pageSummary = useMemo(() => {
    const marks = students.map((student) => Number(student.marks));
    const total = marks.reduce((sum, value) => sum + value, 0);
    const average = marks.length ? Math.round(total / marks.length) : 0;
    const max = marks.length ? Math.max(...marks) : 0;
    const min = marks.length ? Math.min(...marks) : 0;
    return { average, max, min, totalRecords: students.length };
  }, [students]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showMainPage = () => {
    setActivePage('home');
    scrollToTop();
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <Navbar
        activePage={activePage}
        onNavigate={(page) => {
          if (page === 'login' || page === 'signup') {
            setShowEntryModal(false);
            setActivePage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }

          setActivePage(page);
          if (page === 'home') {
            showMainPage();
          } else {
            showMainPage();
            setTimeout(() => scrollToSection(page), 100);
          }
        }}
      />

      {showEntryModal && activePage === 'home' && (
        <div className="entry-modal-overlay">
          <div className="entry-modal-card reveal">
            <h2>Welcome to StudentDesk</h2>
            <p>Sign up or login to unlock the full student record dashboard and performance analytics.</p>
            <div className="entry-modal-actions">
              <button className="primary-button" type="button" onClick={() => { setShowEntryModal(false); setActivePage('signup'); }}>
                Sign Up
              </button>
              <button className="secondary-button" type="button" onClick={() => { setShowEntryModal(false); setActivePage('login'); }}>
                Login
              </button>
              <button className="secondary-button" type="button" onClick={() => setShowEntryModal(false)}>
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      {activePage === 'login' ? (
        <Login
          onGoBack={showMainPage}
          onLoginSuccess={() => {
            setShowEntryModal(false);
            setActivePage('dashboard');
            scrollToTop();
            setTimeout(() => scrollToSection('dashboard'), 100);
          }}
        />
      ) : activePage === 'signup' ? (
        <Signup
          onGoBack={showMainPage}
          onSignupSuccess={() => {
            setShowEntryModal(false);
            setActivePage('dashboard');
            scrollToTop();
            setTimeout(() => scrollToSection('dashboard'), 100);
          }}
        />
      ) : (
        <main className="page-content">
          <section id="hero" className="hero-section reveal">
            <div>
              <p className="eyebrow">Student Management System</p>
              <h1>Track Student Records with Confidence</h1>
              <p className="hero-copy">
                Add student roll numbers, names, and marks. Review results, compare performance, and keep data organized with a polished React dashboard.
              </p>
              <div className="hero-cta-group">
                <button className="primary-button" type="button" onClick={() => scrollToSection('dashboard')}>
                  Open Records
                </button>
                <button className="secondary-button" type="button" onClick={() => scrollToSection('contact')}>
                  Contact Us
                </button>
              </div>
            </div>
            <div className="hero-panel">
              <div className="hero-panel-card">
                <h2>Live Record Summary</h2>
                <p>{pageSummary.totalRecords} students tracked</p>
                <div className="hero-stat-group">
                  <div>
                    <span>Avg Mark</span>
                    <strong>{pageSummary.average}</strong>
                  </div>
                  <div>
                    <span>Top Score</span>
                    <strong>{pageSummary.max}</strong>
                  </div>
                  <div>
                    <span>Lowest Score</span>
                    <strong>{pageSummary.min}</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="section-block reveal">
            <div className="section-heading">
              <p className="eyebrow">About StudentDesk</p>
              <h2>A modern way to organize and compare student performance.</h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Centralized Entries</h3>
                <p>Store student roll numbers, names, marks, and percentage calculations in one dashboard.</p>
              </article>
              <article className="feature-card">
                <h3>Smart Analytics</h3>
                <p>See average marks, highest scores, and live performance graphs immediately.</p>
              </article>
              <article className="feature-card">
                <h3>Fast Responsiveness</h3>
                <p>The page animates smoothly on scroll and looks polished on mobile and desktop.</p>
              </article>
            </div>
          </section>

          <section id="workflow" className="section-block reveal">
            <div className="section-heading">
              <p className="eyebrow">How it works</p>
              <h2>Enter records, set the total marks, and review percentage analytics.</h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Step 1: Add Student</h3>
                <p>Enter roll number, name, and marks. The app validates each field and keeps records clean.</p>
              </article>
              <article className="feature-card">
                <h3>Step 2: Set Total Marks</h3>
                <p>Choose the total marks base to calculate accurate percentage results.</p>
              </article>
              <article className="feature-card">
                <h3>Step 3: Compare Performance</h3>
                <p>View percentage bars, summary stats, and simple dashboards that update immediately.</p>
              </article>
            </div>
          </section>

          <section id="features" className="section-block feature-section reveal">
            <div className="section-heading">
              <p className="eyebrow">Why Use This App</p>
              <h2>Everything you need for simple student record management</h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Clean Inputs</h3>
                <p>Roll number and marks accept numbers only, while names allow letters and spaces.</p>
              </article>
              <article className="feature-card">
                <h3>Instant Validation</h3>
                <p>The form checks for empty fields and invalid values before adding records.</p>
              </article>
              <article className="feature-card">
                <h3>Visual Performance</h3>
                <p>Interactive comparison bars make it easy to compare marks across all students.</p>
              </article>
            </div>
          </section>

          <section id="reviews" className="section-block reviews-section reveal">
            <div className="section-heading">
              <p className="eyebrow">Student Reviews</p>
              <h2>What users say about StudentDesk</h2>
            </div>
            <div className="review-grid">
              <article className="review-card">
                <p>“StudentDesk made record keeping easy. My class data is organized and I can calculate percentages in seconds.”</p>
                <div className="review-meta">
                  <span>Priya K.</span>
                  <strong>Math Teacher</strong>
                </div>
              </article>
              <article className="review-card">
                <p>“The dashboard is clean and the score bars help me compare student performance fast. Great for quick progress checks.”</p>
                <div className="review-meta">
                  <span>Arjun S.</span>
                  <strong>School Coordinator</strong>
                </div>
              </article>
              <article className="review-card">
                <p>“I love the total marks feature—it makes percentage tracking accurate. It's the perfect tool for my grading workflow.”</p>
                <div className="review-meta">
                  <span>Riya M.</span>
                  <strong>Exam Manager</strong>
                </div>
              </article>
            </div>
          </section>

          <section id="dashboard" className="section-block dashboard-section reveal">
            <div className="section-heading">
              <p className="eyebrow">Student Records</p>
              <h2>Manage entries, delete outdated records, and keep progress visible.</h2>
            </div>

            <div className="dashboard-grid">
              <div className="panel-card">
                <h3>Add New Student</h3>
                <StudentForm onAddStudent={handleAddStudent} />
                <TotalMarksInput totalMarks={totalMarks} onTotalMarksChange={setTotalMarks} />
              </div>
              <div className="panel-card stats-card">
                <StudentStats students={students} summary={pageSummary} totalMarks={totalMarks} />
              </div>
            </div>

            <div className="panel-card full-width-card">
              <StudentList students={students} totalMarks={totalMarks} onDeleteStudent={handleDeleteStudent} />
            </div>
          </section>

          <section id="contact" className="section-block contact-section reveal">
            <div className="section-heading">
              <p className="eyebrow">Contact</p>
              <h2>Need help with your student records?</h2>
            </div>
            <div className="contact-grid">
              <article className="contact-card">
                <h3>Support Desk</h3>
                <p>Email us at <a href="mailto:support@studentapp.com">support@studentapp.com</a></p>
              </article>
              <article className="contact-card">
                <h3>Phone</h3>
                <p>+1 (555) 012-3456</p>
              </article>
              <article className="contact-card">
                <h3>Office</h3>
                <p>123 Learning Road, Education City</p>
              </article>
            </div>
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;
