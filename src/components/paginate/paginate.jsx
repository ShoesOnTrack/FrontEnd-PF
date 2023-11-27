import style from "./Paginate.module.css";

const Paginate = ({ paginate, currentPage }) => {
  const pageNumbers = [1, 2, 3, 4, 5];

  return (
    <nav className={style.nav}>
      <ul className={style.ul}>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <p
              className={number === currentPage ? style.activePage : style.p}
              onClick={() => paginate(number)}
            >
              {number}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
