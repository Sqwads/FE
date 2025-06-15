import React from "react";
const reviews = [
  {
    name: "Habibat Moguji",
    title: "Frontend Developer",
    date: "27th October, 2024",
    avatar: "/lovable-uploads/aaf735be-be5e-4b65-af71-2d6062a59f97.png",
    comment:
      "Mr Adewale was a game-changer to my career! He broke down complex concepts into bite-sized, easy-to-understand chunks. His approach made me feel confident tackling coding challenges I once avoided.",
  },
  {
    name: "Saad Bashar",
    title: "Frontend Developer",
    date: "20th October, 2024",
    avatar: "/lovable-uploads/94e6458f-4ac5-4184-b17a-a97183284e61.png",
    comment:
      "I hit a roadblock with one of my portfolio projects, but Mr Adewale Taofeeq provided clear and practical guidance every step of the way...",
  },
  {
    name: "Yusuf Olowode",
    title: "Full-stack Developer",
    date: "6th October, 2024",
    avatar: "/lovable-uploads/aaf735be-be5e-4b65-af71-2d6062a59f97.png",
    comment:
      "I struggled with version control using Git, but Adewale was so patient. He guided me through the process step-by-step until I fully grasped it...",
  },
  {
    name: "Josephine Uzor",
    title: "Developer",
    date: "23rd September 2024",
    avatar: "/lovable-uploads/94e6458f-4ac5-4184-b17a-a97183284e61.png",
    comment: "Thank you, sir.",
  },
];

const ReviewList = () => (
  <div className="space-y-6 min-h-48 flex justify-center items-center text-gray-300 text-lg font-medium">
      NO REVIEW YET
    {/* {reviews.map((r, idx) => (
      <div key={idx} className="flex gap-4">
        <img src={r.avatar} alt={r.name} className="rounded-full w-12 h-12 object-cover" />
        <div>
          <div className="flex gap-2 items-baseline">
            <span className="font-medium">{r.name}</span>
            <span className="text-xs text-blue-700 font-semibold">{r.title}</span>
            <span className="text-xs text-muted-foreground">{r.date}</span>
          </div>
          <div className="text-sm mt-1">{r.comment}</div>
        </div>
      </div>
    ))} */}
  </div>
);

export default ReviewList;