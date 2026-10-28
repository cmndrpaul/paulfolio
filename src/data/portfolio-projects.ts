export type PortfolioProject = {
  id: string
  name: string
  image: string
  websiteUrl?: string
}

// Keep this list newest-first; the Home mobile tile features the first entry.
export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'qr-attendance',
    name: 'QR Attendance Application: Attendance, at a scan.',
    image: '/projects/qr-attendance.png',
    websiteUrl: 'https://qr-attendance-eta-three.vercel.app/',
  },
  {
    id: 'commonplace',
    name: 'Commonplace: Discover. Share. Build Together.',
    image: '/projects/commonplace-image.jpg',
    websiteUrl: 'https://commonplace-dun-two.vercel.app/',
  },
  {
    id: 'cvsufound',
    name: "CvSUFound: Lost something on the campus? Let's Find it!",
    image: '/projects/cvsufound-image.png',
    websiteUrl: 'https://cvsufound.vercel.app/',
  },
  {
    id: 'portfolio',
    name: 'Portfolio: Where your journey begins.',
    image: '/projects/portfolio-image.png',
    websiteUrl: 'https://portfolio-paulcxzczx.vercel.app/',
  },
  {
    id: 'portal',
    name: 'CvSU Naic Student Portal: An improved student portal with improved transparency.',
    image: '/projects/portal-image.png',
    websiteUrl: 'https://portal-dun-one-80.vercel.app/?_vercel_share=9tjhotIIlgyJmRdsTa7NZ6hUODcM6Yq3',
  },
  {
    id: 'deped-appointment',
    name: 'DepEd Appointment Sys.: Track your employee. Know your salary.',
    image: '/projects/loginpage-deped.png',
  },
]
