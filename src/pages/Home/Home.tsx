import React, { useEffect, useState } from "react";
import img1 from "../../assets/image-1.webp";
import img2 from "../../assets/image-2.webp";
import img3 from "../../assets/image-3.webp";
import img4 from "../../assets/image-4.webp";
import img5 from "../../assets/image-5.webp";
import img6 from "../../assets/image-6.webp";
import img7 from "../../assets/image-7.webp";
import img8 from "../../assets/image-8.webp";
import img9 from "../../assets/image-9.webp";
import img10 from "../../assets/image-10.jpeg";
import img11 from "../../assets/image-11.jpeg";
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
      {isLoading && <p className="text-lg">Loading...</p>}
      <div className="flex justify-between border-b border-gray-200 mb-8 pb-4">
        <div className="flex items-center">
          <input type="checkbox" className="w-4 h-4 rounded" />
          <label className="ml-2 text-md font-bold text-gray-800">2 Files Selected</label>
        </div>
        <button className="text-red-500 text-md font-medium">Delete Files</button>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-5">
          <>
            {!isLoading &&
              galleryData.length > 0 &&
              galleryData
                .filter((gallery) => {
                  if (gallery.featured) return true;
                })
                .map((gallery) => (
                  <div className="image_box md:col-span-2 border w-auto h-auto border-gray-300">
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

            <div className="md:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {!isLoading &&
                  galleryData.length > 0 &&
                  galleryData.map((gallery) => (
                    <>
                      {!gallery.featured && (
                        <div className="image_box border border-gray-300">
                          <div className="checkbox_area">
                            <input type="checkbox" className="w-4 h-4 rounded" />
                          </div>
                          <img src={gallery.image} alt="gallery" />
                          <div className="overlay"></div>
                        </div>
                      )}
                    </>
                  ))}

                <div className="border border-gray-300 border-dashed min-h-[150px] rounded-md flex items-center justify-center">
                  <div>
                    <img className="w-[30px] mx-auto" src={icon} alt="gallery" />
                    <p className="text-xl font-medium mt-4">Add Image</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
              <div className="image_box border border-gray-300">
                <div className="checkbox_area">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                </div>
                <img src={img6} alt="gallery" />
                <div className="overlay"></div>
              </div>
              <div className="image_box border border-gray-300">
                <div className="checkbox_area">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                </div>
                <img src={img7} alt="gallery" />
                <div className="overlay"></div>
              </div>
              <div className="image_box border border-gray-300">
                <div className="checkbox_area">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                </div>
                <img src={img8} alt="gallery" />
                <div className="overlay"></div>
              </div>
              <div className="image_box border border-gray-300">
                <div className="checkbox_area">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                </div>
                <img src={img9} alt="gallery" />
                <div className="overlay"></div>
              </div>
              <div className="border border-gray-300 border-dashed min-h-[150px] rounded-md flex items-center justify-center">
                <div>
                  <img className="w-[30px] mx-auto" src={icon} alt="gallery" />
                  <p className="text-xl font-medium mt-4">Add Image</p>
                </div>
              </div>
            </div> */}
      </div>
    </div>
  );
};

export default Home;
