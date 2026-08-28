import { Routes, Route } from 'react-router-dom'
import { HomeScreen } from './app/screens/HomeScreen'
import { SettingsScreen } from './app/screens/SettingsScreen'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/drill" element={null} />    {/* DrillScreen in Task 12 */}
      <Route path="/results" element={null} />  {/* ResultsScreen in Task 13 */}
      <Route path="/settings" element={<SettingsScreen />} />
    </Routes>
  )
}
