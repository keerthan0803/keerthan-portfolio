import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Seeding Database with Pentam Keerthan Resume Data...')

    // 1. Admin
    const email = process.env.ADMIN_EMAIL || 'keerthanpentam@gmail.com'
    const password = process.env.ADMIN_PASSWORD || 'keerthan123098'
    const passwordHash = await bcrypt.hash(password, 10)

    await prisma.admin.upsert({
        where: { email },
        update: { passwordHash },
        create: { email, passwordHash },
    })

    // 2. Profile
    await prisma.profile.deleteMany()
    await prisma.profile.create({
        data: {
            name: 'Pentam Keerthan',
            title: 'AI & Full-Stack Developer',
            summary: 'I enjoy working with Python, Machine Learning, Computer Vision, and modern web technologies to build complete applications. I have developed end-to-end applications and tools using LLMs, and I am seeking opportunities in Software Development, ML, or AI Engineering to learn and grow.',
            email: 'keerthanpentam@gmail.com',
            phone: '9441292862',
            location: 'Hyderabad, Telangana, India',
            linkedin: 'https://linkedin.com/in/pentamkeerthan0803',
            github: 'https://github.com/pentamkeerthan0803',
            leetcode: 'https://leetcode.com',
            codechef: 'https://codechef.com',
            codeforces: 'https://codeforces.com',
            hackerrank: 'https://hackerrank.com',
        },
    })

    // 3. Education
    await prisma.education.deleteMany()
    await prisma.education.createMany({
        data: [
            {
                degree: 'B.Tech in Artificial Intelligence',
                institution: 'Anurag University',
                location: 'Hyderabad, Telangana',
                period: '2023 – Present',
                score: 'CGPA: 8.37',
                order: 1,
            },
            {
                degree: 'Intermediate (MPC)',
                institution: 'Sri Chaitanya Junior College',
                location: 'Hyderabad, Telangana',
                period: '2021 – 2023',
                score: 'GPA: 8.23',
                order: 2,
            },
        ],
    })

    // 4. Skills
    await prisma.skill.deleteMany()
    await prisma.skill.createMany({
        data: [
            { name: 'Python', category: 'Programming Languages', order: 1 },
            { name: 'Java (Basic)', category: 'Programming Languages', order: 2 },
            { name: 'C', category: 'Programming Languages', order: 3 },
            { name: 'JavaScript', category: 'Programming Languages', order: 4 },
            { name: 'TypeScript', category: 'Programming Languages', order: 5 },

            { name: 'Computer Vision', category: 'Machine Learning / AI', order: 1 },
            { name: 'Deep Learning', category: 'Machine Learning / AI', order: 2 },
            { name: 'Data Analysis', category: 'Machine Learning / AI', order: 3 },
            { name: 'NLP', category: 'Machine Learning / AI', order: 4 },
            { name: 'LLMs', category: 'Machine Learning / AI', order: 5 },
            { name: 'Prompt Engineering', category: 'Machine Learning / AI', order: 6 },

            { name: 'HTML', category: 'Web Development', order: 1 },
            { name: 'CSS', category: 'Web Development', order: 2 },
            { name: 'JavaScript', category: 'Web Development', order: 3 },
            { name: 'React.js', category: 'Web Development', order: 4 },
            { name: 'Next.js', category: 'Web Development', order: 5 },
            { name: 'REST APIs', category: 'Web Development', order: 6 },
            { name: 'Streamlit', category: 'Web Development', order: 7 },
            { name: 'MERN Stack', category: 'Web Development', order: 8 },

            { name: 'MySQL', category: 'Database', order: 1 },
            { name: 'MongoDB', category: 'Database', order: 2 },
            { name: 'PostgreSQL', category: 'Database', order: 3 },

            { name: 'Git', category: 'Tools', order: 1 },
            { name: 'GitHub', category: 'Tools', order: 2 },
            { name: 'Postman', category: 'Tools', order: 3 },
            { name: 'Render', category: 'Tools', order: 4 },
        ],
    })

    // 5. Achievements
    await prisma.achievement.deleteMany()
    await prisma.achievement.createMany({
        data: [
            {
                title: 'Secured 4th place in Mind Sprint 2K25',
                description: 'Secured 4th place in a 36-hour National Level Hackathon "Mind Sprint 2K25" conducted by AICTE.',
                icon: '🏆',
                order: 1,
            },
            {
                title: 'Solved 1000+ Coding Problems',
                description: 'Solved 1000+ coding problems across platforms including LeetCode, CodeChef, Codeforces, and HackerRank.',
                icon: '💻',
                order: 2,
            },
            {
                title: 'Developed and Deployed AI/ML Applications',
                description: 'Developed and deployed AI/ML applications for real-world problems.',
                icon: '🤖',
                order: 3,
            },
        ],
    })

    // 6. Certificates
    await prisma.certificate.deleteMany()
    await prisma.certificate.createMany({
        data: [
            { title: 'Smart Coder Certificate', issuer: 'Smart Interviews', order: 1 },
            { title: 'Python Essentials', issuer: 'Cisco Networking Academy', order: 2 },
            { title: '4th Place Certificate', issuer: 'National Level Hackathon "Mind Sprint 2K25" (AICTE)', order: 3 },
            { title: 'Prompt Engineering Certificate', issuer: 'Great Learning', order: 4 },
        ],
    })

    // 7. Tags & Projects
    const tagNames = ['MERN Stack', 'React.js', 'MongoDB', 'Python', 'REST APIs', 'Render', 'AI Agriculture']
    const tagMap: Record<string, string> = {}

    for (const name of tagNames) {
        const tag = await prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name },
        })
        tagMap[name] = tag.id
    }

    await prisma.project.upsert({
        where: { slug: 'secure-my-campus' },
        update: {
            title: 'Secure My Campus (Complaint & Support System)',
            description: 'Enhanced campus security by building a full-stack complaint and support management system for efficient incident reporting. Implemented secure user authentication and role-based access control for students, security personnel, and administrators.',
            content: 'Full-stack campus incident reporting system with RESTful APIs, role-based access control, and MongoDB.',
            coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
            liveUrl: 'https://github.com/pentamkeerthan0803',
            repoUrl: 'https://github.com/pentamkeerthan0803',
            featured: true,
            published: true,
            order: 1,
        },
        create: {
            title: 'Secure My Campus (Complaint & Support System)',
            slug: 'secure-my-campus',
            description: 'Enhanced campus security by building a full-stack complaint and support management system for efficient incident reporting. Implemented secure user authentication and role-based access control for students, security personnel, and administrators.',
            content: 'Full-stack campus incident reporting system with RESTful APIs, role-based access control, and MongoDB.',
            coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
            liveUrl: 'https://github.com/pentamkeerthan0803',
            repoUrl: 'https://github.com/pentamkeerthan0803',
            featured: true,
            published: true,
            order: 1,
            tags: {
                connect: [
                    { id: tagMap['MERN Stack'] },
                    { id: tagMap['React.js'] },
                    { id: tagMap['MongoDB'] },
                    { id: tagMap['REST APIs'] },
                ],
            },
        },
    })

    await prisma.project.upsert({
        where: { slug: 'my-smart-farm' },
        update: {
            title: 'My Smart Farm – AI-Based Agriculture Platform',
            description: 'Built a full-stack smart farming platform to help farmers manage crops and access agricultural information. Integrated secure RESTful APIs with MongoDB and deployed the application on Render for public access.',
            content: 'AI-driven agriculture platform giving farmers real-world recommendations on crop management using Python, React, and MongoDB.',
            coverImage: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1200&auto=format&fit=crop',
            liveUrl: 'https://render.com',
            repoUrl: 'https://github.com/pentamkeerthan0803',
            featured: true,
            published: true,
            order: 2,
        },
        create: {
            title: 'My Smart Farm – AI-Based Agriculture Platform',
            slug: 'my-smart-farm',
            description: 'Built a full-stack smart farming platform to help farmers manage crops and access agricultural information. Integrated secure RESTful APIs with MongoDB and deployed the application on Render for public access.',
            content: 'AI-driven agriculture platform giving farmers real-world recommendations on crop management using Python, React, and MongoDB.',
            coverImage: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1200&auto=format&fit=crop',
            liveUrl: 'https://render.com',
            repoUrl: 'https://github.com/pentamkeerthan0803',
            featured: true,
            published: true,
            order: 2,
            tags: {
                connect: [
                    { id: tagMap['React.js'] },
                    { id: tagMap['Python'] },
                    { id: tagMap['MongoDB'] },
                    { id: tagMap['Render'] },
                    { id: tagMap['AI Agriculture'] },
                ],
            },
        },
    })

    console.log('✓ Successfully seeded database with all resume details!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })