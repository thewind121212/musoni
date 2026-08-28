import { Routes, Route } from 'react-router-dom'
import { SettingsScreen } from './app/screens/SettingsScreen'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="screen"><h1>musoni</h1></div>} /> {/* HomeScreen in Task 11 */}
      <Route path="/drill" element={null} />    {/* DrillScreen in Task 12 */}
      <Route path="/results" element={null} />  {/* ResultsScreen in Task 13 */}
      <Route path="/settings" element={<SettingsScreen />} />
    </Routes>
  )
}
