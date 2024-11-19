import landingPageImage from "../assets/images/landingPageImage.png";
const LandingPage = () => {
  return (
    <div>
      <section className="text-gray-800 body-font">
        <div className="container mx-auto flex px-5 py-16 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              User Management System
            </h1>
            <p className="mb-8 leading-relaxed text-justify">
              The User Management System is a comprehensive solution designed to
              efficiently manage user information. It features a User List that
              displays registered users in a tabular format, allowing
              administrators to filter users by name for quick searches. The
              system also supports sorting by name and email, enabling better
              organization of user data. To enhance navigation, pagination is
              implemented, displaying 5 rows per page. Additionally, the system
              offers a User Details view, where more in-depth information about
              each user can be accessed by selecting a user from the list. This
              design streamlines the management of user data, making it easier
              to search, organize, and access detailed profiles.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex items-center justify-center">
            <img
              src={landingPageImage}
              alt="User Management System"
              className="w-96 h-960"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
