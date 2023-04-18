import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";

const PlacesPage = () => {
	const { action } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [photoLink, setPhotoLink] = useState("");
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
	const addPhotoByLink = async (ev) => {
		ev.preventDefault();
		const { data } = await axios.post("/upload-by-link", { link: photoLink });
		setAddedPhotos((prev) => {
			return [...prev, data];
		});
		setPhotoLink("");
	};
	const uploadPhoto = (ev) => {
		const files = ev.target.files;
		const data = new FormData();
		for (let i = 0; i < files.length; i++) {
			data.append("photos", files[i]);
		}
		axios
			.post("/upload", data, {
				headers: { "Content-type": "multipart/form-data" },
			})
			.then((response) => {
				const { data: filenames } = response;
				setAddedPhotos((prev) => {
					return [...prev, ...filenames];
				});
			});
	};
	return (
		<div>
			{action !== "new" && (
				<div className="text-center">
					<Link
						className="inline-flex gap-1 bg-primary py-2 px-6 rounded-full text-white"
						to={"/account/places/new"}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
						</svg>
						Add New Places
					</Link>
				</div>
			)}

			{action === "new" && (
				<div className="">
					<form action="">
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

						<div className="flex gap-2">
							<input
								type="text"
								placeholder="Add a link to the ...jpeg"
								value={photoLink}
								onChange={(ev) => setPhotoLink(ev.target.value)}
							/>
							<button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>
								Add&nbsp;photo
							</button>
						</div>
						<div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
							{/* uses the filenames from the state and uses an endpoint of the api to show the
							photos saved in uploads folder */}
							{addedPhotos.length > 0 &&
								addedPhotos.map((link) => (
									<div className="h-32 flex">
										<img
											className="rounded-2xl w-full object-cover"
											src={"http://localhost:8080/uploads/" + link}
											alt=""
										/>
									</div>
								))}
							<label className="flex h-32 cursor-pointer items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
								<input type="file" multiple className="hidden" onChange={uploadPhoto} />
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-8 h-8">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
									/>
								</svg>
								Upload
							</label>
						</div>
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
			)}
		</div>
	);
};

export default PlacesPage;
