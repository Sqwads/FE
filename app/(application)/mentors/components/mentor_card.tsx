import { useRouter } from "next/navigation";
import React from "react";

interface MentorCardProps {
  name?: string;
  title?: string;
  image?: string;
  experience?: string | number;
  rating?: number;
  reviewCount?: number;
  ribbonText?: string;
  id: string;
  onProfileClick?: () => void;
}
const MentorCard: React.FC<MentorCardProps> = ({
  name,
  title,
  image,
  experience,
  rating=2,
  reviewCount,
  ribbonText = "",
  onProfileClick,
  id
}) => {

  const router = useRouter()

  return (
    <div className="relative bg-white rounded-xl shadow border  flex flex-col items-start w-full h-full transition duration-200 hover:shadow-lg">
      {ribbonText && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-md uppercase">{ribbonText}</span>
        </div>
      )}
      <img
        src={image  || '/images/profile.jpg'}
        alt={name}
        className="w-full h-36 mb-5 object-cover rounded-lg border mb-4"
      />
      <div className="mb-2 px-4">
        <div className="font-bold text-lg">{name}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
      <div className="flex px-4 items-center gap-2 text-xs mt-2 mb-4">
        <span className="flex items-center gap-0.5  font-semibold">
        {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>
                {rating && rating >= i + 1 ? <span className="text-yellow-500">★</span> : <span className="text-gray-300">★</span>}
            </span>
        ))}
        <span className="ml-1">{rating?.toFixed(1)}</span>
        </span>
        <span className="text-muted-foreground">({reviewCount} ratings)</span>
      </div>


        <div className="flex bg-[#F5F5F599] px-4 py-5 justify-between w-full">
            <div
              onClick={()=>router.push(`/mentors/${id}`)}
              className="cursor-pointer underline text-[#001D69] font-semibold"
            >
                View Profile
            </div>
            <div className="text-sm">
                <span className="font-medium">{experience || 0} Years: </span>
                <span className="text-gray-400">Experience</span>
            </div>
        
      </div>
    </div>
  );
};

export default MentorCard;