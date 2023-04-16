import React from "react";
import { Link, useParams } from "react-router-dom";

const PlacesPage = () => {
    const { action } = useParams();
    return (
        <div>
            {action !== "new" && (
                <div className="text-center">
                    <Link
                        className="inline-flex gap-1 bg-primary py-2 px-6 rounded-full text-white"
                        to={"/account/places/new"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m6-6H6"
                            />
                        </svg>
                        Add New Places
                    </Link>
                </div>
            )}

            {action === "new" && (
                <div className="">
                    <form action="">
                        <h2 className="text-2xl mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">
                            Title for your place should be something catchy for
                            the advertisement
                        </p>

                        <input
                            type="text"
                            className=""
                            placeholder="title for example:My apartment"
                        />
                        <h2 className="text-2xl mt-4">Address</h2>
                        <p className="text-gray-500 text-sm">
                            Location of your place
                        </p>
                        <input type="text" className="" placeholder="Address" />
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">
                            More the Merrier
                        </p>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                +
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PlacesPage;
