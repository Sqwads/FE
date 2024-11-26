const Value = () => {
  return (
    <section>
      {/* First Section - Benefits */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
              Benefits
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Value Proposition
            </h2>
          </div>

          {/* Cards Section */}
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-6">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path d="M9.97308 18H11V13H13V18H14.0269C14.1589 16.7984 14.7721 15.8065 15.7676 14.7226C15.8797 14.6006 16.5988 13.8564 16.6841 13.7501C17.5318 12.6931 18 11.385 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3843 6.46774 12.6917 7.31462 13.7484C7.40004 13.855 8.12081 14.6012 8.23154 14.7218C9.22766 15.8064 9.84103 16.7984 9.97308 18ZM10 20V21H14V20H10ZM5.75395 14.9992C4.65645 13.6297 4 11.8915 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 11.8925 19.3428 13.6315 18.2443 15.0014C17.624 15.7748 16 17 16 18.5V21C16 22.1046 15.1046 23 14 23H10C8.89543 23 8 22.1046 8 21V18.5C8 17 6.37458 15.7736 5.75395 14.9992Z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Hands-On Experience
              </h3>
              <p className="mt-4 text-gray-500 text-center">
                Work on real projects to develop practical skills.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Mentorship
              </h3>
              <p className="mt-4 text-gray-500 text-center">
                Guidance from industry professionals to thrive.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6H21V18H3V6ZM2 4C1.44772
               4 1 4.44772 1 5V19C1 19.5523 1.44772 20 2 20H22C22.5523 20 23 19.5523 23 19V5C23 4.44772 22.5523 4 22 4H2ZM13
                8H19V10H13V8ZM18 12H13V14H18V12ZM10.5 10C10.5 11.3807 9.38071 12.5 8 12.5C6.61929 12.5 5.5 11.3807 5.5 10C5.5 
                8.61929 6.61929 7.5 8 7.5C9.38071 7.5 10.5 8.61929 10.5 10ZM8 13.5C6.067 13.5 4.5 15.067 4.5 17H11.5C11.5 15.067
                 9.933 13.5 8 13.5Z"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Portfolio Building
              </h3>
              <p className="mt-4 text-gray-500 text-center">
                Showcase your completed projects to impress recruiters.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="relative flex items-center">
      {/* Image Section */}
      <div className="w-[60%]">
        <img
          src="/images/mission.jpg"
          alt="Mission"
          className="w-full h-[750px] object-cover rounded-3xl"
        />
      </div>

      {/* Text Section */}
      <div className="w-[40%] -ml-10 relative z-10">
        <div className="bg-blue-900 text-white p-10 rounded-3xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6">
            Mission: To empower Africa&apos;s aspiring professionals with open-source projects and hands-on learning opportunities.
          </h3>
          <p className="text-sm leading-relaxed">
            At Sqwads, we believe in the power of collaboration and community.
            We bridge the gap between learning and doing by connecting students, interns, and career-transitioning individuals to open-source projects. We empower users to build projects, refine their skills, and enhance their employability, preparing them for success in a fast-paced tech landscape.
          </p>
          <p className="mt-4 text-sm font-medium">
            Join us in shaping the future of technology, one project at a time.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>




    </section>
  );
};

export default Value;
