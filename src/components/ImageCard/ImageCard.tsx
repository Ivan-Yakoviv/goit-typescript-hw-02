import { ReactElement } from 'react';
import { Image } from '../App';
import s from './ImageCard.module.css'

interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;
}

const ImageCard = ({ image, openModal }: ImageCardProps):ReactElement => {
   const handleClick = () => {
    openModal(image);
  };
  return (
    <div onClick={handleClick}>
      <img src={image.urls.small} alt={image.description} className={s.img} />
    </div>
  )
}

export default ImageCard