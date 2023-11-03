import React, { useEffect, useState } from "react";
import icon from "../../assets/image-icon.png";
import "./Home.css";

interface Gallery {
  id: number;
  image: string;
  featured: boolean;
}

const HomeDnd: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [galleryData, setGalleryData] = useState<Gallery[]>([]);
  const [checkedIDs, setCheckedIDs] = useState<number[]>([]);
  const [draggedImage, setDraggedImage] = useState<Gallery | null>(null);
  const [dropTarget, setDropTarget] = useState<Gallery | null>(null);

  // Add checked ids
  const addToCheckedIds = (id: number) => {
    const newArray = [...checkedIDs, id];
    setCheckedIDs(newArray);
  };

  // Remove checked ids
  const removeFromCheckedIds = (id: number) => {
    setCheckedIDs(checkedIDs.filter((checkedID) => checkedID !== id));
  };

  // Data fetch from api
  const fetchApi = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("./gallery.JSON");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setGalleryData(data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Delete image
  const removeImage = () => {
    if (checkedIDs.length === 0) return;

    // Create a new array containing only the images that are not checked for deletion
    const updatedGalleryData = galleryData.filter((gallery) => !checkedIDs.includes(gallery.id));

    // Update the state with the new array
    setGalleryData(updatedGalleryData);

    // Clear the checkedIDs
    setCheckedIDs([]);
  };

  // Showing featured image at first
  const getOrderedGalleryData = () => {
    const featuredImage = galleryData.find((gallery) => gallery.featured);
    const otherImages = galleryData.filter((gallery) => !gallery.featured);
    return [featuredImage, ...otherImages];
  };

  // Drag and drop handler
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, gallery: Gallery) => {
    setDraggedImage(gallery);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, gallery: Gallery) => {
    e.preventDefault();
    setDropTarget(gallery);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = () => {
    if (draggedImage && dropTarget) {
      const updatedGalleryData = [...galleryData];
      const draggedIndex = galleryData.findIndex((gallery) => gallery.id === draggedImage.id);
      const dropIndex = galleryData.findIndex((gallery) => gallery.id === dropTarget.id);

      if (draggedIndex !== -1 && dropIndex !== -1) {
        // Swap the positions of the images
        [updatedGalleryData[draggedIndex], updatedGalleryData[dropIndex]] = [
          updatedGalleryData[dropIndex],
          updatedGalleryData[draggedIndex],
        ];

        // Swap the "featured" status as well
        [updatedGalleryData[draggedIndex].featured, updatedGalleryData[dropIndex].featured] = [
          updatedGalleryData[dropIndex].featured,
          updatedGalleryData[draggedIndex].featured,
        ];

        setGalleryData(updatedGalleryData);
      }
    }

    setDraggedImage(null);
    setDropTarget(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between border-b border-gray-200 mb-8 pb-4">
        {checkedIDs.length > 0 ? (
          <div className="flex items-center">
            <input
              checked={checkedIDs.length > 0 ? true : false}
              readOnly
              type="checkbox"
              className="w-4 h-4 rounded"
            />
            <label className="ml-2 text-lg font-bold text-gray-800">
              {checkedIDs.length} {checkedIDs.length > 1 ? "Files Selected" : "File Selected"}
            </label>
          </div>
        ) : (
          <p className="text-lg font-bold text-gray-800">Gallery</p>
        )}

        {checkedIDs.length > 0 && (
          <button onClick={removeImage} className="text-red-500 text-md font-medium">
            {checkedIDs.length > 1 ? "Delete Files" : "Delete File"}
          </button>
        )}
      </div>

      {isLoading && <p className="text-lg pb-4">Loading...</p>}

      <div className="grid_gallery mb-5">
        {getOrderedGalleryData().map((gallery, index) => (
          <div
            key={gallery?.id ?? index}
            className={gallery && gallery.featured ? "featured_image" : "single_image"}
            onDragStart={(e) => handleDragStart(e, gallery ?? ({} as Gallery))}
            onDragEnter={(e) => handleDragEnter(e, gallery ?? ({} as Gallery))}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable
            style={{
              transform:
                draggedImage && dropTarget && gallery?.id === dropTarget.id ? "scale(1.1)" : "",
            }}
          >
            {gallery && gallery.featured && (
              <div className="image_box border border-gray-300">
                <div className="checkbox_area">
                  <input
                    checked={checkedIDs.includes(gallery.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        addToCheckedIds(gallery.id);
                      } else {
                        removeFromCheckedIds(gallery.id);
                      }
                    }}
                    type="checkbox"
                    className="w-4 h-4 rounded"
                  />
                </div>
                <img
                  className={checkedIDs.includes(gallery.id) ? "selected-image" : ""}
                  src={gallery.image}
                  alt="gallery"
                />
                <div className="overlay"></div>
              </div>
            )}

            {gallery && !gallery.featured && (
              <div className="image_box border border-gray-300">
                <div className="checkbox_area">
                  <input
                    checked={checkedIDs.includes(gallery.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        addToCheckedIds(gallery.id);
                      } else {
                        removeFromCheckedIds(gallery.id);
                      }
                    }}
                    type="checkbox"
                    className="w-4 h-4 rounded"
                  />
                </div>
                <img
                  className={checkedIDs.includes(gallery.id) ? "selected-image" : ""}
                  src={gallery.image}
                  alt="gallery"
                />
                <div className="overlay"></div>
              </div>
            )}
          </div>
        ))}

        <div className="border border-gray-300 border-dashed min-h-[150px] rounded-md flex items-center justify-center">
          <div>
            <img className="w-[30px] mx-auto" src={icon} alt="gallery" />
            <p className="text-xl font-medium mt-4">Add Image</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDnd;
