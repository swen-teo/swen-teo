/* Plain data about each app, kept free of component imports so App.jsx can read
   the ids without pulling in the whole desktop. */
export const APPS = [
  { id: 'about', name: 'About Me', menu: 'About This Swen', title: 'About This Swen', w: 420, h: 560 },
  { id: 'experience', name: 'iCal', menu: 'Experience', title: 'Experience — iCal', w: 860, h: 580 },
  { id: 'projects', name: 'iTunes', menu: 'Projects', title: 'iTunes', w: 980, h: 660 },
  { id: 'skills', name: 'System Preferences', menu: 'Skills', title: 'Skills — System Preferences', w: 700, h: 560 },
  { id: 'awards', name: 'Finder', menu: 'Awards', title: 'Awards', w: 820, h: 560 },
  { id: 'photobooth', name: 'Photo Booth', menu: 'Photo Booth', title: 'Photo Booth', w: 820, h: 680 },
  { id: 'music', name: 'iPod', menu: 'Playlist', title: 'Playlist — iPod', w: 640, h: 640 },
  { id: 'mail', name: 'Mail', menu: 'Contact', title: 'New Message', w: 620, h: 520 },
  { id: 'resume', name: 'Preview', menu: 'Resume.pdf', title: 'Resume.pdf — Preview', w: 740, h: 640, hideFromDock: true },
  { id: 'readme', name: 'TextEdit', menu: 'README.txt', title: 'README.txt — TextEdit', w: 560, h: 500, hideFromDock: true },
  { id: 'photo', name: 'Preview', menu: 'me_photo.png', title: 'me_photo.png — Preview', w: 460, h: 520, hideFromDock: true },
  { id: 'trash', name: 'Trash', menu: 'Trash', title: 'Trash', w: 440, h: 320, hideFromDock: true },
];
export const APP_IDS = APPS.map((a) => a.id);
export const appById = (id) => APPS.find((a) => a.id === id);
