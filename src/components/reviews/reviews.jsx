import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Swal from "sweetalert2";
import { Pagination } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import { getAllReviews, postReview, } from "@/redux/actions";
import NavBar from "../navbar/Navbar";
import axios from "axios";

const Reviews = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState({});
  const user = useSelector((state) => state.user);
  const reviews = useSelector((state) => state.reviews);
  const [tengoReview, setTengoReview] = useState(false)

  const handleRating = (rate) => {
    setRating(rate);
  };

  const loadReviews = async () => {
      await dispatch(getAllReviews());
  };

  
  // const check = ()=>{
  //   console.log(reviews)
  //   reviews?.map((rev)=>{
  //       console.log(rev.User?.name)
  //       if(rev.User?.id === user.id){
  //         setTengoReview(true)
  //       }
  //     })
  //   }
    
    useEffect(()=>{
      loadReviews();
    },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/reviews", {
        userId: user.id,
        contenido: message,
        puntuacion: rating,
      });
      if (!data.error) {
        Swal.fire({
          title: data.message,
          icon: "success",
        });
        loadReviews()
        setTengoReview(true)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{

    console.log(reviews)
    reviews.data?.map((rev)=>{
             if(rev.User?.id === user.id){
               setTengoReview(true)
             }
           })
  },[reviews])

  const handleDelete = async()=>{
    console.log("borrar review");
    try {
      const { data } = await axios.post("/reviews/delete", {
        userId: user.id,
      });
      if (!data.error) {
        Swal.fire({
          title: data.message,
          icon: "success",
        });
        loadReviews()
        setTengoReview(false)
      }
    } catch (error) {
      console.error(error);
      
    }
  }


  return (
    <>
    <NavBar user={user}/>
      <div >
        <h2 >Reviews</h2>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          modules={[Pagination]}
          
        >
          {reviews.data?.map((review) => (
            <SwiperSlide key={review.id}>
              <h4>
                {review.User?.name}{" "}
                <br />
                {review.User?.email}
              </h4>
              <div
                style={{
                  direction: "ltr",
                  fontFamily: "sans-serif",
                  touchAction: "none",
                }}
              >
                <Rating allowFraction initialValue={review.puntuacion}/>
              </div>
              {review.contenido}
              {review.User.id === user.id ? (<button onClick={handleDelete}>x</button>): null}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div >
        {tengoReview ? (
          <div >
            <div >
              <div
                style={{
                  direction: "ltr",
                  fontFamily: "sans-serif",
                  touchAction: "none",
                  width: "auto",
                  display: "inline",
                }}
              >
                {/* <Rating
                  allowFraction
                  initialValue={review.puntuacion}
                  onClick={handleRating}
                  readonly={true}
                /> */}
              </div>
              {/* <textarea value={review.contenido} disabled={true} /> */}
            </div>
          </div>
        ) : (
          <div >
            <h3>Danos tu opinion</h3>
            <div
              style={{
                direction: "ltr",
                fontFamily: "sans-serif",
                touchAction: "none",
                textAlign: "center",
              }}
            >
              <Rating allowFraction initialValue={0.5} onClick={handleRating} />
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                name=""
                id=""
                cols="45"
                rows="8"
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
              <button type="submit">Crear</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
