import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddLanguageAndQuestion = () => {
  const [languageName, setLanguageName] = useState('');
  const [languageTime, setLanguageTime] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' });
  const [answer, setAnswer] = useState('');

  const fetchLanguages = async () => {
    try {
      const response = await axios.get('/api/language/100');
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleLanguageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/language/add', { name: languageName, time: languageTime });
      console.log(response.data);
      setLanguageName('');
      setLanguageTime('');
      fetchLanguages();
    } catch (error) {
      console.error("Error adding language:", error);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/question/add', { 
        language: selectedLanguage,
        question: questionText, 
        options, 
        answer 
      });
      console.log(response.data);
      setQuestionText('');
      setOptions({ A: '', B: '', C: '', D: '' });
      setAnswer('');
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{fontWeight:700}}>Add Language & Question</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-box mb-4 bg-black">
            <h5 className='text-light'>Language Details</h5>
            <form onSubmit={handleLanguageSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={languageName}
                  onChange={(e) => setLanguageName(e.target.value)}
                  placeholder="Language Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={languageTime}
                  onChange={(e) => setLanguageTime(e.target.value)}
                  placeholder="Time"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Add Language</button>
            </form>
          </div>

          <div className="form-box bg-black">
            <h5 className='text-light'>Question Details</h5>
            <form onSubmit={handleQuestionSubmit}>
              <div className="mb-3">
                <label htmlFor="languageSelect" className="form-label text-light">Select Language</label>
                <select 
                  id="languageSelect" 
                  className="form-select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  required
                >
                  <option value="" disabled>Choose a language...</option>
                  {languages.map((language) => (
                    <option key={language._id} value={language._id}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Question"
                  required
                />
              </div>
              {['A', 'B', 'C', 'D'].map((option) => (
                <div className="mb-3" key={option}>
                  <input
                    type="text"
                    className="form-control"
                    value={options[option]}
                    onChange={(e) => setOptions({ ...options, [option]: e.target.value })}
                    placeholder={`Option ${option}`}
                    required
                  />
                </div>
              ))}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Correct Answer"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Add Question</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLanguageAndQuestion;
