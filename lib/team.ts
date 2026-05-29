/**
 * Team roster for the /about page. One real entry (founder) plus three
 * pending seats. `pending` lists what still needs the founder's input — when an
 * entry has `pending: ["full"]` the whole card renders as a hiring placeholder.
 */
export type Member = {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  location: string;
  expertise: string[];
  pending: string[];
};

export const TEAM: Member[] = [
  {
    name: "Viktor Mozsa",
    role: "Founder & CEO",
    location: "Central EU",
    expertise: ["GEO strategy", "Paid acquisition", "Account leadership"],
    pending: ["bio", "photo"],
  },
  {
    name: "[Pending: GEO lead]",
    role: "Head of GEO",
    location: "Central EU",
    expertise: ["Entity engineering", "Citation analytics"],
    pending: ["full"],
  },
  {
    name: "[Pending: Paid lead]",
    role: "Head of Paid",
    location: "US",
    expertise: ["Brand-search capture", "Quality Score engineering"],
    pending: ["full"],
  },
  {
    name: "[Pending: Engineering lead]",
    role: "Head of Engineering",
    location: "Central EU",
    expertise: ["Momentus platform", "Data infrastructure"],
    pending: ["full"],
  },
];
