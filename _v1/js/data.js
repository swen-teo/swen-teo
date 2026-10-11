/* Portfolio content. Source: résumé, LinkedIn and project write-ups (Oct 2026). */
window.SITE = {
  experience: [
    {
      type: 'work', when: 'Aug 2026 – Present', role: 'Teaching Assistant, Web Application Development II (IS216)',
      org: 'Singapore Management University',
      text: 'Guide students through building responsive, interactive front-end and full-stack web applications in SMU’s core practical web module, helping them work through course concepts and technical requirements.',
    },
    {
      type: 'lead', when: '2025 – Present', role: 'Marketing Director, Executive Committee',
      org: 'SMU Blockchain Club',
      text: 'Lead the club’s visual identity and digital marketing: design and draft email campaigns for workshops, speaker sessions and networking events, and produce social media graphics and flyers.',
    },
    {
      type: 'work', when: 'Apr 2024 – Present', role: 'Teaching Assistant',
      org: 'Kumon, Tampines Central 1',
      text: 'Support preschool and primary-level teaching, prepare worksheets, help with classroom management and handle administrative duties.',
    },
    {
      type: 'vol', when: 'Volunteer', role: 'Wonder. Observe. Weave! (attachment)',
      org: 'Esplanade – Theatres on the Bay',
      text: 'Developed youth outreach strategies for Esplanade’s 20th anniversary, including a membership application concept and social media engagement plans.',
    },
    {
      type: 'vol', when: 'Volunteer', role: 'Social Media Volunteer, Youth for Causes',
      org: 'YMCA Singapore',
      text: 'Produced social media content and merchandise designs for Project Adira, Team Nirvana, Team Sunflower and Team Crescendo.',
    },
    {
      type: 'lead', when: 'May 2022 – Jun 2023', role: 'Chief Logistics, Executive Committee',
      org: 'Infocomm Club, Temasek Junior College',
      text: 'Led member training and team-building, supervised event planning, inventory and equipment readiness, and independently ran the club’s Instagram page.',
    },
    {
      type: 'lead', when: 'Aug 2019 – Jun 2021', role: 'Chief Administration, Executive Committee',
      org: 'Infocomm Club, Temasek Junior College',
      text: 'Led member training and team-building, and managed the club’s day-to-day logistics and administration. Member of the club from IP1 to JC2, working in AV, photography, videography and coding.',
    },
  ],

  projects: [
    {
      id: 'questpass', title: 'QuestPass', role: 'Developer', year: 'Nov 2025', context: 'SMU · Web Application Development II',
      summary: 'A full-stack single-page app that gamifies live events: fans complete interactive quests to earn presale access codes and rewards.',
      notes: [
        'Built and deployed the single-page application with Vue 3, Vite and Firebase.',
        'Designed quest and reward flows so fans earn presale codes by completing activities at live events.',
        'Recorded a walkthrough demo of the deployed product.',
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
      summary: 'A data story asking whether Michelin recognition in Singapore matches customer sentiment, hygiene grades and value for money.',
      notes: [
        'Built the React, Vite and Tailwind CSS site that hosts the story, embedding Tableau dashboards with the Tableau Embedding API and scaling them for mobile.',
        'Merged Michelin Guide (Kaggle), SFA hygiene grades (data.gov.sg) and household expenditure (SingStat) data.',
        'Scraped Google Maps and TripAdvisor reviews with Apify and scored sentiment for taste, service and value.',
        'Dashboards: the prestige landscape, price vs value, the hygiene “safety blind spot”, and a weighted diner recommender.',
      ],
      tags: ['React', 'Tailwind CSS', 'Tableau', 'Apify', 'NLP'],
      links: [['Live site', 'https://entirely-overrated.vercel.app/']],
      disc: { a: '#e6ecf5', b: '#fde4ee', motif: 'star' },
    },
    {
      id: 'valus', title: 'Valu$ Trade Prime', role: 'Developer', year: 'Mar 2026', context: 'SMU · Digital Transformation',
      summary: 'A digital transformation proposal and B2B web app that moves Valu$’s wholesale buyers onto their own subscription platform.',
      notes: [
        'Proposed a subscription-based B2B revenue stream and an omnichannel fulfilment strategy using the existing heartland store network.',
        'Built a dual-portal web app (customer and admin) with role-based access control, tiered pricing and live order statuses.',
        'Python forecasting service that turns historical B2B orders into restock alerts for high-velocity SKUs.',
        'Separating B2B orders from retail sales cleans the demand data that forecasting relies on.',
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
      summary: 'A predictive analytics framework that identifies high-value customers (top 20% by GMV) for a regional food-tech platform.',
      notes: [
        'Engineered a pipeline that cleans and joins booking, revenue and marketing engagement data.',
        'Trained logistic regression and decision tree models to forecast customer lifetime value.',
        'Presented the findings to the client’s stakeholders in Bangkok as personalised retention and marketing recommendations.',
      ],
      tags: ['Python', 'Pandas', 'scikit-learn', 'Machine learning'],
      links: [],
      disc: { a: '#fde4ee', b: '#f4f6fa', motif: 'lotus' },
    },
    {
      id: 'piiguard', title: 'PII Guard', role: 'Developer', year: '2025', context: 'TikTok TechJam 2025',
      summary: 'An on-device, privacy-first tool that detects and redacts personally identifiable information in AI prompts in real time.',
      notes: [
        'Fine-tuned a DistilBERT model for PII detection, backed by regex patterns for structured data such as emails, phone and card numbers.',
        'Flask API with an HTML, CSS and JavaScript front end that rates each prompt low, medium or high risk and offers one-click redaction.',
        'Runs entirely locally, so prompts are checked before anything is sent to a cloud LLM.',
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
    { name: 'TikTok TechJam', year: '2025', text: 'Built PII Guard, an on-device tool that detects and redacts personal information in AI prompts in real time.', link: ['PII Guard on Devpost', 'https://devpost.com/software/pii-guard'], tone: 'pink' },
    { name: 'SCDF Lifesavers’ Innovation Challenge', year: '2025', text: 'Designed a team solution to improve emergency preparedness across Singapore’s diverse communities.', tone: 'mint' },
    { name: 'Hack4Good', year: '2024', text: 'Prototyped a Digital PA System that schedules meetings, sends reminders and summarises email threads for administrators.', link: ['Digital PA System on Devpost', 'https://devpost.com/software/digital-pa-system'], tone: 'grey' },
  ],
};
