import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonials } from "../../redux/actions.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Swal from "sweetalert2";
import { Pagination } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import style from "./style.module.css";

const Reviews = () => {
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState({});

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/reviews", {
        userId: localStorage.getItem("id"),
        contenido: message,
        puntuacion: rating,
      });
      if (!data.error) {
        Swal.fire({
          title: data.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axios.get(
          `/reviews/${localStorage.getItem("id")}`
        );
        setReview(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReview();
  }, []);

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <h2 className="text-center">Reviews</h2>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
        >
          {reviews.data?.map((review) => (
            <SwiperSlide className={style.card}>
              <h4>
                {review.usuario?.persona?.nombre}{" "}
                {review.usuario?.persona?.apellido}
              </h4>
              <div
                style={{
                  direction: "ltr",
                  fontFamily: "sans-serif",
                  touchAction: "none",
                }}
              >
                <Rating
                  initialValue={reviews.puntuacion}
                  onClick={function noRefCheck() {}}
                  readonly
                  allowFraction
                />
              </div>
              {review.contenido}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={style.reviews_container}>
        {review ? (
          <div className={style.review_edit_container}>
            <div className={style.review}>
              <div
                style={{
                  direction: "ltr",
                  fontFamily: "sans-serif",
                  touchAction: "none",
                  width: "auto",
                  display: "inline",
                }}
              >
                <Rating
                  allowFraction
                  initialValue={review.puntuacion}
                  onClick={handleRating}
                  readonly={true}
                />
              </div>
              <textarea value={review.contenido} disabled={true} />
            </div>
          </div>
        ) : (
          <div className={style.review_container}>
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
            <form className={style.form_container} onSubmit={handleSubmit}>
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
