

const VideoTitle = ({ title, overview }) => {
  return (
      <div className="w-screen aspect-video pt-[70%] md:pt-[20%] px-5 md:px-16 absolute text-white md:bg-gradient-to-r from-black">
      <h1 className="text-xl md:text-4xl md:font-bold md:my-3">{title}</h1>
      <p className="hidden lg:block w-2/4 my-3">{overview}</p>
      <div className="hidden lg:flex  my-10">
        <button className="bg-white p-3 text-xl text-black px-6 rounded-lg hover:opacity-80 flex">
          Play
        </button>
        <button className="bg-gray-500 p-3 text-xl text-center text-white mx-2 px-3 rounded-lg flex align-middle">
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
