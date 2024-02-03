import Image from "next/image";

const ImageNext = ({ item, index }) => {
  return (
    <Image
      index={index}
      src={require(`../${item.img}`).default}
      width={192}
      height={108}
      alt={item.icon_alt}
    />
  );
};

export default ImageNext;
