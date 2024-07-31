import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./Pagination.scss";

const Pagination = ({ pages = [] }) => {
  const defaultSize = 10;
  const [searchParams, setSearchParams]: any = useSearchParams();
  const _useNavigate = useNavigate();
  useEffect(() => {}, [searchParams]);
  return (
    <div className="flex justify-center mt-7">
      {pages && (
        <>
          {pages?.map((page: number, index: number) => (
            <button
              type="button"
              key={`${page}_${index}`}
              className={`px-3 py-1 rounded ${
                (
                  searchParams.get("page")
                    ? +searchParams.get("page")! === page + 1
                    : index === 0
                )
                  ? "bg-active"
                  : "bg-standar"
              } text-white page-button`}
              onClick={() => {
                _useNavigate(
                  `?page=${page + 1}&size=${
                    +searchParams.get("size")! || defaultSize
                  }`
                );
              }}
            >
              {page + 1}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default Pagination;
