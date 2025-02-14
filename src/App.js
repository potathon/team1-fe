import Answer from './pages/Answer'
import DailyList from './pages/DailyList'
import Home from './pages/Home'
import Today from './pages/Today'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AnswerProvider } from './context/AnswerContext'

function App() {
  return (
    <div className='App'>
      <AnswerProvider>
        <Router>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/daily/:id'} element={<Answer />} />
            <Route path={'/dailyList'} element={<DailyList />} />
            <Route path={'/today/:id'} element={<Today />} />
          </Routes>
        </Router>
      </AnswerProvider>
    </div>
  )
}

export default App
