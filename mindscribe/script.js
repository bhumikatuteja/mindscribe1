// This tells Babel to process this script. It's a required starting point.
"use strict";

const { useState, useEffect, useCallback } = React;

// --- Firebase Initialization ---
// IMPORTANT: Replace these with the keys from your NEW Firebase project.
const firebaseConfig = {
    apiKey: "AIzaSyDGOUwqXbSH3_hmsbRU8XXrpoZ88b1M7r8",
    authDomain: "mindscribe-new.firebaseapp.com",
    projectId: "mindscribe-new",
    storageBucket: "mindscribe-new.appspot.com",
    messagingSenderId: "64172246811",
    appId: "1:64172246811:web:d150fe02c0362b6fc0f5be"
};


// CORRECT: Initialize Firebase once using the compat library syntax.
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// --- Reusable Icon Components ---
const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>);
const HistoryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.19-9.51L1 10"/></svg>);
const JournalIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>);
const DashboardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10m-6 10V4M6 20v-4"/></svg>);
const GrowthIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 11V4a2 2 0 00-2-2H9a2 2 0 00-2 2v16h10a2 2 0 002-2v-3.5"/><path d="M12 18H7"/><path d="M17 11l-5 5-3-3"/></svg>);
const AIChatIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
const SunIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>);
const MoonIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>);
const OceanIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0m3 0a6 6 0 0 0 12 0a6 6 0 0 0 -12 0m3 0a3 3 0 0 1 6 0a3 3 0 0 1 -6 0"></path></svg>);
const SparkleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" /></svg>);


// --- Main Application Components ---

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
    const themes = [
        { name: 'light', icon: <SunIcon /> },
        { name: 'dark', icon: <MoonIcon /> },
        { name: 'ocean', icon: <OceanIcon /> },
    ];
    return (
        <div className="theme-switcher">
            {themes.map(theme => (
                <button
                    key={theme.name}
                    onClick={() => onThemeChange(theme.name)}
                    className={`theme-btn ${currentTheme === theme.name ? 'active' : ''}`}
                    aria-label={`Switch to ${theme.name} theme`}
                >
                    {theme.icon}
                </button>
            ))}
        </div>
    );
};

const Sidebar = ({ activeView, onSignOut, onThemeChange, currentTheme, nickname }) => {
    const navItems = [
        { id: 'home', label: 'Home', icon: <HomeIcon /> },
        { id: 'journal', label: 'Journal', icon: <JournalIcon /> },
        { id: 'history', label: 'History', icon: <HistoryIcon /> },
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'growth', label: 'Growth', icon: <GrowthIcon /> },
        { id: 'chat', label: 'AI Chat', icon: <AIChatIcon /> },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>EmoTrack</h2>
            </div>
            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>
            <div className="sidebar-footer">
                <div className="user-profile">
                     <div className="user-avatar">{nickname.charAt(0)}</div>
                     <span>{nickname}</span>
                </div>
                <ThemeSwitcher currentTheme={currentTheme} onThemeChange={onThemeChange} />
                <button onClick={onSignOut} id="logout-button">Log Out</button>
            </div>
        </aside>
    );
};

const JournalingSection = ({ user }) => {
    const [mood, setMood] = useState(null);
    const [moodText, setMoodText] = useState('');
    const [journalText, setJournalText] = useState('');
    const moods = ['Happy', 'Neutral', 'Sad', 'Anxious', 'Angry'];
    const emojiMap = { 'Happy': '😀', 'Neutral': '�', 'Sad': '😢', 'Anxious': '😟', 'Angry': '😠' };

    const handleSaveEntry = (type) => {
        const text = type === 'mood' ? moodText : journalText;
        if (!text && !mood && type === 'mood') return;
        if (!text && type === 'journal') return;

        db.collection('users').doc(user.uid).collection('entries').add({
            type: type,
            text: text,
            mood: type === 'mood' ? mood : null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            if (type === 'mood') {
                setMood(null);
                setMoodText('');
            } else {
                setJournalText('');
            }
        }).catch(err => console.error("Error saving entry:", err));
    };

    return (
        <div className="journal-grid">
            <div className="card">
                <h2>Quick Check-in</h2>
                <div className="mood-selector">
                    {moods.map(m => (
                        <button key={m} onClick={() => setMood(m)} className={`mood-emoji ${mood === m ? 'selected' : ''}`}>{emojiMap[m]}</button>
                    ))}
                </div>
                <input type="text" value={moodText} onChange={(e) => setMoodText(e.target.value)} placeholder="A quick thought... (optional)" />
                <button onClick={() => handleSaveEntry('mood')}>Log Mood</button>
            </div>
            <div className="card">
                <h2>Free Journaling</h2>
                <textarea value={journalText} onChange={(e) => setJournalText(e.target.value)} placeholder="What's on your mind?"></textarea>
                <button onClick={() => handleSaveEntry('journal')}>Save Entry</button>
            </div>
        </div>
    );
};

const InsightsGenerator = ({ entries }) => {
    const [insight, setInsight] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetInsight = async () => {
        if (entries.length === 0) {
            setInsight("You don't have enough journal entries yet. Write a few more thoughts and try again!");
            return;
        }

        setIsLoading(true);
        setInsight('');
        const journalText = entries.slice(0, 10).map(entry => `- ${entry.text}`).join("\n");
        const prompt = `You are a supportive and insightful journaling assistant. Read the following journal entries from a user. Do not give medical advice. Instead, identify 2-3 key emotional patterns, recurring themes, or potential triggers you notice in the text. Present your findings as a gentle, reflective summary in 2-3 short paragraphs. Be encouraging and focus on raising self-awareness. Here are the entries:\n\n${journalText}`;

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = ""
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
            const result = await response.json();
            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts) {
                const text = result.candidates[0].content.parts[0].text;
                setInsight(text);
            } else {
                throw new Error("Invalid response structure from API.");
            }
        } catch (error) {
            console.error("Error fetching AI insight:", error);
            setInsight("Sorry, I couldn't generate insights at the moment. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>AI Insights</h2>
            <p className="description">Get a summary of your recent emotional patterns based on your journal entries.</p>
            <button onClick={handleGetInsight} disabled={isLoading} className="ai-button">
                {isLoading ? 'Generating...' : <><SparkleIcon /> Get AI Insight</>}
            </button>
            {isLoading && <div className="spinner-small"></div>}
            {insight && (
                <div className="insight-result">
                    <p>{insight}</p>
                </div>
            )}
        </div>
    );
};

const EntryList = ({ entries }) => {
    if (!entries || entries.length === 0) {
        return <p className="no-entries">No entries yet. Start by logging a mood or writing in your journal!</p>;
    }
    const emojiMap = { 'Happy': '😀', 'Neutral': '😐', 'Sad': '😢', 'Anxious': '😟', 'Angry': '😠' };

    return (
        <div className="entries-section">
            <h2>Your Recent Entries</h2>
            <div id="entries-list">
                {entries.map(entry => (
                    <div key={entry.id} className="entry">
                        <div className="entry-header">
                            <h3 className="entry-mood">{entry.mood ? `${emojiMap[entry.mood]} ${entry.mood}` : 'Journal Entry'}</h3>
                            <p className="entry-date">{entry.createdAt ? new Date(entry.createdAt.toDate()).toLocaleString() : 'Just now'}</p>
                        </div>
                        <p className="entry-text">{entry.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Page Components ---
const JournalPage = ({ user, entries }) => (
    <>
        <JournalingSection user={user} />
        <InsightsGenerator entries={entries} />
    </>
);

const HistoryPage = ({ entries }) => (
    <div className="card">
        <h2>Your Full Journal History</h2>
        <EntryList entries={entries} />
    </div>
);

const PlaceholderPage = ({ title, nickname }) => (
    <div className="card home-card">
        <h2>{title}, {nickname}!</h2>
        <p>This is your personal space to reflect and grow. Use the journal to log your thoughts and the history tab to see your progress.</p>
    </div>
);


// --- Main App Controller ---
const AppController = ({ user, onSignOut }) => {
    const [userData, setUserData] = useState(null);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    // The active view is now controlled by the URL hash
    const [activeView, setActiveView] = useState(window.location.hash.substring(1) || 'home');

    // This effect listens for changes in the URL hash to update the view
    useEffect(() => {
        const handleHashChange = () => {
            setActiveView(window.location.hash.substring(1) || 'home');
        };

        window.addEventListener('hashchange', handleHashChange);
        
        // Cleanup the listener when the component unmounts
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []); // Empty dependency array means this effect runs only once

    useEffect(() => {
        if (!user) return;
        const unsubProfile = db.collection('users').doc(user.uid).onSnapshot(doc => {
            if (doc.exists) {
                const data = doc.data();
                setUserData(data);
                document.body.className = `theme-${data.theme || 'light'}`;
            }
            setLoading(false);
        });

        const unsubEntries = db.collection('users').doc(user.uid).collection('entries').orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => setEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));

        return () => {
            unsubProfile();
            unsubEntries();
        };
    }, [user]);

    const handleThemeChange = (theme) => {
        if (!user) return;
        db.collection('users').doc(user.uid).update({ theme: theme });
    };

    const renderView = () => {
        switch (activeView) {
            case 'home':
                return <PlaceholderPage title="Welcome to EmoTrack" nickname={userData.nickname}/>;
            case 'journal':
                return <JournalPage user={user} entries={entries.slice(0, 20)} />;
            case 'history':
                return <HistoryPage entries={entries} />;
            case 'dashboard':
                return <PlaceholderPage title="Dashboard" />;
            case 'growth':
                return <PlaceholderPage title="Growth Mode" />;
            case 'chat':
                return <PlaceholderPage title="AI Chat" />;
            default:
                return <PlaceholderPage title="Welcome to EmoTrack" nickname={userData.nickname} />;
        }
    };

    if (loading || !userData) {
        return <div id="loading-overlay" className="loading-overlay"><div className="spinner"></div><p>Loading your space...</p></div>;
    }

    return (
        <div className="app-layout">
            <Sidebar
                activeView={activeView}
                onSignOut={onSignOut}
                onThemeChange={handleThemeChange}
                currentTheme={userData.theme}
                nickname={userData.nickname}
            />
            <main className="main-content">
                {renderView()}
            </main>
        </div>
    );
};

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');

    const handleAuth = (e) => {
        e.preventDefault();
        setError('');
        if (isLogin) {
            auth.signInWithEmailAndPassword(email, password).catch(err => setError(err.message));
        } else {
            if (!nickname) {
                setError("Please enter a nickname.");
                return;
            }
            auth.createUserWithEmailAndPassword(email, password)
                .then(cred => db.collection('users').doc(cred.user.uid).set({
                    nickname: nickname,
                    email: email,
                    theme: 'light',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }))
                .catch(err => setError(err.message));
        }
    };

    return (
        <div id="auth-view" className="view">
            <div className="auth-container">
                <div className="auth-box">
                    <div className="auth-header">
                        <h1>EmoTrack</h1>
                        <p>{isLogin ? 'Welcome back.' : 'Create your private emotional journal.'}</p>
                    </div>
                    <form onSubmit={handleAuth}>
                        {!isLogin && (
                            <div className="form-field">
                                <label htmlFor="nickname">What should we call you?</label>
                                <input type="text" id="nickname" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="e.g., Alex" required />
                            </div>
                        )}
                        <div className="form-field">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">{isLogin ? 'Log In' : 'Create Account'}</button>
                    </form>
                    <div className="auth-switch">
                        <p>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setError(''); }}>
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Top-Level App Component ---
const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div id="loading-overlay" className="loading-overlay"><div className="spinner"></div><p>Initializing EmoTrack...</p></div>;
    }

    return user ? <AppController user={user} onSignOut={() => auth.signOut()} /> : <AuthPage />;
};


// --- Final Render Step ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
