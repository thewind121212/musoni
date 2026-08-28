import { Routes, Route } from 'react-router-dom'
import { HomeScreen } from './app/screens/HomeScreen'
import { SettingsScreen } from './app/screens/SettingsScreen'
import { DrillScreen } from './drills/note-id/components/DrillScreen'
import { ResultsScreen } from './app/screens/ResultsScreen'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/drill" element={<DrillScreen />} />
      <Route path="/results" element={<ResultsScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
    </Routes>
  )
}
