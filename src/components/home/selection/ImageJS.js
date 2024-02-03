import Image from "next/image";

const ImageJS = ({ image, index }) => {
  return (
    <Image
      index={index}
      src={require(`../../${image.flag}`).default}
      alt={image.flag_alt}
      width={30}
      height={30}
      style={{ marginRight: "10px" }}
    />
  );
};

export default ImageJS;
