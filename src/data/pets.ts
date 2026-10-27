import pet1Buddy from "@/assets/pet-1-buddy.jpg";
import pet2Luna from "@/assets/pet-2-luna.jpg";
import pet3Milo from "@/assets/pet-3-milo.jpg";
import pet4Rio from "@/assets/pet-4-rio.jpg";
import pet5Nala from "@/assets/pet-5-nala.jpg";
import pet6Simba from "@/assets/pet-6-simba.jpg";
import pet7Coco from "@/assets/pet-7-coco.jpg";
import pet8Maya from "@/assets/pet-8-maya.jpg";
import pet9Bruno from "@/assets/pet-9-bruno.jpg";
import pet10Pepper from "@/assets/pet-10-pepper.jpg";
import pet11Chai from "@/assets/pet-11-chai.jpg";
import pet12Tara from "@/assets/pet-12-tara.jpg";
import pet13Olive from "@/assets/pet-13-olive.jpg";
import pet14Piku from "@/assets/pets-birds.jpg";
import pet15Hazel from "@/assets/pets-rabbits.jpg";
import pet16Zoya from "@/assets/pets-dogs.jpg";

export type Species = "Dog" | "Cat" | "Rabbit" | "Bird" | "Other";
export type AgeCategory = "Baby" | "Young" | "Adult" | "Senior";
export type Pet = {
  id: number;
  name: string;
  species: Species;
  breed: string;
  age: string;
  ageCategory: AgeCategory;
  gender: "Male" | "Female";
  size: "Small" | "Medium" | "Large";
  location: string;
  image: string;
  description: string;
  traits: string[];
  vaccinated: boolean;
  sterilized: boolean;
  goodWithChildren: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  status: "Available" | "On hold";
  rescue: string;
  featured?: boolean;
  arrival: number;
};

const base = {
  vaccinated: true,
  sterilized: true,
  status: "Available" as const,
  rescue: "Kindred Paws Collective",
};

export const pets: Pet[] = [
  {
    ...base,
    id: 1,
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    ageCategory: "Adult",
    gender: "Male",
    size: "Large",
    location: "Mumbai, India",
    image: pet1Buddy,
    description:
      "A sunny, loyal adventurer who loves long walks and carrying his favourite tennis ball.",
    traits: ["Friendly", "Playful", "Energetic"],
    goodWithChildren: true,
    goodWithDogs: true,
    goodWithCats: true,
    featured: true,
    arrival: 16,
  },
  {
    ...base,
    id: 2,
    name: "Luna",
    species: "Cat",
    breed: "Domestic Shorthair",
    age: "1 year",
    ageCategory: "Young",
    gender: "Female",
    size: "Small",
    location: "Pune, India",
    image: pet2Luna,
    description: "A calm, affectionate companion who enjoys quiet afternoons and gentle cuddles.",
    traits: ["Calm", "Affectionate", "Gentle"],
    sterilized: false,
    goodWithChildren: true,
    goodWithDogs: false,
    goodWithCats: true,
    featured: true,
    arrival: 15,
  },
  {
    ...base,
    id: 3,
    name: "Milo",
    species: "Rabbit",
    breed: "Mini Rex",
    age: "8 months",
    ageCategory: "Baby",
    gender: "Male",
    size: "Small",
    location: "Bengaluru, India",
    image: pet3Milo,
    description: "A curious little explorer with velvety ears and a fondness for leafy treats.",
    traits: ["Curious", "Quiet", "Sweet"],
    goodWithChildren: true,
    goodWithDogs: false,
    goodWithCats: false,
    featured: true,
    arrival: 14,
  },
  {
    ...base,
    id: 4,
    name: "Rio",
    species: "Bird",
    breed: "Green-cheek Conure",
    age: "3 years",
    ageCategory: "Adult",
    gender: "Male",
    size: "Small",
    location: "Chennai, India",
    image: pet4Rio,
    description: "A clever, social bird who whistles cheerful tunes and enjoys enrichment games.",
    traits: ["Clever", "Social", "Vocal"],
    sterilized: false,
    goodWithChildren: true,
    goodWithDogs: false,
    goodWithCats: false,
    featured: true,
    arrival: 13,
  },
  {
    ...base,
    id: 5,
    name: "Nala",
    species: "Cat",
    breed: "Indian Shorthair",
    age: "4 years",
    ageCategory: "Adult",
    gender: "Female",
    size: "Small",
    location: "Delhi, India",
    image: pet5Nala,
    description:
      "Independent at first, deeply loving once she trusts you, and always ready for a sunny nap.",
    traits: ["Independent", "Loyal", "Quiet"],
    goodWithChildren: false,
    goodWithDogs: false,
    goodWithCats: true,
    featured: true,
    arrival: 12,
  },
  {
    ...base,
    id: 6,
    name: "Simba",
    species: "Dog",
    breed: "Indian Pariah",
    age: "10 months",
    ageCategory: "Young",
    gender: "Male",
    size: "Medium",
    location: "Hyderabad, India",
    image: pet6Simba,
    description: "A bright, resilient pup who learns quickly and makes friends everywhere he goes.",
    traits: ["Smart", "Brave", "Sociable"],
    goodWithChildren: true,
    goodWithDogs: true,
    goodWithCats: true,
    featured: true,
    arrival: 11,
  },
  {
    ...base,
    id: 7,
    name: "Coco",
    species: "Rabbit",
    breed: "Dutch Rabbit",
    age: "2 years",
    ageCategory: "Adult",
    gender: "Female",
    size: "Small",
    location: "Kolkata, India",
    image: pet7Coco,
    description: "Gentle and tidy, Coco thrives in a calm home with room to hop and explore.",
    traits: ["Gentle", "Neat", "Shy"],
    goodWithChildren: true,
    goodWithDogs: false,
    goodWithCats: true,
    featured: true,
    arrival: 10,
  },
  {
    ...base,
    id: 8,
    name: "Maya",
    species: "Bird",
    breed: "Cockatiel",
    age: "5 years",
    ageCategory: "Adult",
    gender: "Female",
    size: "Small",
    location: "Jaipur, India",
    image: pet8Maya,
    description: "A soft-natured cockatiel who loves music, millet, and being part of the family.",
    traits: ["Musical", "Gentle", "Social"],
    sterilized: false,
    goodWithChildren: true,
    goodWithDogs: false,
    goodWithCats: false,
    featured: true,
    arrival: 9,
  },
  {
    ...base,
    id: 9,
    name: "Bruno",
    species: "Dog",
    breed: "Labrador Mix",
    age: "7 years",
    ageCategory: "Senior",
    gender: "Male",
    size: "Large",
    location: "Goa, India",
    image: pet9Bruno,
    description: "A mellow gentleman who asks for little more than a soft bed and devoted company.",
    traits: ["Mellow", "Devoted", "Patient"],
    goodWithChildren: true,
    goodWithDogs: true,
    goodWithCats: true,
    arrival: 8,
  },
  {
    ...base,
    id: 10,
    name: "Pepper",
    species: "Cat",
    breed: "Tuxedo",
    age: "5 months",
    ageCategory: "Baby",
    gender: "Female",
    size: "Small",
    location: "Ahmedabad, India",
    image: pet10Pepper,
    description: "A tiny comedian with bright eyes, endless curiosity, and an impressive purr.",
    traits: ["Funny", "Curious", "Bold"],
    sterilized: false,
    goodWithChildren: true,
    goodWithDogs: true,
    goodWithCats: true,
    arrival: 7,
  },
  {
    ...base,
    id: 11,
    name: "Chai",
    species: "Other",
    breed: "Guinea Pig",
    age: "1 year",
    ageCategory: "Young",
    gender: "Male",
    size: "Small",
    location: "Kochi, India",
    image: pet11Chai,
    description: "A chatty little foodie who squeaks hello and adores fresh coriander.",
    traits: ["Chatty", "Foodie", "Gentle"],
    sterilized: false,
    goodWithChildren: true,
    goodWithDogs: false,
    goodWithCats: false,
    arrival: 6,
  },
  {
    ...base,
    id: 12,
    name: "Tara",
    species: "Dog",
    breed: "Indie Mix",
    age: "3 years",
    ageCategory: "Adult",
    gender: "Female",
    size: "Medium",
    location: "Chandigarh, India",
    image: pet12Tara,
    description: "An observant, athletic companion who blossoms with patient, positive guidance.",
    traits: ["Athletic", "Observant", "Loving"],
    goodWithChildren: true,
    goodWithDogs: true,
    goodWithCats: false,
    arrival: 5,
  },
  {
    ...base,
    id: 13,
    name: "Olive",
    species: "Cat",
    breed: "Calico",
    age: "9 years",
    ageCategory: "Senior",
    gender: "Female",
    size: "Small",
    location: "Lucknow, India",
    image: pet13Olive,
    description: "A dignified lap cat seeking a peaceful home for her golden years.",
    traits: ["Dignified", "Cuddly", "Peaceful"],
    goodWithChildren: false,
    goodWithDogs: false,
    goodWithCats: true,
    arrival: 4,
  },
  {
    ...base,
    id: 14,
    name: "Piku",
    species: "Bird",
    breed: "Budgerigar",
    age: "1 year",
    ageCategory: "Young",
    gender: "Male",
    size: "Small",
    location: "Bhopal, India",
    image: pet14Piku,
    description: "A lively budgie who enjoys company, foraging puzzles, and morning chatter.",
    traits: ["Lively", "Bright", "Playful"],
    sterilized: false,
    goodWithChildren: true,
    goodWithDogs: false,
    goodWithCats: false,
    arrival: 3,
  },
  {
    ...base,
    id: 15,
    name: "Hazel",
    species: "Rabbit",
    breed: "Lionhead",
    age: "4 years",
    ageCategory: "Adult",
    gender: "Female",
    size: "Small",
    location: "Surat, India",
    image: pet15Hazel,
    description:
      "A fluffy, composed rabbit who appreciates a predictable routine and gentle handling.",
    traits: ["Composed", "Fluffy", "Gentle"],
    goodWithChildren: true,
    goodWithDogs: false,
    goodWithCats: true,
    arrival: 2,
  },
  {
    ...base,
    id: 16,
    name: "Zoya",
    species: "Dog",
    breed: "Beagle Mix",
    age: "6 months",
    ageCategory: "Baby",
    gender: "Female",
    size: "Medium",
    location: "Nagpur, India",
    image: pet16Zoya,
    description: "A spirited puppy with a fantastic nose and an even bigger heart.",
    traits: ["Spirited", "Curious", "Affectionate"],
    goodWithChildren: true,
    goodWithDogs: true,
    goodWithCats: true,
    status: "On hold",
    arrival: 1,
  },
];

export const categoryImages: Record<string, string> = {
  Dog: pet1Buddy,
  Cat: pet2Luna,
  Rabbit: pet3Milo,
  Bird: pet4Rio,
  Other: pet11Chai,
};

export const successStories = [
  {
    id: 1,
    pet: "Mochi",
    adopter: "Aarav & Neha",
    type: "Dog",
    date: "June 2026",
    image: pet1Buddy,
    quote: "Mochi turned our evening walks into the best part of every day.",
    story:
      "After three gentle introductions, Mochi chose the sunny spot by our balcony and made it clear he was home. He now joins every family outing.",
  },
  {
    id: 2,
    pet: "Mishti",
    adopter: "The Iyer family",
    type: "Cat",
    date: "April 2026",
    image: pet2Luna,
    quote: "She brought a calm rhythm and so much laughter into our home.",
    story:
      "Mishti was shy in the shelter, but within a week she was sleeping beside the children and greeting everyone at the door.",
  },
  {
    id: 3,
    pet: "Pip",
    adopter: "Rhea",
    type: "Rabbit",
    date: "February 2026",
    image: pet3Milo,
    quote: "Learning his little routines has been an absolute joy.",
    story:
      "Pip now has a spacious indoor pen, a garden play hour, and a devoted human who plans her weekends around fresh herb shopping.",
  },
];

export function getPet(id: string | number) {
  return pets.find((pet) => pet.id === Number(id));
}

export function ageInMonths(age: string): number {
  if (!age || typeof age !== "string") return 0;
  const lower = age.toLowerCase().trim();

  let totalMonths = 0;
  let matched = false;

  const yearMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:years?|yrs?|y\b)/);
  const yearVal = yearMatch?.[1];
  if (yearVal) {
    totalMonths += parseFloat(yearVal) * 12;
    matched = true;
  }

  const monthMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:months?|mos?|m\b)/);
  const monthVal = monthMatch?.[1];
  if (monthVal) {
    totalMonths += parseFloat(monthVal);
    matched = true;
  }

  const weekMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:weeks?|wks?|w\b)/);
  const weekVal = weekMatch?.[1];
  if (weekVal) {
    totalMonths += parseFloat(weekVal) / 4;
    matched = true;
  }

  if (matched) {
    return totalMonths;
  }

  const fallback = parseFloat(lower);
  return isNaN(fallback) ? 0 : fallback;
}

export type PetFilterOptions = {
  q?: string;
  species?: string;
  location?: string;
  age?: string;
  gender?: string;
  size?: string;
  breed?: string;
  good?: string[];
  sort?: string;
};

export function filterAndSortPets(
  petList: Pet[],
  {
    q = "",
    species = "",
    location = "",
    age = "",
    gender = "",
    size = "",
    breed = "",
    good = [],
    sort = "recommended",
  }: PetFilterOptions = {},
): Pet[] {
  return petList
    .filter(
      (p) =>
        (!q ||
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.breed.toLowerCase().includes(q.toLowerCase())) &&
        (!species || p.species === species) &&
        (!location || p.location.toLowerCase().includes(location.toLowerCase())) &&
        (!age || p.ageCategory === age) &&
        (!gender || p.gender === gender) &&
        (!size || p.size === size) &&
        (!breed || p.breed.toLowerCase().includes(breed.toLowerCase())) &&
        (!good.includes("children") || p.goodWithChildren) &&
        (!good.includes("dogs") || p.goodWithDogs) &&
        (!good.includes("cats") || p.goodWithCats),
    )
    .sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sort === "age") {
        return ageInMonths(a.age) - ageInMonths(b.age);
      }
      if (sort === "newest") {
        // Most recent rescue arrivals first (latest added pet IDs first)
        return b.id - a.id;
      }
      // "recommended" (default): featured/ready-to-adopt pets first, then by priority/id
      const aFeatured = a.featured ? 1 : 0;
      const bFeatured = b.featured ? 1 : 0;
      if (bFeatured !== aFeatured) {
        return bFeatured - aFeatured;
      }
      return a.id - b.id;
    });
}
