import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, age, gender, skills, about, profileURL } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-2xl">
        <figure>
          <img src={profileURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-outline btn-primary ">Ignore</button>
            <button className="btn btn-outline btn-secondary">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
