import React from 'react';
import DiscussionListItem, { DiscussionListItemProps } from './DiscussionListItem';

interface DiscussionListSectionProps {
  title: string;
  discussions: DiscussionListItemProps[];
  projectSlug: string;
}

const DiscussionListSection: React.FC<DiscussionListSectionProps> = ({
  title,
  discussions,
  projectSlug,
}) => {
  if (!discussions || discussions.length === 0) {
    return null; // Don't render the section if there are no discussions for it
  }

  return (
    <div className="mb-8">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
        {title}
      </h3>
      <div className="bg-white shadow-sm rounded-md border border-gray-200">
        {discussions.map((discussion) => (
          <DiscussionListItem 
            key={discussion.id} 
            {...discussion} 
            projectSlug={projectSlug} // Ensure projectSlug is passed here
          />
        ))}
      </div>
    </div>
  );
};

export default DiscussionListSection;

