import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {

  let wapLink = '';
  const languages = ['en', 'es', 'it']
  const flags = ['🇺🇸 *English:*\n', '\n\n🇦🇷 *Spanish:*\n', '\n\n🇮🇹 *Italian:*\n']
  let finalText = {en:'', es:'', it: ''};
  const api = {
    translate: 'https://translate.argosopentech.com/translate',
    detect: 'https://translate.argosopentech.com/detect'
  }

  const [input, setInput] = useState('');
  const handleInput = (e) => setInput(e.target.value);

  const translate = async () => {
  const getFinalText = 
    languages.map(async lang => {
      const response = await axios.post(api.translate, {
        q: input,
        source: 'auto',
        target: lang
      })
      return finalText[lang] = response.data.translatedText
      })
    
  
    const textTranslated = await Promise.all(getFinalText)
    const returnString = textTranslated.map((text, index) => `${flags[index]}${text}`);
    wapLink = `whatsapp://send?text=${window.encodeURIComponent(returnString.join(''))}`
    return window.location.assign(wapLink)
}

  return (
    <div className="App">
      <header>
        <h1>Nitro Translator</h1>
      </header>
      <main>
        <textarea 
        rows="10" 
        cols="50"
        onChange={handleInput}>
        </textarea>
        <button onClick={translate} className='Whatsy'>TRANSLATE and SEND</button>
      </main>
      <footer>{new Date().getFullYear()} - Christopher Selva</footer>
    </div>
  );
}

export default App;
