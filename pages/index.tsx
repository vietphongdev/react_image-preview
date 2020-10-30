import { useRef, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

type ImageEvent = React.MouseEvent<HTMLImageElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export default function Home() {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const fileInputClick = (event: ButtonEvent | ImageEvent) => {
    event.preventDefault();
    fileInputRef.current.click();
  }

  const fileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  }

  return (
    <div className={styles.container}>
      <form>
        {preview ? (
          <img
            src={preview}
            style={{ objectFit: "cover" }}
            onClick={fileInputClick}
          />
        ) : (
          <button
            onClick={fileInputClick}
          >
            Add Image
          </button>
        )}
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={fileInputChange}
        />
      </form>
    </div>
  );
}
