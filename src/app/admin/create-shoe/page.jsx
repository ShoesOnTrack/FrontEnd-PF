"use client";

import validateForm from "@/utils/validate";
import style from "../create-shoe/create.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShoe, getAllCategories } from "@/redux/actions";


  // Define la lista de marcas de zapatillas
  const shoeBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Converse', 'Vans'];

  const CreateShoes = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const categories = [
      "ZAPATILLAS HIGH TOP",
      "ZAPATILLAS MID TOP",
      "ZAPATILLAS DEPORTIVAS",
      "ZAPATILLAS LOW TOP",
      "CHANCLAS",
      "SANDALIAS",
      "BOTAS",
      "BOTINES",
    ];
    const shoeBrands = [
      'Nike', 
      'Adidas', 
      'Puma', 
      'Reebok', 
      'New Balance', 
      'Converse', 
      'Vans'
    ];

    const [shoe, setShoe] = useState({
      name: "",
      brandName: "",
      price: "",
      description: "",
      image: "",
      category: "",
      color: "",
      stock: "",
      details: [],
      sizes: [],
      user: "",
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      let updatedShoe = { ...shoe };

      if (e.target.name === "details" || e.target.name === "sizes") {
        updatedShoe[e.target.name] = e.target.value.split(", ").map((item) => item.trim());
      } else {
        updatedShoe = {
          ...shoe,
          [e.target.name]: e.target.value,
        };
      }

      setShoe(updatedShoe);
      setErrors(validateForm(updatedShoe));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formErrors = validateForm(shoe);
      setErrors(formErrors);

      if (Object.keys(formErrors).length === 0) {
        try {
          const response = await dispatch(createShoe(shoe));

          if (!response.error) {
            setMessage("You created a new shoe!");
            setTimeout(() => setMessage(""), 5000);

            setShoe({
              name: "",
              brandName: "",
              price: "",
              description: "",
              image: "",
              category: "",
              color: "",
              stock: "",
              details: [],
              sizes: [],
              user: user?.id,
            });
          } else {
            setMessage(`There is a problem: ${response.error.message}`);
            setTimeout(() => setMessage(""), 5000);
          }
        } catch (error) {
          setMessage(`There is a problem: ${error.message}`);
          setTimeout(() => setMessage(""), 5000);
        }
      }
    };

    const handleDisabled = () => {
      for (let error in errors) {
        if (errors[error] !== "") return true;
      }
      return false;
    };

    useEffect(() => {
      if (user && user.id && !shoe.user) {
        setShoe((shoe) => ({
          ...shoe,
          user: user.id,
        }));
      }
    }, [user, shoe.user]);

    return (
      <div className={style.conte}>
        <form className={style.forcreate} onSubmit={handleSubmit}>
          <span>User: {user.email}</span>
          <h2>ENTER SHOE DATA</h2>
          <div className="mb-4">
            <label>Name:</label>
            <input
              name="name"
              placeholder="Enter a name..."
              type="name"
              value={shoe.name}
              onChange={handleChange}
            />
            <span>{errors.name}</span>
            <br />
            <label>Brand Name:</label>
            <select
              name="brandName"
              value={shoe.brandName}
              onChange={handleChange}
            >
              <option value="">Select Brand</option>
              {shoeBrands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <span>{errors.brandName}</span>
            <br />
            <label>Price:</label>
            <input
              name="price"
              placeholder="Enter a Price"
              type="price"
              value={shoe.price}
              onChange={handleChange}
            />
            <span>{errors.price}</span>
            <br />
            <label>Image:</label>
            <input
              type="text"
              name="image"
              placeholder="URL"
              value={shoe.image}
              onChange={handleChange}
            />
            <span>{errors.image}</span>

            <br />

            <label>Shoe Category:</label>
            <select name="category" onChange={handleChange} value={shoe.category}>
              <option value="">Select Shoe Category</option>
              {categories?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <span>{errors.category}</span>
            <br />
            <label>Stock:</label>
            <input
              name="stock"
              placeholder="Enter stock..."
              type="text"
              value={shoe.stock}
              onChange={handleChange}
            />
            <span>{errors.stock}</span>
            <br />

            <label>Color:</label>
            <input
              name="color"
              placeholder="Enter Colors..."
              type="text"
              value={shoe.color}
              onChange={handleChange}
            />
            <span>{errors.color}</span>
            <br />
            <label>Details:</label>
            <input
              name="details"
              placeholder="Enter details..."
              type="text"
              value={shoe.details}
              onChange={handleChange}
            />
            <span>{errors.details}</span>
            <br />
            <label>Sizes:</label>
            <input
              name="sizes"
              placeholder="Enter Sizes..."
              type="text"
              value={shoe.sizes}
              onChange={handleChange}
            />
            <span>{errors.sizes}</span>
            <br />
            <label>Description:</label>
            <input
              name="description"
              placeholder="Enter a description..."
              type="text"
              value={shoe.description}
              onChange={handleChange}
            />
            <span>{errors.description}</span>
            <br />
            {message && <span>{message}</span>}
            <Link href="/admin">Cancel</Link>
            <button
              disabled={handleDisabled()}
              type="submit"
              className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default CreateShoes;
