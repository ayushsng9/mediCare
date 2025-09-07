import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Anupam Sharma',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Sharma is known in Guwahati for his holistic approach to healthcare, preventive medicine, and patient-focused care.',
        fees: 500,
        address: {
            line1: 'Beltola Main Road',
            line2: 'Near Ganeshguri, Guwahati'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Ritu Hazarika',
        image: doc2,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '10 Years',
        about: 'Dr. Hazarika is a compassionate pediatrician dedicated to child wellness, vaccinations, and developmental care in Guwahati.',
        fees: 600,
        address: {
            line1: 'Zoo Road Tiniali',
            line2: 'Near Assam State Zoo, Guwahati'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Rajiv Kalita',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '7 Years',
        about: 'Dr. Kalita is an experienced dermatologist focusing on skin allergies, cosmetic dermatology, and hair care.',
        fees: 550,
        address: {
            line1: 'Pan Bazaar',
            line2: 'Opposite Cotton University, Guwahati'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Priyansh Das',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '6 Years',
        about: 'Dr. Das is trusted for child healthcare, immunizations, and growth monitoring in Guwahati.',
        fees: 500,
        address: {
            line1: 'Six Mile',
            line2: 'Near Down Town Hospital, Guwahati'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Abhinav Boro',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '12 Years',
        about: 'Dr. Boro provides expert care for neurological disorders such as migraines, epilepsy, and stroke.',
        fees: 800,
        address: {
            line1: 'Dispur Supermarket',
            line2: 'Near State Secretariat, Guwahati'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Sneha Goswami',
        image: doc6,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (Gynecology)',
        experience: '9 Years',
        about: 'Dr. Goswami provides comprehensive care for women, specializing in maternity, PCOD, and routine gynecological health.',
        fees: 500,
        address: {
            line1: 'Maligaon',
            line2: 'Near Maligaon Flyover, Guwahati'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Manoj Phukan',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS, MD (General Medicine)',
        experience: '9 Years',
        about: 'As a general physician, Dr. Phukan focuses on diagnosing and treating a wide range of common illnesses and providing preventive care.',
        fees: 650,
        address: {
            line1: 'Uzan Bazar',
            line2: 'Near Sukreswar Temple, Guwahati'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Anjali Deka',
        image: doc8,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastroenterology)',
        experience: '10 Years',
        about: 'Dr. Deka is a leading gastroenterologist in Guwahati, specializing in digestive disorders, liver diseases, and endoscopic procedures.',
        fees: 900,
        address: {
            line1: 'Silpukhuri',
            line2: 'Opposite AIDC Office, Guwahati'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Shilpa Nath',
        image: doc9,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Gynecology)',
        experience: '10 Years',
        about: 'Dr. Nath is dedicated to women reproductive health, offering expert care from adolescence through menopause.',
        fees: 600,
        address: {
            line1: 'Rehabari',
            line2: 'Near Railway Colony, Guwahati'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Anupam Bhuyan',
        image: doc10,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastroenterology)',
        experience: '8 Years',
        about: 'Dr. Bhuyan offers expert care for digestive system issues, including chronic acidity, IBS, and other gastrointestinal conditions.',
        fees: 400,
        address: {
            line1: 'Paltan Bazar',
            line2: 'Beside ASTC Bus Stand, Guwahati'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Hemanta Sarma',
        image: doc11,
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '10 Years',
        about: 'Dr. Sarma is highly regarded in Guwahati for his comprehensive approach to family medicine and preventive healthcare.',
        fees: 600,
        address: {
            line1: 'Khanapara',
            line2: 'Near Veterinary College, Guwahati'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Bidisha Medhi',
        image: doc12,
        speciality: 'Gynecologist',
        degree: 'MBBS, DGO, MD',
        experience: '13 Years',
        about: 'Dr. Medhi is an experienced gynecologist offering treatments in fertility, PCOS, and women’s wellness.',
        fees: 650,
        address: {
            line1: 'Chandmari',
            line2: 'Near Guwahati Commerce College, Guwahati'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Debojit Bordoloi',
        image: doc13,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '9 Years',
        about: 'Dr. Bordoloi provides treatments for acne, pigmentation, and hair fall with advanced dermatological care.',
        fees: 550,
        address: {
            line1: 'Lakhtokia',
            line2: 'Beside Fancy Bazar, Guwahati'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Sharmila Saikia',
        image: doc15,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '16 Years',
        about: 'Dr. Saikia is a senior neurologist in Guwahati specializing in Parkinson’s disease, epilepsy, and brain stroke management.',
        fees: 1000,
        address: {
            line1: 'Christian Basti',
            line2: 'Opposite Bora Service, Guwahati'
        }
    },
    {       
        _id: 'doc15',
        name: 'Dr. Utpal Baruah',
        image: doc14,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '7 Years',
        about: 'Dr. Baruah focuses on child health, growth, and preventive pediatrics for families in Guwahati.',
        fees: 500,
        address: {
            line1: 'Narengi',
            line2: 'Near Noonmati Refinery, Guwahati'
        }
    }
];