import { Clock } from 'lucide-react'
import './App.css'
import { Accordion } from './components/design-system/accordion'

function App() {

  return (
    <>
      <Accordion
        id='bottom-border-accordion'
        title="Accessible FAQ Sectionbnm"
        triggerPosition="left"
        titleIcon={<Clock size={20} />}
        variant="bottom-border"
        content={<p>This content is accessible and WCAG-compliant.</p>}
        defaultOpen
      />

    </>
  )
}

export default App
