import axios from "axios";
import React, { useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "./PhotosUploader";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const preInput = (title, description) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };
  const addNewPlace = async (ev) => {
    ev.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
  };

  return (
    <div className="">
      <form onSubmit={addNewPlace}>
        {preInput(
          "Title",
          " Title for your place should be something catchy for the advertisement"
        )}

        <input
          type="text"
          className=""
          placeholder="title for example:My apartment"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        {preInput("Address", "Location of your place")}

        <input
          type="text"
          className=""
          placeholder="Address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />
        {preInput("Photos", "More the Merrier")}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Say good things about your place")}

        <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} />
        {preInput("Perks", "Select the features your place provides")}

        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Info", "House rule, etc..")}

        <textarea value={extraInfo} onChange={(ev) => setExtraInfo(ev.target.value)} />
        {preInput(
          "Check In and Check out time",
          "Add the check in and check out time, remember to add some between guests for cleaning.."
        )}

        <div className="grid sm:grid-cols-3 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check In time</h3>
            <input
              type="number"
              name=""
              id=""
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>

            <input
              type="number"
              name=""
              id=""
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Number of guests</h3>
            <input
              type="number"
              name=""
              id=""
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
        </div>
        <button className="btn my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
