import React, { useEffect } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import axios from 'axios';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFav } from "./actions";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const loading = false;
  const favs = useSelector(store => store.favs);;
  const [current, setCurrent] = useState(null);
  const dispatch = useDispatch();
  const isFetching = useSelector((depo) => depo.isFetching);

  function addToFavs() {
    dispatch(addFav(current));
    toast.success(`"${current.activity}" favorilere eklendi!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
  });
  }

  function getData() {
    const options = {
      method: 'GET',
      url: 'https://www.boredapi.com/api/activity',
    };

    try {
      axios.request(options).then(function (response) {
        console.log(response.data);
        setCurrent(response.data);
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {isFetching && <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button
              onClick={getData}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            <button
              onClick={addToFavs}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0
              ? favs.map((item) => (
                <FavItem key={item.key} id={item.key} title={item.activity} />
              ))
              : <div className="bg-white p-6 text-center shadow-md">Henüz bir favoriniz yok</div>
            }
          </div>
        </Route>
      </Switch>
    </div>
  );
}
