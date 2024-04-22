import React from "react";

function page({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {params.id}
    </div>
  );
}

export default page;
