import React from "react";
import { useDispatch } from "react-redux";
import { removeFav } from "../actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FavItem({ title, id }) {
  const dispatch = useDispatch();
  function removeFromFav() {
  dispatch(removeFav(id));
  toast.success(`"${title}" favorilerden çıkartıldı.`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className="bg-white shadow hover:shadow-lg p-3 pl-5 flex items-center group transition-all">
      <div className="flex-1 pr-4">{title}</div>
      <button
        onClick={removeFromFav}
        className="transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white opacity-30 group-hover:opacity-100"
      >
        Çıkar
      </button>
    </div>
  );
}
