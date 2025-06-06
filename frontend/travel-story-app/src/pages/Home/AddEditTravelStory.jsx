import React, { useState } from "react";
import { MdAdd, MdClose, MdUpdate, MdDeleteOutline } from "react-icons/md";
import { DateSelector } from "../../components/Input/DateSelector";
import { ImageSelector } from "../../components/Input/ImageSelector";
import { TagInput } from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import { toast } from "react-toastify";
import uploadImage from "../../utils/uploadImage";

export const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [title, setTitle] = useState("");
  const [storyImg, setStoryImg] = useState(null);
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedLocation] = useState([]);
  const [visitedDate, setVisitedDate] = useState(null);
  const [error, setError] = useState("");

  // Add New Travel Story
  const addNewTravelStory = async () => {
    try {
      let imageUrl = "";

      // Upload image if present
      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg);
        // Get Image URL
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/add-tavel-story", {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success("Story Added Successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      console.error("Error adding travel story:", error);
    }
  };

  // Update Travel Story
  const updateTravelStory = async () => {};

  const handleAddOrUpdateClick = () => {
    console.log("Input Data:", {title, storyImg, story, visitedLocation, visitedDate,});

    if (!title) {
      setError("Please enter the title ! ");
      return;
    }

    if (!story) {
      setError("Please enter the descprition ! ");
      return;
    }

    setError("");

    if (type === "edit") {
      updateTravelStory();
    } else {
      addNewTravelStory ();
    }
  };

  // Delete story image and update story
  const handleDeleteStoryImg = async () => {};
  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <MdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg" /> UPDATE STORY
                </button>

                {/* <button className="btn-small btn-delete" onClick={onClose}>
                  <MdDeleteOutline className="text-lg" /> DELETE
                </button> */}
              </>
            )}

            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="A day in London"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImg={handleDeleteStoryImg}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">STORY</label>
            <textarea
              type="text"
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              rows={10}
              placeholder="Your Story"
              value={story}
              onChange={({ target }) => setStory(target.value)}
            />
          </div>

          <div className="pt-3">
            <label className="input-label">VISITED LOCATIONS</label>
            <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};
