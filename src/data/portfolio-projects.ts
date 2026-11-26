export type PortfolioProject = {
  id: string
  name: string
  category: string
  description: string
  technologies: readonly string[]
  image: string
  previewFit?: 'contain'
  websiteUrl?: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'miracles-cafe',
    name: "Miracle's Cafe",
    technologies: ['Astro', 'TypeScript', 'Tailwind CSS'],
    category: 'Cafe Website',
    description: 'A website for a cafe in Naic, Cavite, where guests can browse the menu and find opening hours and directions before visiting.',
    image: '/projects/miracles-cafe.png',
    previewFit: 'contain',
    websiteUrl: 'https://miracle-cafe-cmndrpaul.vercel.app/',
  },
  {
    id: 'cmndr-crm',
    name: 'cmndrCRM',
    technologies: ['TypeScript', 'JavaScript', 'CSS', 'HTML'],
    category: 'Project management',
    description: 'A personal CRM that puts my projects and tasks in one place so I can find what needs attention quickly.',
    image: '/projects/cmndrcrm-site.webp',
    websiteUrl: 'https://cmndrpaul-crm-showcase.vercel.app/',
  },
  {
    id: 'smokeless-usage',
    name: 'SmokeLess Usage',
    technologies: ['Dart', 'Flutter', 'SQLite'],
    category: 'Habit tracking',
    description: 'A daily cigarette tracker that helps users record their smoking and see patterns in their routine.',
    image: '/projects/smokeless-app.jpg',
    websiteUrl: 'https://smokeless-cmndrpaul.pages.dev/',
  },
  {
    id: 'qr-attendance',
    name: 'QR Attendance',
    technologies: ['Dart', 'Flutter', 'SQLite'],
    category: 'Attendance tracking',
    description: 'A QR-based attendance app that lets people check in with a scan and keeps attendance records in one place.',
    image: '/projects/qr-attendance.webp',
    websiteUrl: 'https://qr-attendance-eta-three.vercel.app/',
  },
  {
    id: 'commonplace',
    name: 'Commonplace',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Supabase'],
    category: 'Community',
    description: 'A community platform for discovering what others are working on, sharing ideas, and building together.',
    image: '/projects/commonplace-image.webp',
    websiteUrl: 'https://commonplace-dun-two.vercel.app/',
  },
  {
    id: 'cvsufound',
    name: 'CvSUFound',
    technologies: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Supabase'],
    category: 'Campus utility',
    description: 'A campus lost-and-found hub where students can report missing belongings and browse items others have found.',
    image: '/projects/cvsufound-image.webp',
    websiteUrl: 'https://cvsufound.vercel.app/',
  },
  {
    id: 'portfolio',
    name: 'Developer Portfolio',
    technologies: ['Astro', 'CSS', 'Vercel'],
    category: 'Personal website',
    description: 'A personal portfolio that brings my work, skills, and contact information together in one website.',
    image: '/projects/portfolio-image.webp',
    websiteUrl: 'https://portfolio-paulcxzczx.vercel.app/',
  },
  {
    id: 'portal',
    name: 'CvSU Naic Student Portal',
    technologies: ['PHP', 'MySQL'],
    category: 'Education',
    description: 'A redesigned student portal that makes important campus information easier to find and understand.',
    image: '/projects/portal-image.webp',
    websiteUrl: 'https://portal-dun-one-80.vercel.app/?_vercel_share=9tjhotIIlgyJmRdsTa7NZ6hUODcM6Yq3',
  },
  {
    id: 'deped-appointment',
    name: 'DepEd Appointment System',
    technologies: ['Laravel', 'MySQL'],
    category: 'Administration',
    description: 'An administrative interface for looking up employee appointments and related salary information.',
    image: '/projects/loginpage-deped.webp',
  },
]
