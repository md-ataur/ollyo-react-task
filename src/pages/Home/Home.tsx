import React, { useEffect, useState } from "react";
import icon from "../../assets/image-icon.png";
import "./Home.css";

interface Gallery {
  id: number;
  image: string;
  featured: boolean;
}

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [galleryData, setGalleryData] = useState<Gallery[]>([]);

  const fetchApi = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("./gallery.JSON");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setGalleryData(data);
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between border-b border-gray-200 mb-8 pb-4">
        <div className="flex items-center">
          <input type="checkbox" className="w-4 h-4 rounded" />
          <label className="ml-2 text-md font-bold text-gray-800">2 Files Selected</label>
        </div>
        <button className="text-red-500 text-md font-medium">Delete Files</button>
      </div>
      {isLoading && <p className="text-lg pb-4">Loading...</p>}

      <div className="grid_gallery mb-5">
        <div className="featured_image">
          {!isLoading &&
            galleryData.length > 0 &&
            galleryData
              .filter((gallery) => {
                if (gallery.featured) return true;
              })
              .map((gallery) => (
                <div className="image_box border w-auto h-auto border-gray-300">
                  {gallery.featured && (
                    <>
                      <div className="checkbox_area">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                      </div>
                      <img src={gallery.image} alt="gallery" />
                      <div className="overlay"></div>
                    </>
                  )}
                </div>
              ))}
        </div>
        <>
          {!isLoading &&
            galleryData.length > 0 &&
            galleryData.map((gallery) => (
              <>
                {!gallery.featured && (
                  <div className="single_image">
                    <div className="image_box border border-gray-300">
                      <div className="checkbox_area">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                      </div>
                      <img src={gallery.image} alt="gallery" />
                      <div className="overlay"></div>
                    </div>
                  </div>
                )}
              </>
            ))}
        </>
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

export default Home;
