"use client";

const LocationEmbedMap = ({ embedMap }: { embedMap: string }) => {
  return (
    <div className="w-full h-full p-2 bg-gray-50">
      <div className="flex w-full h-full overflow-hidden">
        <div
          className="w-full h-full embed-map"
          dangerouslySetInnerHTML={{ __html: embedMap }}></div>
      </div>
    </div>
  );
};

export default LocationEmbedMap;
