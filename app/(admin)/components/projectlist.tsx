import Image from "next/image";

const projects = [
    { name: "Weather Forecast App", members: 22, image: "/images/weather.png" },
    { name: "Data Insights Dashboard", members: 14, image: "/images/data_insights.png" },
    { name: "Cybersecurity Tool", members: 35, image: "/images/cybersecurity.png" },
    { name: "University of Ilorin Examination Portal", members: 12, image: "/images/unilorin.png" },
  ];
  
  const ProjectsList = () => {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Squads Projects</h2>
          <button className="text-blue-600 text-sm">See all</button>
        </div>
        <ul className="space-y-4">
          {projects.map((project, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <Image 
                src={project.image} 
                alt={project.name} 
                className="w-10 h-10 rounded-md" />
                <p className="font-medium">{project.name}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{project.members}</p>
                <p className="text-sm text-gray-500">members</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProjectsList;