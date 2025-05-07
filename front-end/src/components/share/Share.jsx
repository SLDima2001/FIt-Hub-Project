import React, { useState } from "react";
import axios from "axios";
import "./share.scss";
import Image from "../../assets/img.png";

const Share = ({ userName, profilePic }) => {
  const [selectedImages, setSelectedImages] = useState([]); // Changed to an array
  const [previewImages, setPreviewImages] = useState([]); // Changed to an array
  const [description, setDescription] = useState("");

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length + selectedImages.length <= 3) { // Check if the total number of images doesn't exceed 3
      const newImages = [...selectedImages];
      const newPreviewImages = [...previewImages];
      
      for (let i = 0; i < files.length; i++) {
        newImages.push(files[i]);
        newPreviewImages.push(URL.createObjectURL(files[i]));
      }
      
      setSelectedImages(newImages);
      setPreviewImages(newPreviewImages);
    } else {
      alert("You can only upload up to 3 images.");
    }
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", userName);
      selectedImages.forEach((image, index) => {
        formData.append("postImages", image); // Append each image with a unique key
      });
      formData.append("description", description);
      
      const response = await axios.post("http://localhost:8080/setPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Handle success response
      alert("Post successful");
    } catch (error) {
      console.error("Error posting images:", error); // Handle error
      alert("Unable to post");
    }
    window.location.reload();
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
          <input
            type="text"
            placeholder={`What's on your mind ${userName}?`}
            value={description} // Bind value of input field to description state
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr />
        <div className="image-previews">
          {previewImages.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              style={{
                maxWidth: "100%",
                maxHeight: "auto",
                objectFit: "cover",
                marginTop: "20px"
              }}
            />
          ))}
        </div>
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
              multiple // Allow multiple file selection
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Images</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handlePost}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
