import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/Input/NavBar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { TravelStoryCard } from "../../components/Cards/TravelStoryCard";

export const Home = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        // Set user info if data exists
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        // Clear storage if unauthorized
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get All Travel Stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again !");
    }
  };

  // Handle Edit
  const handleEdit = (data) => {}


  // Handle Travel Story Click 
  const handleViewStory = (data) =>{}


  // Handle Favorite
  const updateIsFavorite = async (storyData) =>{}
  



  useEffect(() => {
    getUserInfo();
    getAllTravelStories();

    return () => {};
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} />

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => {
                  return (
                    <TravelStoryCard
                      key={item.id}
                      imgUrl={item.imgUrl}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavorite={item.isFavorite}
                      onEdit={() => handleEdit(item)}
                      onClick={() => handleViewStory(item)}
                      onFavoriteClick={() => updateIsFavorite(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <>Empty Card Here</>
            )}
          </div>

          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  );
};
export default Home;
