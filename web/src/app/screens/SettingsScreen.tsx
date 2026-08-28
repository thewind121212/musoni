import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'

export function SettingsScreen() {
  const { settings, updateSettings } = useAppStore()
  const navigate = useNavigate()
  return (
    <div className="screen">
      <button className="btn" onClick={() => navigate('/')}>← Back</button>
      <h2>Settings</h2>
      <h3>Note names</h3>
      <div className="btn-row">
        <button className={`btn ${settings.naming === 'letters' ? 'active' : ''}`}
          onClick={() => updateSettings({ naming: 'letters' })}>C D E (letters)</button>
        <button className={`btn ${settings.naming === 'solfege' ? 'active' : ''}`}
          onClick={() => updateSettings({ naming: 'solfege' })}>Do Re Mi (solfège)</button>
      </div>
      <h3>Sharps & flats (#/b)</h3>
      <div className="btn-row">
        <button className={`btn ${settings.accidentals ? 'active' : ''}`}
          onClick={() => updateSettings({ accidentals: true })}>On</button>
        <button className={`btn ${!settings.accidentals ? 'active' : ''}`}
          onClick={() => updateSettings({ accidentals: false })}>Off</button>
      </div>
      <h3>Sound</h3>
      <div className="btn-row">
        <button className={`btn ${settings.sound ? 'active' : ''}`}
          onClick={() => updateSettings({ sound: true })}>On</button>
        <button className={`btn ${!settings.sound ? 'active' : ''}`}
          onClick={() => updateSettings({ sound: false })}>Off</button>
      </div>
    </div>
  )
}
