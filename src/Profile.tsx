import "./index.css";
import { useState } from "react";
import axios from "axios";
import "./index.css";
import Compressor from "compressorjs";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import { APIurl } from "./const";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setUserName, setIconUrl } from "./redux/userSlice";

type Inputs = {
  name: string;
  profileImage: FileList;
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.user.userName);
  const iconUrl = useSelector((state: RootState) => state.user.iconUrl);
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [errorMessage, setErrorMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, profileImage } = data;

    axios
      .put(
        `${APIurl}/users`,
        { name },
        {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        setErrorMessage("");
        dispatch(setUserName(name));

        if (profileImage.length > 0) {
          const imageFile = profileImage[0];

          //画像ファイルのフォーマット確認
          if (imageFile.size > 1048576) {
            setErrorMessage("ファイルサイズは1MB以下にしてください");
            return;
          }

          const validExtensions = ["image/jpeg", "image/png"];
          if (!validExtensions.includes(imageFile.type)) {
            setErrorMessage("画像の拡張子はjpgまたはpngのみ許可されています");
            return;
          }

          //Compressor.jsを使用して圧縮処理
          new Compressor(imageFile, {
            quality: 0.6,
            success(result) {
              const formData = new FormData();
              formData.append("icon", result, imageFile.name);

              axios
                .post(`${APIurl}/uploads`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${cookies.token}`,
                  },
                })
                .then((uploadRes) => {
                  console.log("Image uploaded:", uploadRes.data.iconUrl);
                  setErrorMessage("");
                  dispatch(setIconUrl(uploadRes.data.iconUrl));
                  alert("更新成功");
                  reset();
                  navigate("/");
                })
                .catch((err) => {
                  console.log(err);
                  setErrorMessage(
                    `画像のアップロードに失敗しました。 ${err.response.data.ErrorMessageJP}`,
                  );
                });
            },
            error(err) {
              console.log(err.message);
              setErrorMessage("画像の圧縮に失敗しました。");
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(`更新に失敗。 ${err.response.data.ErrorMessageJP}`);
      });
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <div className="relative z-10 h-auto overflow-hidden rounded-lg border-b-2 border-gray-300 bg-white p-8 px-7 py-10 shadow-2xl">
            <h3 className="mb-6 text-center text-2xl font-medium">
              ユーザー情報更新
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-red-500">{errorMessage}</p>
              <label>
                ユーザー名
                <input
                  type="text"
                  className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder={userName}
                  {...register("name", {
                    required: "ユーザー名を入力してください",
                  })}
                />
              </label>
              <label>
                プロフィール画像
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-md mb-4 block w-full  max-w-xs"
                  {...register("profileImage")}
                  onChange={handleImageChange}
                />
              </label>
              プレビュー
              <span className="flex size-32 items-center justify-center rounded-full text-white">
                <div className="avatar">
                  <div className=" rounded-full">
                    <img src={previewUrl || iconUrl} alt="プロフィール画像" />
                  </div>
                </div>
              </span>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              {errors.profileImage && (
                <p className="text-red-500">{errors.profileImage.message}</p>
              )}
              <div className="block">
                <button
                  className="w-full rounded-lg bg-[#9117f5] px-3 py-4 font-medium text-white"
                  type="submit"
                >
                  プロフィール更新
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
