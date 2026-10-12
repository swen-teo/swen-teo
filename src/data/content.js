/* Portfolio content. Source: résumé, LinkedIn and project write-ups (Oct 2026). */
export const SITE = {
  experience: [
    {
      type: 'work', when: 'Aug 2026 – Present', role: 'Teaching Assistant, Web Application Development II (IS216)',
      org: 'Singapore Management University',
      text: 'Guide students through building responsive, interactive front-end and full-stack web applications in SMU’s core practical web module (IS216), helping them troubleshoot code, understand course concepts, and work through complex project requirements using Vue 3 and Firebase.',
    },
    {
      type: 'lead', when: '2025 – Present', role: 'Marketing Director, Executive Committee',
      org: 'SMU Blockchain Club',
      text: 'Lead the club’s visual identity and digital marketing campaigns across events, workshops, and speaker panels. Design graphics and flyers, draft promotional emails, and manage engagement across the club’s social channels.',
    },
    {
      type: 'work', when: 'Apr 2024 – Present', role: 'Teaching Assistant',
      org: 'Kumon, Tampines Central 1',
      text: 'Support preschool and primary-level classroom teaching in mathematics and English reading. Prepare and grade daily learning materials, guide young students through challenging worksheets, and handle administrative duties.',
    },
    {
      type: 'vol', when: 'Volunteer', role: 'Wonder. Observe. Weave! (attachment)',
      org: 'Esplanade – Theatres on the Bay',
      text: 'Developed youth outreach strategies for Esplanade’s 20th anniversary celebration, including a proposed student membership program concept and social media engagement initiatives.',
    },
    {
      type: 'vol', when: 'Volunteer', role: 'Social Media Volunteer, Youth for Causes',
      org: 'YMCA Singapore',
      text: 'Produced social media promotional content and merchandise graphics for student advocacy teams including Project Adira, Team Nirvana, Team Sunflower, and Team Crescendo under the Youth for Causes program.',
    },
    {
      type: 'lead', when: 'May 2022 – Jun 2023', role: 'Chief Logistics, Executive Committee',
      org: 'Infocomm Club, Temasek Junior College',
      text: 'Led member training sessions and team-building activities, supervised event logistics, equipment readiness, and inventory management for school events, and independently ran the club’s Instagram account.',
    },
    {
      type: 'lead', when: 'Aug 2019 – Jun 2021', role: 'Chief Administration, Executive Committee',
      org: 'Infocomm Club, Temasek Junior College',
      text: 'Led junior member training and managed day-to-day administrative planning and logistical operations. Active member of the club from IP1 through JC2, gaining hands-on experience in AV production, event photography, videography, and programming.',
    },
  ],

  projects: [
    {
      id: 'questpass', title: 'QuestPass', role: 'Developer', year: 'Nov 2025', context: 'SMU · Web Application Development II',
      summary: 'A full-stack single-page application that gamifies live concerts and festivals: attendees complete interactive on-site quests to earn presale ticket access codes and exclusive rewards.',
      notes: [
        'Built and deployed the full single-page application using Vue 3, Vite, and Firebase for authentication and database management.',
        'Designed interactive quest flows and verification checkpoints so fans can complete live activities at events to claim unique presale codes.',
        'Recorded and produced a complete walkthrough demonstration showing the user experience from registration to reward redemption.',
      ],
      tags: ['Vue 3', 'Vite', 'Firebase', 'JavaScript'],
      links: [
        ['Live site', 'https://questpass-b3680.web.app/'],
        ['GitHub', 'https://github.com/swen-teo/wad2g8t8-2025'],
        ['Demo video', 'https://youtu.be/POcCilPTdgQ?t=338'],
      ],
      disc: { a: '#fbd3e3', b: '#d7f1f2', motif: 'heartkey' },
    },
    {
      id: 'entirely', title: 'En-tire-ly Overrated?', role: 'Developer', year: 'Mar 2026', context: 'SMU · Data Analytics and Visualisation',
      summary: 'An interactive data story exploring whether Michelin recognition in Singapore aligns with customer sentiment, hygiene grades, and overall value for money.',
      notes: [
        'Built the website using React, Vite, and Tailwind CSS, integrating responsive Tableau dashboards with the Tableau Embedding API and optimizing the layout for mobile and desktop.',
        'Merged datasets from Kaggle (Michelin Guide), data.gov.sg (SFA food hygiene grades), and SingStat (household expenditure benchmarks).',
        'Scraped user reviews from Google Maps and TripAdvisor with Apify, scoring sentiment across food quality, customer service, and perceived price value.',
        'Designed interactive dashboards covering the Michelin prestige landscape, price vs value comparisons, food safety inspection records, and a custom diner recommendation tool.',
      ],
      tags: ['React', 'Tailwind CSS', 'Tableau', 'Apify', 'NLP'],
      links: [['Live site', 'https://entirely-overrated.vercel.app/']],
      disc: { a: '#e6ecf5', b: '#fde4ee', motif: 'star' },
    },
    {
      id: 'valus', title: 'Valu$ Trade Prime', role: 'Developer', year: 'Mar 2026', context: 'SMU · Digital Transformation',
      summary: 'A digital transformation proposal and B2B web application designed to transition Valu$’s wholesale buyers onto a dedicated subscription and bulk ordering platform.',
      notes: [
        'Proposed a subscription-based B2B revenue stream and an omnichannel fulfilment strategy utilizing the existing heartland retail store network.',
        'Built a dual-portal web application (customer and admin) featuring role-based access control, tiered volume pricing, and live order statuses with Supabase.',
        'Implemented a Python forecasting service that analyzes historical B2B orders to generate restock alerts for fast-moving inventory SKUs.',
        'Separating wholesale business orders from walk-in retail sales ensures clean demand data for accurate inventory forecasting.',
      ],
      tags: ['React', 'TypeScript', 'Vite', 'Supabase', 'Python'],
      links: [
        ['Live site', 'https://dbtt-value-quintillion-dollar.vercel.app/'],
        ['GitHub', 'https://github.com/swen-teo/dbtt-value-quintillion-dollar'],
        ['Customer demo', 'https://youtu.be/fiN6lIEuwQc'],
        ['Admin demo', 'https://youtu.be/o4STY8Mi6Ms'],
      ],
      disc: { a: '#d4f0f1', b: '#eef1f6', motif: 'notes' },
    },
    {
      id: 'hungryhub', title: 'HungryHub Customer Analytics', role: 'Data Analyst', year: '2026', context: 'SMU-X · IS455 Overseas Project, Bangkok',
      summary: 'A predictive analytics project identifying high-value customers (the top 20% by GMV) for HungryHub, a regional food-tech and restaurant reservation platform.',
      notes: [
        'Engineered an analytics pipeline that cleans and merges raw booking records, platform revenue, and promotional marketing campaign data using Pandas.',
        'Trained logistic regression and decision tree machine learning models in scikit-learn to forecast customer lifetime value and repeat purchase patterns.',
        'Presented analytical findings and retention strategies directly to client stakeholders in Bangkok, delivering actionable recommendations on targeted customer engagement.',
      ],
      tags: ['Python', 'Pandas', 'scikit-learn', 'Machine learning'],
      links: [],
      disc: { a: '#fde4ee', b: '#f4f6fa', motif: 'lotus' },
    },
    {
      id: 'piiguard', title: 'PII Guard', role: 'Developer', year: '2025', context: 'TikTok TechJam 2025',
      summary: 'An on-device, privacy-focused security tool that detects and redacts personally identifiable information in AI prompts in real time before submission.',
      notes: [
        'Fine-tuned a DistilBERT model for PII entity recognition, backed by custom regex patterns for structured personal data such as email addresses, phone numbers, and payment cards.',
        'Built a Flask API and lightweight frontend interface that evaluates prompt risk levels (low, medium, high) and provides one-click sensitive data redaction.',
        'Runs completely locally on the user\'s machine, guaranteeing that sensitive inputs are scrubbed before any data is sent over the network to cloud LLMs.',
      ],
      tags: ['Python', 'DistilBERT', 'Flask', 'JavaScript'],
      links: [['Devpost', 'https://devpost.com/software/pii-guard']],
      disc: { a: '#dff4f5', b: '#fbd8e6', motif: 'tooth' },
    },
  ],

  skills: [
    { name: 'Programming', icon: 'notes', items: ['JavaScript', 'Python', 'PHP', 'TypeScript'], tone: 'pink' },
    { name: 'Web', icon: 'globe', items: ['HTML', 'CSS', 'Vue', 'React', 'Axios', 'Bootstrap', 'Tailwind CSS', 'Firebase'], tone: 'mint' },
    { name: 'Data & machine learning', icon: 'sparkle', items: ['SQL', 'Pandas', 'Matplotlib', 'Seaborn', 'scikit-learn', 'Jupyter Notebook', 'Tableau', 'Power BI'], tone: 'mint' },
    { name: 'Design & productivity', icon: 'heart', items: ['Graphic design', 'Canva', 'Excel', 'Microsoft Office'], tone: 'pink' },
    { name: 'Currently learning', icon: 'star', items: ['Java', 'Flask'], tone: 'grey' },
  ],

  awards: [
    { lines: ['EAGLES', 'AWARD', '2020'], caption: 'Edusave Award for Achievement, Good Leadership and Service', a: '#f7c3d7', b: '#fde0ea', tail: '#f5b5cd', tail2: '#c9ecee' },
    { lines: ['Academic', 'PROGRESS', 'TJC 2024'], caption: 'JC2 Academic Progress Award, TJC College Day 2024', a: '#bfe7ea', b: '#e1f5f6', tail: '#a9dde2', tail2: '#f7c9da', center: '#f5fcfc' },
    { lines: ['Merit', 'INFOCOMM', 'TJC 2024'], caption: 'Merit Award (Infocomm Club), TJC College Day 2024', a: '#dfe3ea', b: '#f3f5f8', tail: '#d4d9e2', tail2: '#f7c9da', center: '#fbfbfd' },
  ],

  competitions: [
    { name: 'TikTok TechJam', year: '2025', text: 'Built PII Guard, an on-device privacy tool that detects and redacts personally identifiable information in AI prompts in real time before they reach third-party language models.', link: ['PII Guard on Devpost', 'https://devpost.com/software/pii-guard'], tone: 'pink' },
    { name: 'SCDF Lifesavers’ Innovation Challenge', year: '2025', text: 'Designed a community-focused team solution to improve emergency preparedness, alert distribution, and first-responder coordination across diverse Singapore neighborhoods.', tone: 'mint' },
    { name: 'Hack4Good', year: '2024', text: 'Prototyped a Digital PA System that schedules calendar appointments, sends automated reminders, and summarizes lengthy email chains for non-profit administrators.', link: ['Digital PA System on Devpost', 'https://devpost.com/software/digital-pa-system'], tone: 'grey' },
  ],
};
