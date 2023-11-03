import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import icon from "../../assets/image-icon.png";
import "./Home.css";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";

interface Gallery {
  id: number;
  image: string;
  featured: boolean;
}

const HomeDnd: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [galleryData, setGalleryData] = useState<Gallery[]>([]);
  const [checkedIDs, setCheckedIDs] = useState<number[]>([]);

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

  const reorderGalleryData = (startIndex: number, endIndex: number) => {
    const updatedGalleryData = Array.from(galleryData);
    const [movedItem] = updatedGalleryData.splice(startIndex, 1);
    updatedGalleryData.splice(endIndex, 0, movedItem);
    setGalleryData(updatedGalleryData);
  };

  const getOrderedGalleryData = () => {
    const featuredImage = galleryData.find((gallery) => gallery.featured);
    const otherImages = galleryData.filter((gallery) => !gallery.featured);
    return [featuredImage, ...otherImages];
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

      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          reorderGalleryData(result.source.index, result.destination.index);
          const draggedImage = galleryData[result.source.index];
          const updatedImages = [...galleryData];
          if (result.destination.droppableId === "featured" && !draggedImage.featured) {
            // If a non-featured image is dropped in the featured section, make it featured
            draggedImage.featured = true;
            updatedImages.splice(result.source.index, 1); // Remove the image from its original position
            updatedImages.unshift(draggedImage); // Add it to the beginning of the array
            setGalleryData(updatedImages);
          }
        }}
      >
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid_gallery mb-5">
              {getOrderedGalleryData()
                .filter((gallery) => gallery)
                .map((gallery, index) => (
                  <Draggable key={gallery.id} draggableId={gallery.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={gallery && gallery.featured ? "featured_image" : "single_image"}
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
                          <div key={gallery.id}>
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
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isLoading && <p className="text-lg pb-4">Loading...</p>}
    </div>
  );
};

export default HomeDnd;
