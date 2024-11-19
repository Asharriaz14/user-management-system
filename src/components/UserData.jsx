import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserDetail } from "./ApiService";

const UserData = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const details = await fetchUserDetail(id);
        // console.log("User Details ====", details);
        setUser(details);
      } catch (error) {
        console.log("Error", error);
        setError("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User Not Found</div>;
  }
  const { name, email, address, phone, website } = user;
  const { street, suite, city, zipcode } = address;
  // console.log("Address===", address)

  const handleNavigate = () => {
    // console.log("clicked");
    navigate("/dashboard");
  };
  return (
    <div>
      <div className="flex items-center justify-center mt-8">
        <div className="bg-white overflow-hidden shadow rounded-lg border w-96 ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {name} Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This is some information about the {name}.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {name}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {phone}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Website</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {website}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {`${street}, ${suite}, ${city}, ${zipcode}`}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="text-center ">
        <button
          className=" text-sm text-mainBlue font-bold underline cursor-pointer p-3 my-2 hover:text-hoverBlue"
          onClick={handleNavigate}
        >
          Back to Users
        </button>
      </div>
    </div>
  );
};

export default UserData;
