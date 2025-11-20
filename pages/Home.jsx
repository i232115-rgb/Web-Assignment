// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import Ticker from '../components/Ticker';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CircleLogo from '../components/CircleLogo';
import { Link } from 'react-router-dom';
import homeData from '../data/homeData.json';
import styles from './Home.module.css';

// Firebase or OpenAI — here using OpenAI (free tier works)
import OPENAI_API_KEY from '../config.js';   // create config.js with your key

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [country, setCountry] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Secure Journeys AI. Ask me anything about travel safety! 🔒✈️", sender: "ai" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setShowWelcome(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/name/pakistan')
      .then(res => res.json())
      .then(data => setCountry(data[0]));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      const data = await response.json();
      const aiReply = data.choices[0].message.content;
      setMessages(prev => [...prev, { text: aiReply, sender: "ai" }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Sorry, AI is taking a nap right now 😴 Try again!", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  const { hero, countryBox } = homeData;

  return (
    <>
      <Ticker />
      <Header />

      {/* Your original hero — untouched */}
      <section className={styles.heroSection} style={{ backgroundImage: `url("${hero.backgroundImage}")` }}>
        <div className={styles.overlay} />
        <div className={`${styles.heroContent} ${showWelcome ? styles.visible : ''}`}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroDescription} dangerouslySetInnerHTML={{ __html: hero.description }} />
          <Link to="/gallery">
            <button className={styles.heroButton}>{hero.buttonText}</button>
          </Link>
        </div>
      </section>

      {/* Your original country box — untouched */}
      <section className={styles.countrySection}>
        <h2 className={styles.countryTitle}>{countryBox.flagEmoji} {countryBox.title}</h2>
vester        {country ? (
          <div className={styles.countryInfo}>
            <p><strong>Capital:</strong> {country.capital[0]}</p>
            <p><strong>Population:</strong> {(country.population / 1000000).toFixed(1)} million 👥</p>
            <p><strong>Currency:</strong> {Object.values(country.currencies)[0].name}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
            <img src={country.flags.svg} alt="Flag" className={styles.countryFlag} />
          </div>
        ) : <p>Loading live data...</p>}
      </section>

      {/* NEW: Ask AI Chat — beautiful & matches your design */}
      <section className="max-w-4xl mx-auto my-20 px-6">
        <h2 className="text-4xl font-bold text-center text-teal-900 mb-10">Ask AI Anything 🔒✈️</h2>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-teal-100">
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-teal-50 to-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md px-6 py-4 rounded-3xl shadow-md ${
                  msg.sender === 'user' 
                    ? 'bg-teal-700 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-6 py-4 rounded-3xl">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-teal-100">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about travel safety, tips, destinations..."
                className="flex-1 px-6 py-4 border border-teal-300 rounded-full focus:outline-none focus:border-teal-600 text-lg"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-10 py-4 bg-teal-700 text-white rounded-full hover:bg-teal-800 transition font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CircleLogo />
    </>
  );
}