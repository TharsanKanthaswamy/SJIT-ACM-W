import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load .env from the Next.js project root
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables.')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const placeholderEvents = [
    {
        title: 'Inauguration of ACM Women\'s Chapter',
        event_date: new Date('2025-03-08T09:00:00Z').toISOString(),
        short_description: 'The official inauguration of the ACM-W Student Chapter at St. Joseph\'s Institute of Technology.',
        full_summary: `The Department of Artificial Intelligence and Data Science proudly inaugurated the **ACM Women Student Chapter** on International Women's Day, marking a milestone in celebrating and advancing the participation of women in computing and technology.

**Chief Guests**

**Dr. Akanksha Agrawal** — Assistant Professor, Department of Computer Science and Engineering, IIT Madras
**Dr. B. Yogameena** — Professor, NITTTR

Both distinguished guests delivered inspiring addresses highlighting the transformative contributions of women in technology and the urgent need for greater inclusivity in the field.

---

**Office Bearers**

| Role | Name |
|------|------|
| Chair | Mr. Joshva D |
| Vice-Chair | Ms. Gopisetty Pardhavika |
| Secretary | Mr. Tharsan K |
| Membership Chair | Ms. Varsini S A |
| Treasurer | Ms. Sharmila O |
| Joint Secretary | Mr. Sidharthan S |
| Event Manager | Ms. Sanjana B |
| Web Master | Ms. Samitha S |
| Research Head | Mr. Sidharth |
| Social Media Head | Ms. Subashini |
| Design Head | Mr. Blesson Sharon W S |
| Technical Head | Mr. Thanveer Haque H |

---

**Event Highlights**

- **Formal Plaque Unveiling** — The official ceremonial opening of the ACM Women's Chapter.
- **Badge Distribution** — Recognition and felicitation of newly enrolled ACM-W chapter members.
- **Interactive Session: "Breaking Barriers in Technology"** — An engaging discussion aimed at motivating students to pursue innovative projects and challenge boundaries in the tech space.

---

**Looking Ahead**

The ACM Women's Chapter will drive a calendar of workshops, technical talks, and mentorship programs designed to sharpen skills, foster collaboration, and open doors for aspiring women technologists. This inauguration marks a meaningful first step toward building a supportive, empowering community where every student is encouraged to excel in technology and innovation.`,
        published: true,
        registration_open: false,
        images: ['https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/event-images/inauguration/cover.webp'],
    },
    {
        title: 'Code HeroFest',
        event_date: new Date('2025-03-28T09:00:00Z').toISOString(),
        short_description: 'A dynamic event combining an industry expert talk on Generative AI with a high-energy competitive coding challenge.',
        full_summary: `The Department of Artificial Intelligence and Data Science successfully hosted **Code HeroFest**, a dynamic event combining an industry expert talk with a high-energy competitive coding challenge — designed to sharpen problem-solving skills and expose students to real-world tech perspectives.

---

**Expert Talk — Generative AI**

**Speaker:** Mr. Immanuel M — Principal Infra Developer & Technical Manager (Projects), Cognizant Technology Solutions
**Faculty Sponsor:** Dr. Allin Geo V, Associate Professor, Department of ADS

Mr. Immanuel delivered an insightful session on the frontiers of **Generative AI**, covering advancements in AI-driven automation, its disruptive impact across industries, and the ethical considerations surrounding AI-generated content.

---

**Finalist Coding Challenge**

Five finalists, selected through a lucky draw, were tasked with solving a medium-level LeetCode problem and presenting their solutions within 5 minutes. A jury panel evaluated the solutions and selected the top three winners.

**Winners**

| Position | Name | Year & Department |
|----------|------|-------------------|
| 🥇 1st Place | Abishek Lawrence | II Year, ADS |
| 🥈 2nd Place | Mohanraj G | II Year, CSE |
| 🥉 3rd Place | Priyadarshini K | II Year, CSE |

---

**Outcome**

Code HeroFest successfully engaged students in competitive coding, strengthening analytical thinking and solution presentation skills. The expert talk offered valuable industry insight into the evolving landscape of Generative AI. The department plans to build on this momentum with more hands-on coding sessions, expert discussions, and industry collaborations going forward.`,
        published: true,
        registration_open: true,
        images: ['https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/event-images/code-herofest/cover.webp'],
    },
    {
        title: 'AI Unplugged — Online Expert Talk',
        event_date: new Date('2025-06-21T18:00:00Z').toISOString(),
        short_description: 'An online expert talk bringing cutting-edge industry knowledge on AI applications directly to students.',
        full_summary: `The ACM Women's Chapter hosted **AI Unplugged**, an online expert talk bringing cutting-edge industry knowledge directly to students through a live session with a globally recognized AI practitioner.

---

**Chief Guest & Speaker**

**Mr. Abdul Rasheed Feroz Khan** — Entrepreneur & Microsoft MVP

Mr. Khan delivered a powerful and practical session on real-world AI applications, covering NLP use cases across sectors such as **healthcare, finance, and insurance**, alongside live demonstrations using **Microsoft Copilot Studio** and **Azure AI tools**.

---

**Session Highlights**

The event's standout moment was an interactive Q&A session where students posed sharp, industry-relevant questions, including:

- *"Can GitHub Copilot generate copyrighted code, and how do we detect it?"*
- *"How do you create AI-based blog agents using Copilot Studio?"*
- *"What functionalities can be built using Azure AI Agents?"*

---

**Participation**

**66+ active participants** joined the session, making it one of the chapter's most attended online events.

---

**Acknowledgements**

A special note of appreciation to **Mr. Abdul Rasheed Feroz Khan** for sharing industry-grade knowledge and inspiring the next generation of AI professionals, and to **Dr. Priscilla Babu Manasseh**, Head of Department, for her continued support.`,
        published: true,
        registration_open: true,
        images: ['https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/event-images/ai-unplugged/cover.webp'],
    },
    {
        title: 'Tech-CSI — Virtual Cyber Investigation Challenge',
        event_date: new Date('2025-08-25T10:00:00Z').toISOString(),
        short_description: 'A unique event blending an industry expert talk on Mainframe & Strategic Leadership with a hands-on cyber investigation challenge.',
        full_summary: `The Department of Artificial Intelligence and Data Science conducted **Tech-CSI**, a unique event blending an industry expert talk with a hands-on cyber investigation challenge that put students' analytical and cybersecurity skills to the test.

---

**Expert Talk — Mainframe & Strategic Leadership**

**Speaker:** Mr. Sathish Thirugnanasambandar — Associate Director, Mainframe Managed Services, Accenture
**Topic:** Mainframe Infrastructure Services & Strategic Leadership
**Faculty Sponsor:** Dr. Allin Geo A V, Associate Professor, Department of ADS

Key themes explored included cost optimization in enterprise infrastructure, shared services strategy, and talent development in large-scale tech organizations.

---

**Competition Format**

**Round 1 — Cyber Quiz (Eliminations):** Participants took on a cybersecurity quiz, with 14 students advancing to the final round.

**Final Round — Tech CSI:** Finalists analyzed real-world threat scenarios including phishing emails, suspicious system logs, and network traffic patterns.

**Judging Criteria:** Accuracy of findings, logical reasoning, and clarity of presentation.

---

**Winners**

| Position | Name | Year & Department |
|----------|------|-------------------|
| 🥇 1st Prize | Yuvanesh | III Year, ADS |
| 🥈 2nd Prize | Rithanya | II Year, ADS |
| 🥉 3rd Prize | Akshayadharshini | II Year, ADS |
| 🎖️ Consolation Prize | Tamilselvan | III Year, ADS |

---

**Outcome**

Students walked away with heightened cyber awareness, sharper problem-solving instincts, and fresh perspectives on leadership in the technology sector. Future plans include dedicated cybersecurity workshops, Capture the Flag (CTF) competitions, and an inter-college Tech-CSI edition.`,
        published: true,
        registration_open: true,
        images: ['https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/event-images/virtual-csi/cover.webp'],
    },
    {
        title: 'Intellecta — Aptitude & Logical Reasoning Challenge',
        event_date: new Date('2026-02-09T08:30:00Z').toISOString(),
        short_description: 'A structured aptitude and logical reasoning competition designed to prepare students for the analytical demands of the professional world.',
        full_summary: `The ACM Women's Chapter organized **Intellecta**, a structured aptitude and logical reasoning competition designed to prepare students for the analytical demands of the professional world — blending competitive assessment with real industry insight.

---

**Guests of Honour**

**Mr. Arun Prasad** — Associate Consultant, TCS | Ex-IBM | Ex-Zensar
**Ms. Kaviyadharshini S** — HR & Business Analyst, Altrusity Innovation Pvt Ltd

Both guests delivered engaging lectures on career readiness, industry placement expectations, and what top employers look for in aspiring tech professionals.

---

**Competition Format**

A total of **30 students** participated across two competitive rounds:

- **Round 1 — Aptitude Assessment:** Evaluating quantitative ability, reasoning, and analytical thinking.
- **Round 2 — Rapid Quiz:** A fast-paced elimination round testing speed, accuracy, and logical reasoning under pressure.

---

**Event Highlights**

- Industry guest lectures focused on career readiness and placement expectations.
- Two-stage format rigorously testing aptitude and logical reasoning.
- Active, competitive participation in an offline environment.
- Recognition of top performers based on cumulative performance across rounds.

---

**Winners**

| Position | Name |
|----------|------|
| 🥇 1st Place | Santhosh S |
| 🥈 2nd Place | Sriram Prasath |
| 🥉 3rd Place | Lakshanadevi |

---

The event was conducted under the leadership of **Dr. R. Priscilla**, Head of the Department of Artificial Intelligence and Data Science.`,
        published: true,
        registration_open: false,
        images: ['https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/event-images/intellecta/cover.webp'],
    },
    {
        title: 'Un-Glitch\'26 — AI Systems Vulnerability & Ethics Challenge',
        event_date: new Date('2026-02-13T10:10:00Z').toISOString(),
        short_description: 'Students challenged to step into the shoes of AI auditors — critically examining real-world AI-driven governance systems to expose technical, ethical, and societal flaws.',
        full_summary: `**Un-Glitch'26** challenged students to step into the shoes of AI auditors — critically examining real-world AI-driven governance systems to expose technical, ethical, and societal flaws. The event fostered system-level thinking, responsible AI awareness, and practical problem-solving skills relevant to modern AI deployment.

---

**Inauguration**

The event was inaugurated in the presence of:

- **Dr. R. Priscilla** — Head of Department, AI & Data Science
- **Dr. Allin Geo A V, Mrs. Chitra P, Mrs. Saranya S** — ACM-W Faculty Coordinators

Faculty members from across the AI&DS department were present for the welcome and inauguration ceremony.

---

**Competition Format**

**13 teams** from the Department of Artificial Intelligence and Data Science participated. After the preliminary round, **5 teams advanced to the Final Round**, selected based on analytical depth, technical reasoning, and the quality of their presentations.

**Judging focused on:** System flaw identification accuracy, ethical reasoning, understanding of societal impact, and presentation clarity.

---

**Event Highlights**

- Real-world AI governance problem statements for system flaw identification.
- Deep focus on ethical AI, security vulnerabilities, and societal impact assessment.
- Multi-round competitive evaluation structure promoting rigorous analysis.
- Lively technical discussions and peer-to-peer knowledge exchange.

---

**Winners**

| Position | Team Members |
|----------|-------------|
| 🥇 1st Place | Nebal Akash & Rishini Dharan T |
| 🥈 2nd Place | Saravanakumar T & Sabarish S |
| 🥉 3rd Place | Krish Roshan R & Mukesh S |

---

Un-Glitch'26 successfully instilled in students a deeper appreciation for responsible AI system design, governance risk assessment, and ethical deployment practices. The event was conducted under the leadership of **Dr. R. Priscilla**, Head of the Department of Artificial Intelligence and Data Science.`,
        published: true,
        registration_open: false,
        images: ['https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/event-images/unglitch/cover.webp'],
    }
]

async function seedEvents() {
    console.log('Seeding placeholder events to Supabase...')

    // First delete existing published events to avoid constant duplication if run multiple times
    const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .eq('published', true)

    if (deleteError) {
        console.error('Error clearing old events:', deleteError)
    }

    const { data, error } = await supabase
        .from('events')
        .insert(placeholderEvents)
        .select()

    if (error) {
        console.error('Seeding failed:', error)
    } else {
        console.log(`Successfully seeded ${data.length} events!`)
    }
}

seedEvents()
