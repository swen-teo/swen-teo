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

Hello! Welcome to my interactive portfolio workspace.

I built this simulation to capture the tactile charm and
nostalgia of the mid-2000s Mac OS X Tiger / Leopard era,
paired with modern responsive web engineering.

SYSTEM SPECIFICATIONS:
  Model:       MacBook (White Polycarbonate, 2006)
  Memory:      2 GB 667 MHz DDR2 SDRAM
  Host:        Swen Teo
  Focus:       Software Engineering & Data Analytics @ SMU

WHERE TO GO NEXT:
  * Projects (iTunes)      -> Check out web apps with live demos
  * Experience (iCal)      -> Timeline of teaching & leadership
  * Awards (Finder)        -> Academic & competition honors
  * Photo Booth            -> Snap webcam photos with live filters
  * Playlist (iPod)        -> Swen's Lo-Fi MP3 Playlist
  * Widgets (Dashboard)    -> Clock, weather, and music player

EASTER EGGS:
  1. Click the top-left lotus logo for shortcut options.
  2. Click the Weather Widget to toggle Celsius & Fahrenheit.
  3. Click the Analog Clock to switch between SGT and Local time.
  4. The To-Do list on the desktop has checkable boxes!
  5. Close the lid from the Dock or Apple Menu to return to the desk.

Enjoy your visit! Feel free to reach out via Mail (Contact)
or connect on LinkedIn.

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
