interface Service {
	id: number;
	slug: string;
	title: string;
	description: string;
	content: string;
	imageUrl: string;
}

interface Testimonial {
	id: number;
	name: string;
	comment: string;
	rating: number;
	date: string;
}

interface TeamMember {
	id: number;
	name: string;
	role: string;
	bio: string;
	imageUrl: string;
}

export const services: Service[] = [
	{
		id: 1,
		slug: "emergency-plumbing",
		title: "Emergency Plumbing",
		description: "24/7 emergency plumbing services for your urgent needs",
		content: "Detailed content about emergency plumbing services...",
		imageUrl: "/images/emergency-plumbing.jpg",
	},
	{
		id: 2,
		slug: "drain-cleaning",
		title: "Drain Cleaning",
		description: "Professional drain cleaning and maintenance",
		content: "Comprehensive information about our drain cleaning services...",
		imageUrl: "/images/drain-cleaning.jpg",
	},
];

export const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "John Smith",
		comment: "Excellent service! Fixed my emergency leak in no time.",
		rating: 5,
		date: "2024-03-15",
	},
];

export const team: TeamMember[] = [
	{
		id: 1,
		name: "Mike Johnson",
		role: "Master Plumber",
		bio: "20 years of experience in residential and commercial plumbing",
		imageUrl: "/images/team/mike.jpg",
	},
];
