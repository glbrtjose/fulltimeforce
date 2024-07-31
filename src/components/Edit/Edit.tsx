import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Edit.scss";
import { AuthService } from "../../services/auth.service";
import { BlogPostService } from "../../services/blogPost.service";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Edit = () => {
  const [post, setpost]: any = useState({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, defaultValues },
  } = useForm();
  const onSubmit = async (data: any) => {
    let _id = "";
    if (id === "new") {
      const resp: any = await _BlogPostService.create(data);
      _id = resp._id;
    } else {
      const resp: any = await _BlogPostService.update(id!, data);
      _id = resp._id;
    }
    if (_id) _useNavigate("/posts");
  };
  const fields = ["title", "content", "author"];
  const _AuthService = AuthService.getInstance();
  const _BlogPostService = BlogPostService.getInstance();
  const _useNavigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const data: any = await _BlogPostService.get(id!);
      setpost(() => data);
    })();
  }, []);
  useEffect(() => {
    reset(post);
  }, [post]);
  return (
    <div className="list-container">
      <div className="top-icon">
        <FontAwesomeIcon
          className="add"
          icon={faArrowLeft}
          onClick={() => {
            _useNavigate("/posts");
          }}
        />
      </div>
      <form className="card-container" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field: string, index: number) => (
          <div key={index} className="input-container">
            <p className="field-title">{field}:</p>
            <input
              placeholder={field}
              {...register(field, {
                required: true,
                value: post[field],
              })}
              type="text"
            />
          </div>
        ))}
        <button className="btn-edit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
