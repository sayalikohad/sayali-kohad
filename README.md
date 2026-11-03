# Sayali Kohad | Portfolio

Personal portfolio website of **Sayali Kohad**, a Shopify & WordPress Developer based in Nagpur, Maharashtra, India. It showcases my experience, skills, certifications and the live websites and online stores I have built for clients.

**Live site:** [https://your-site.vercel.app](https://your-site.vercel.app)

## Features

- Responsive layout that works on phones, tablets and desktops
- Light and dark theme toggle in the header, with the choice remembered between visits
- Sections: Hero, About, Skills, Experience, Projects, Certifications and Contact
- Project gallery with filters (All, Shopify, WordPress, Custom code) and live-demo links
- Working contact form powered by EmailJS, with no backend needed
- Smooth scroll, scroll-spy navigation, floating badges and scroll-reveal animations
- Fluid sizing, so the page looks the same at different browser zoom levels
- Downloadable resume

## Tech Stack

- [React](https://react.dev/) with [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [EmailJS](https://www.emailjs.com/) for the contact form
- Deployed on [Vercel](https://vercel.com/)

## Project Structure

```
sayali-kohad/
├── public/
│   ├── projects/                 # Project preview images (PNG)
│   ├── sayali.jpeg               # Profile photo
│   └── Sayali_Kohad_Resume.pdf   # Downloadable resume
├── src/
│   ├── Portfolio.jsx             # The whole portfolio (header, sections, footer)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

**Prerequisites:** Node.js 18 or newer and npm.

```bash
# 1. Clone the repository
git clone https://github.com/sayalikohad/sayali-kohad.git
cd sayali-kohad

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the local address shown in the terminal (usually http://localhost:5173).

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Configuration

Most of the content and settings are at the top of `src/Portfolio.jsx`.

### Contact form (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com/) and connect an email service.
2. Create a template that uses these variables: `{{from_name}}`, `{{from_email}}`, `{{reply_to}}`, `{{subject}}` and `{{message}}`.
3. Add your keys in `src/Portfolio.jsx`:

```js
const EMAILJS = {
  service: "YOUR_SERVICE_ID",
  template: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
};
```

After deploying, add your live domain to the allowed origins in the EmailJS dashboard.

### Other settings

| Setting | Purpose |
| --- | --- |
| `PHOTO` | Path of the profile photo in `public/` |
| `RESUME` | Path of the resume PDF in `public/` |
| `IMG_EXT` | Image format used for project previews (`png`, `jpg` or `webp`) |
| `GITHUB`, `LINKEDIN`, `EMAIL`, `ADBORN` | Social and company links |
| `PROJECTS` | List of projects shown in the gallery |
| `FLOATERS` | Floating skill badges around the hero photo |

### Adding a project image

Save a 16:9 screenshot in `public/projects/` using the project name in lowercase with hyphens, for example `hum-threads.png`. If an image is missing, the card shows the project name instead.

## Deployment

1. Push the code to GitHub.
2. Import the repository in [Vercel](https://vercel.com/) (the Vite settings are detected automatically).
3. Click **Deploy**. Every push to `main` redeploys the site.

## Contact

- Email: [sayalikohad3@gmail.com](mailto:sayalikohad3@gmail.com)
- LinkedIn: [sayali-kohad](https://www.linkedin.com/in/sayali-kohad-7a7a47255/)
- GitHub: [sayalikohad](https://github.com/sayalikohad)

---

Designed and built by Sayali Kohad.
