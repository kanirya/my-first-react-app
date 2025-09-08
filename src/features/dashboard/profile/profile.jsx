
"use client"

import {useContext, useEffect, useState} from "react"
import {AvatarImage} from "@radix-ui/react-avatar";
import {AuthContext} from "../../auth/context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import axios from "../../auth/api/axios.js";
import API from "../../auth/api/axios.js";


// export function Profile() {
//
//
//
//     return (
//         <>
//             <h2 className="text-center text-gray-100  mb-4">
//                 This User is <span className="text-light-200 font-bold">{userData.Permission}</span> </h2>
//
//             <h3 className="text-white text-center">
//                 Profile <span>Id is: <strong>{id}</strong></span> </h3>
//
//         </>
//
//     )
// }


// Custom Avatar Component
const Avatar = ({ src, alt, fallback, size = "md" }) => {
    const [imageError, setImageError] = useState(false)

    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-12 h-12 text-sm",
        lg: "w-24 h-24 text-lg",
        xl: "w-32 h-32 text-xl",
    }

    return (
        <div
            className={`avatar ${sizeClasses[size]} bg-gray-200 rounded-full flex items-center justify-center overflow-hidden`}
        >
            {!imageError && src ? (
                <img
                    src={src || "/placeholder.svg"}
                    alt={alt}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                />
            ) : (
                <span className="font-semibold text-gray-600">{fallback}</span>
            )}
        </div>
    )
}

// Custom Button Component
const Button = ({ children, variant = "default", size = "md", className = "", onClick, ...props }) => {
    const baseClasses =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
        ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    }

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    }

    return (
        <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
            {children}
        </button>
    )
}

// Custom Card Components
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }) => (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
)

const CardContent = ({ children, className = "" }) => <div className={`px-6 py-4 ${className}`}>{children}</div>

// Custom Progress Component
const Progress = ({ value, className = "" }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
)

// Icons (using simple SVGs)
const MapPinIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
)

const MailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
    </svg>
)

const PhoneIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
    </svg>
)

const LinkedinIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const TwitterIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
)

const GithubIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
)

const TrophyIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
    </svg>
)

const StarIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

export const Profile = () => {
    const [activeTab, setActiveTab] = useState("overview")
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user) {
            getData()
        }
    },[user,id])


    const skills = [
        { name: "JavaScript", level: 95 },
        { name: "React", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "UI/UX Design", level: 75 },
        { name: "Project Management", level: 88 },
    ]

    const experiences = [
        {
            title: "Senior Software Engineer",
            company: "TechCorp Inc.",
            period: "2022 - Present",
            description:
                "Leading development of scalable web applications using React and Node.js. Managing a team of 5 developers and implementing best practices for code quality and performance.",
        },
        {
            title: "Full Stack Developer",
            company: "StartupXYZ",
            period: "2020 - 2022",
            description:
                "Built and maintained multiple client projects using modern web technologies. Collaborated with design teams to create responsive and user-friendly interfaces.",
        },
        {
            title: "Frontend Developer",
            company: "Digital Agency",
            period: "2018 - 2020",
            description:
                "Developed interactive websites and web applications for various clients. Specialized in React development and responsive design implementation.",
        },
    ]

    const achievements = [
        {
            title: "Employee of the Year",
            year: "2023",
            description: "Recognized for outstanding performance and leadership",
        },
        {
            title: "Best Innovation Award",
            year: "2022",
            description: "Created an automated testing framework that improved efficiency by 40%",
        },
        { title: "Certified React Developer", year: "2021", description: "Advanced certification in React development" },
    ]

    const activities = [
        {
            type: "project",
            title: "Completed E-commerce Platform",
            time: "2 hours ago",
            description: "Successfully delivered a full-stack e-commerce solution",
        },
        {
            type: "achievement",
            title: "Earned React Certification",
            time: "1 day ago",
            description: "Completed advanced React development course",
        },
        {
            type: "collaboration",
            title: "Mentored Junior Developer",
            time: "3 days ago",
            description: "Provided guidance on best practices and code review",
        },
        {
            type: "presentation",
            title: "Tech Talk on Performance",
            time: "1 week ago",
            description: "Presented optimization techniques to the development team",
        },
    ]

    const connections = [
        { name: "John Smith", role: "Product Manager", avatar: "/professional-man.png" },
        { name: "Emily Chen", role: "UX Designer", avatar: "/professional-woman-diverse.png" },
        { name: "Michael Johnson", role: "Tech Lead", avatar: "/professional-man.png" },
        { name: "Sarah Wilson", role: "DevOps Engineer", avatar: "/professional-woman-diverse.png" },
    ]


   async function  getData()  {
        try{
            const res= await API.get(`/Profile/${id}`);
            console.log("USer Data is "+res.data.Name+"\nemail "+res.data.Email)
            if(res){

                setUserData({
                    name:res.data.Name,
                    email:res.data.Email,
                    uid:res.data.Uid,
                    isAdmin:res.data.isAdmin
                })

            }else{
                setUserData({
                    name:"N/A",
                    email:"N/A",
                    uid:"N/A",
                    isAdmin:false
                })}

        }catch (err) {

            setUserData({error:err.message})
        }


    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Cover Photo */}
            <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-700">
                <img src="/modern-office.png" alt="Cover" className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-700/80" />
            </div>

            {/* Profile Section */}
            <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="relative -mt-32 pb-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="relative">
                                <Avatar src="/professional-woman-headshot.png" alt="Sarah Johnson" fallback="SJ" size="xl" />
                                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                            </div>

                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                                <h1 className="text-3xl font-bold text-gray-900">{userData.email}</h1>

                                <h1 className="text-3xl font-bold text-gray-900">
                                    {userData?.isAdmin ? "This user is Admin" : "This user is Normal"}
                                </h1>

                                <p className="text-xl text-gray-600 mt-1">Senior Software Engineer & Team Lead</p>
                                <div className="flex items-center text-gray-500 mt-2">
                                    <MapPinIcon />
                                    <span className="ml-1">San Francisco, CA</span>
                                </div>
                                <p className="text-gray-700 mt-3 max-w-2xl">
                                    Passionate software engineer with 8+ years of experience building scalable web applications. Expert in
                                    React, Node.js, and cloud technologies. Love mentoring junior developers and driving innovation.
                                </p>
                            </div>

                            <div className="flex space-x-3">
                                <Button>Connect</Button>
                                <Button variant="outline">Message</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-blue-600">150+</div>
                            <div className="text-gray-600">Projects Completed</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-green-600">500+</div>
                            <div className="text-gray-600">Connections</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-purple-600">25</div>
                            <div className="text-gray-600">Awards</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-orange-600">8+</div>
                            <div className="text-gray-600">Years Experience</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Skills Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Skills & Expertise</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {skills.map((skill, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                                <span className="text-sm text-gray-500">{skill.level}%</span>
                                            </div>
                                            <Progress value={skill.level} />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Experience Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Work Experience</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {experiences.map((exp, index) => (
                                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                                            <h3 className="font-semibold text-lg text-gray-900">{exp.title}</h3>
                                            <p className="text-blue-600 font-medium">{exp.company}</p>
                                            <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                                            <p className="text-gray-700">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Activity Feed */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {activities.map((activity, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                                                <p className="text-sm text-gray-600">{activity.description}</p>
                                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <MailIcon />
                                        <span className="text-sm">sarah.johnson@email.com</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <PhoneIcon />
                                        <span className="text-sm">+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <LinkedinIcon />
                                        <span className="text-sm">linkedin.com/in/sarahjohnson</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <GithubIcon />
                                        <span className="text-sm">github.com/sarahjohnson</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <TwitterIcon />
                                        <span className="text-sm">@sarahjohnson_dev</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Achievements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {achievements.map((achievement, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <TrophyIcon />
                                            <div>
                                                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                                                <p className="text-sm text-gray-600">{achievement.description}</p>
                                                <p className="text-xs text-gray-500">{achievement.year}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Connections */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Connections</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {connections.map((connection, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <Avatar
                                                src={connection.avatar}
                                                alt={connection.name}
                                                fallback={connection.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 text-sm">{connection.name}</p>
                                                <p className="text-xs text-gray-600">{connection.role}</p>
                                            </div>
                                            <Button size="sm" variant="outline">
                                                View
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rating */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Professional Rating</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="flex justify-center space-x-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon key={star} />
                                        ))}
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                                    <p className="text-sm text-gray-600">Based on 127 reviews</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage


// Demo data
const profileData = {
    name: "Alexandra Chen",
    title: "Senior Product Designer & UX Strategist",
    tagline: "Crafting digital experiences that bridge user needs with business goals",
    avatar: "/professional-woman-headshot.png",
    coverImage: "/modern-office.png",
    location: "San Francisco, CA",
    email: "alexandra.chen@company.com",
    phone: "+1 (555) 123-4567",
    website: "alexandrachen.design",
    bio: "Passionate product designer with 8+ years of experience creating user-centered digital solutions for Fortune 500 companies. I specialize in design systems, user research, and cross-functional collaboration to deliver products that users love and businesses value.",

    skills: [
        { name: "UI/UX Design", level: 95 },
        { name: "Design Systems", level: 90 },
        { name: "User Research", level: 85 },
        { name: "Prototyping", level: 88 },
        { name: "Figma", level: 92 },
        { name: "Product Strategy", level: 80 },
    ],

    experience: [
        {
            company: "TechCorp Inc.",
            logo: "/abstract-tech-logo.png",
            position: "Senior Product Designer",
            duration: "2021 - Present",
            description:
                "Lead design for core product features used by 2M+ users. Established design system that reduced development time by 40%.",
        },
        {
            company: "StartupXYZ",
            logo: "/startup-logo.png",
            position: "Product Designer",
            duration: "2019 - 2021",
            description:
                "Designed end-to-end user experiences for B2B SaaS platform. Increased user engagement by 65% through redesigned onboarding flow.",
        },
        {
            company: "Design Studio",
            logo: "/design-agency-logo.png",
            position: "UX Designer",
            duration: "2017 - 2019",
            description:
                "Created digital experiences for diverse clients across fintech, healthcare, and e-commerce industries.",
        },
    ],

    achievements: [
        {
            title: "Design Excellence Award",
            organization: "UX Awards 2023",
            date: "2023",
            description: "Recognized for outstanding contribution to user experience design",
        },
        {
            title: "Certified Design Systems Expert",
            organization: "Design Systems Coalition",
            date: "2022",
            description: "Advanced certification in scalable design system architecture",
        },
        {
            title: "Speaker at UX Conference",
            organization: "Design Week SF",
            date: "2023",
            description: "Presented 'Building Inclusive Design Systems' to 500+ attendees",
        },
    ],

    activities: [
        {
            type: "post",
            content:
                "Just published a new article on design system governance and how to scale design across large organizations.",
            timestamp: "2 hours ago",
            likes: 24,
            comments: 8,
            shares: 5,
        },
        {
            type: "achievement",
            content: "Completed Advanced Prototyping certification from Interaction Design Foundation",
            timestamp: "1 day ago",
            likes: 18,
            comments: 3,
            shares: 2,
        },
        {
            type: "share",
            content: "Shared an insightful article about the future of AI in design tools",
            timestamp: "3 days ago",
            likes: 12,
            comments: 6,
            shares: 8,
        },
    ],

    connections: [
        { name: "Sarah Johnson", title: "Product Manager", avatar: "/professional-woman-diverse.png" },
        { name: "Michael Rodriguez", title: "Frontend Developer", avatar: "/professional-man.png" },
        { name: "Emily Davis", title: "UX Researcher", avatar: "/professional-woman-diverse.png" },
        { name: "David Kim", title: "Design Director", avatar: "/professional-man.png" },
    ],

    stats: {
        connections: 847,
        followers: 1234,
        posts: 156,
        profileViews: 2891,
    },
}

export function ProfilePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <div className="relative">
                <div
                    className="h-48 bg-gradient-to-r from-primary/10 to-accent/10 bg-cover bg-center"
                    style={{ backgroundImage: `url(${profileData.coverImage})` }}
                />
                <div className="absolute -bottom-16 left-8">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                        <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                        <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                            {profileData.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-20 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Header */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-bold text-foreground">{profileData.name}</h1>
                                        <p className="text-xl text-primary font-medium">{profileData.title}</p>
                                        <p className="text-muted-foreground text-balance">{profileData.tagline}</p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {profileData.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                {profileData.stats.connections} connections
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button>Connect</Button>
                                        <Button variant="outline">Message</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
                            </CardContent>
                        </Card>

                        {/* Experience Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Experience
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {profileData.experience.map((exp, index) => (
                                    <div key={index} className="flex gap-4">
                                        <Avatar className="h-12 w-12 flex-shrink-0">
                                            <AvatarImage src={exp.logo || "/placeholder.svg"} alt={exp.company} />
                                            <AvatarFallback>{exp.company[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <h3 className="font-semibold text-foreground">{exp.position}</h3>
                                            <p className="text-primary font-medium">{exp.company}</p>
                                            <p className="text-sm text-muted-foreground">{exp.duration}</p>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Skills Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Skills & Expertise</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {profileData.skills.map((skill, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-foreground">{skill.name}</span>
                                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <Progress value={skill.level} className="h-2" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Activity Feed */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {profileData.activities.map((activity, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                                                <AvatarFallback>
                                                    {profileData.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-foreground">{profileData.name}</span>
                                                    <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                                                </div>
                                                <p className="text-muted-foreground">{activity.content}</p>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                                                        <Heart className="h-4 w-4" />
                                                        {activity.likes}
                                                    </button>
                                                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                                                        <MessageSquare className="h-4 w-4" />
                                                        {activity.comments}
                                                    </button>
                                                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                                                        <Share2 className="h-4 w-4" />
                                                        {activity.shares}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {index < profileData.activities.length - 1 && <Separator />}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-foreground">{profileData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-foreground">{profileData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <a href="#" className="text-primary hover:underline">
                                        {profileData.website}
                                    </a>
                                </div>
                                <Separator />
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                        <Linkedin className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                        <Github className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                        <Twitter className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Profile views</span>
                                    <span className="font-semibold text-foreground">
                    {profileData.stats.profileViews.toLocaleString()}
                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Connections</span>
                                    <span className="font-semibold text-foreground">{profileData.stats.connections}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Posts</span>
                                    <span className="font-semibold text-foreground">{profileData.stats.posts}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Followers</span>
                                    <span className="font-semibold text-foreground">{profileData.stats.followers.toLocaleString()}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5" />
                                    Achievements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {profileData.achievements.map((achievement, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <Award className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                            <div className="space-y-1">
                                                <h4 className="font-medium text-foreground text-sm">{achievement.title}</h4>
                                                <p className="text-xs text-primary">{achievement.organization}</p>
                                                <p className="text-xs text-muted-foreground">{achievement.date}</p>
                                                <p className="text-xs text-muted-foreground leading-relaxed">{achievement.description}</p>
                                            </div>
                                        </div>
                                        {index < profileData.achievements.length - 1 && <Separator />}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Connections */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Connections
                  </span>
                                    <Button variant="ghost" size="sm">
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {profileData.connections.map((connection, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                                            <AvatarFallback className="text-xs">
                                                {connection.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm text-foreground truncate">{connection.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{connection.title}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                                    View all connections
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

