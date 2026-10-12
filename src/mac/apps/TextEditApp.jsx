import './apps.css';

export default function TextEditApp({ onOpen }) {
  return (
    <div className="textedit-app">
      <div className="textedit-toolbar">
        <span className="textedit-font">Lucida Grande 13pt</span>
        <div className="textedit-ruler" aria-hidden="true">
          <span>|···1···|···2···|···3···|···4···|···5···|···6···|···7···|</span>
        </div>
      </div>
      <div className="textedit-paper">
        <pre className="textedit-content">
{`============================================================
 welcome_to_swens_macbook.txt
 Mac OS X 10.4 Tiger (Pastel Edition)
============================================================

Portfolio workspace modeled after a 2006 white MacBook
running Mac OS X Tiger.

SYSTEM DETAILS:
  Machine:     MacBook (White Polycarbonate, 2006)
  Memory:      2 GB 667 MHz DDR2 SDRAM
  Owner:       Swen Teo
  Studies:     Information Systems @ SMU

APPLICATIONS:
  * Projects (iTunes)      -> Web apps, live sites, and GitHub repos
  * Experience (iCal)      -> Teaching, clubs, and work timeline
  * Awards (Finder)        -> Academic and competition awards
  * Photo Booth            -> Webcam pictures with camera filters
  * Music (iPod)           -> Audio player with playback controls
  * Widgets (Dashboard)    -> Analog clock, weather, and to-do note

SHORTCUTS:
  1. Click the top-left lotus logo for menu actions.
  2. Click the Weather widget to toggle Celsius and Fahrenheit.
  3. Click the Analog Clock to switch between Singapore and local time.
  4. Click items on the sticky note to mark them done.
  5. Close the lid from the Apple menu or Dock to return to the desk.

Get in touch via Mail (Contact) or on LinkedIn.

— Swen Teo`}
        </pre>
        <div className="textedit-actions">
          <button type="button" className="aqua aqua--blush" onClick={() => onOpen('projects')}>
            Open iTunes (Projects)
          </button>
          <button type="button" className="aqua aqua--mint" onClick={() => onOpen('mail')}>
            Open Mail (Contact)
          </button>
        </div>
      </div>
    </div>
  );
}
