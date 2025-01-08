import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/Input/NavBar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { TravelStoryCard } from "../../components/Cards/TravelStoryCard";
import { ToastContainer, toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { AddEditTravelStory } from "../Home/AddEditTravelStory";

export const Home = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

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
  const handleEdit = (data) => {};

  // Handle Travel Story Click
  const handleViewStory = (data) => {};

  // Handle Favorite
  const updateIsFavorite = async (storyData) => {
    const storyId = storyData._id;

    try {
      const updateIsFavorite = !storyData.isFavorite;
      const response = await axiosInstance.put(
        "/update-is-favorite/" + storyId,
        { isFavorite: updateIsFavorite }
      );

      if (response.data && response.data.story) {
        toast.success("Story Updated Successfuly");
        getAllTravelStories();
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again !");
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();

    return () => {};
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} />

      {/* <div className="container mx-auto py-10">
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
      </div> */}

      <div className="container mx-auto py-10 flex flex-col items-center">
        <div className="w-full flex justify-center">
          <div className="flex flex-col items-center w-full max-w-[900px]">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
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
              <div className="text-gray-500 text-center">
                No stories available.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add & Edit Story Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="modal-box"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </>
  );
};
export default Home;
